import useDidUpdate from '@rooks/use-did-update'
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

export type Langs = 'es' | 'en' | 'de'
export interface ContextState<T> {
  translations: { [P in Langs]?: T }
  lang: Langs
}

const intialState: ContextState<unknown> = { translations: {}, lang: 'es' }

type ContextType<T> = [ContextState<T>, Dispatch<SetStateAction<ContextState<T>>>]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LangContext = createContext<ContextType<any>>([intialState, () => {}])

export const useLangContext = <T,>(): ContextType<T> => useContext(LangContext)

export interface ProviderPros<T> extends React.PropsWithChildren<ContextState<T>> {
  onLang: (lang: Langs) => void
}

export const LangProvider = <T,>(props: ProviderPros<T>): JSX.Element => {
  const { children, lang, onLang, translations } = props
  const [state, setState] = useState<ContextState<T>>({ lang, translations })

  useDidUpdate(() => {
    onLang(state.lang)
  }, [state.lang])

  return <LangContext.Provider value={[state, setState]}>{children}</LangContext.Provider>
}
