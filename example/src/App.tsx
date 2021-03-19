import React from 'react'
import { useState } from 'react'
import { LangProvider, useLang } from './providers/Lang'
import { Langs } from 'use-lang'
import './App.css'

const InnerComponent = () => {
  const { t, setLang } = useLang()

  return (
    <div className={'container'}>
      <h1>{t.welcome}</h1>
      <p>{t.name}</p>
      <button
        onClick={() => {
          setLang((acc) => (acc == 'es' ? 'en' : 'es'))
        }}>
        {t.changeLang}
      </button>
    </div>
  )
}

const langKey = 'UseLang-LANG'
const App = () => {
  const [lang, setLang] = useState<Langs>(() => (localStorage.getItem(langKey) as Langs) || 'es')

  return (
    <LangProvider
      onLang={(newlang) => {
        setLang(newlang)
        localStorage.setItem(langKey, newlang)
      }}
      lang={lang}
      translations={{
        es: { name: 'Nombre', welcome: 'Bienvenida', changeLang: 'Cambiar idioma' },
        en: { welcome: 'Welcome', name: 'Name', changeLang: 'Change language' },
      }}>
      <InnerComponent />
    </LangProvider>
  )
}

export default App
