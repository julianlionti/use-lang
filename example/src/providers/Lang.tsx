import { createLangCtx } from 'use-lang'

interface LangProps {
  welcome: string
  name: string
  changeLang: string
}

export const { useLang, LangProvider } = createLangCtx<LangProps>()
