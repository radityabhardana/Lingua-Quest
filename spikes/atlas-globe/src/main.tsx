import { lazy, Suspense, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { countryName, testedCountryIds } from './countries'
import './style.css'

const Globe = lazy(() => import('./Globe'))
function App() {
  const [selected, setSelected] = useState<string | null>(null)
  const [lost, setLost] = useState(false)
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  return <main className="spike">
    <div className="poster" aria-hidden="true"><span>◎</span><small>World Atlas</small></div>
    {!lost && <Suspense fallback={null}><Globe reduceMotion={reduceMotion} onSelect={setSelected} onContextLost={() => setLost(true)} /></Suspense>}
    <section aria-live="polite"><h1>World atlas feasibility spike</h1><p>{lost ? 'WebGL unavailable — poster fallback active.' : selected ? `Selected: ${countryName(selected)}` : 'Touch or click a country.'}</p></section>
    <button type="button" onClick={() => window.dispatchEvent(new Event('atlas-force-context-loss'))}>Force WebGL context loss</button>
    <h2>Canonical tested-country list</h2><ul>{testedCountryIds.map(id => <li key={id}><button onClick={() => setSelected(id)}>{countryName(id)}</button></li>)}</ul>
  </main>
}
createRoot(document.getElementById('root')!).render(<App />)
