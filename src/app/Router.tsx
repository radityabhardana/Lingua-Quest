import { Routes, Route } from 'react-router-dom'
import { useState, lazy, Suspense } from 'react'
import { type Locale } from '../i18n'
import { Landing } from './Landing'

// Country Explorer pulls in the 3D stack and per-country data, so keep it
// out of the landing bundle and load it only when the route is visited.
const CountryDetail = lazy(() =>
  import('../features/country/CountryDetail').then(m => ({ default: m.CountryDetail }))
)

export function Router() {
  const [locale, setLocale] = useState<Locale>('en')

  return (
    <Routes>
      <Route path="/" element={<Landing locale={locale} setLocale={setLocale} />} />
      <Route
        path="/country/:alpha2"
        element={
          <Suspense fallback={<div className="route-loading" aria-live="polite" />}>
            <CountryDetail locale={locale} />
          </Suspense>
        }
      />
    </Routes>
  )
}
