import { Dispatch, SetStateAction } from 'react'
import { ContextState, Langs, useLangContext } from '../providers/LangProvider'

export interface UseLangReturn<T> extends ContextState<T> {
  setLang: Dispatch<SetStateAction<Langs>>
  t: T
}

export const useLang = <T,>(): UseLangReturn<T> => {
  const [state, setState] = useLangContext<T>()
  const { lang, translations } = state

  const setLang = (props: SetStateAction<Langs>) => {
    let finalLang: Langs

    if (typeof props === 'function') finalLang = props(lang)
    else finalLang = props

    return setState((acc) => ({ ...acc, lang: finalLang }))
  }

  const t = translations[lang]
  if (!t) {
    throw Error('No lang configurated')
  }

  return { lang, translations, setLang, t }
}
