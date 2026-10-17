import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { type Locale } from '../i18n'
import { Landing } from './Landing'

export function Router() {
  const [locale, setLocale] = useState<Locale>('en')

  return (
    <Routes>
      <Route path="/" element={<Landing locale={locale} setLocale={setLocale} />} />
      <Route path="/country/:code" element={<div>Country Detail (waiting for designer)</div>} />
    </Routes>
  )
}
