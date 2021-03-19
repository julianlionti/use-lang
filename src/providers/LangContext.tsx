import { useLang, UseLangReturn } from '../hooks/useLang'
import { LangProvider, ProviderPros } from './LangProvider'

interface CreteRet<T> {
  LangProvider: (props: ProviderPros<T>) => JSX.Element
  useLang: () => UseLangReturn<T>
}

export const createLangCtx = <T extends unknown>(): CreteRet<T> => {
  return { LangProvider, useLang }
}
