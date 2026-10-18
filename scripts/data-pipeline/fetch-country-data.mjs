// One-time ETL: enrich country-details.ts with real verified data from mledoze/countries.
// Run once: node scripts/fetch-country-data.mjs
// Writes src/features/atlas/data/country-details-enriched.json (checked into repo).

import fs from 'node:fs'
import path from 'node:path'

const SRC_URL = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json'
const OUT_FILE = 'src/features/atlas/data/country-details-enriched.json'

const res = await fetch(SRC_URL)
if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
const raw = await res.json()

// Helpers
const fmtNum = (n) => n == null ? null : n.toLocaleString('en-US')
const fmtArea = (km2) => km2 == null ? null : `${km2.toLocaleString('en-US')} km²`
const fmtPop = (n) => {
  if (n == null) return null
  if (n >= 1_000_000) return `${Math.round(n / 1_000_000)} million`
  if (n >= 1_000) return `${Math.round(n / 1_000)} thousand`
  return `${n}`
}

const out = {}

for (const c of raw) {
  const alpha2 = c.cca2
  if (!alpha2) continue

  const capital = Array.isArray(c.capital) && c.capital.length ? c.capital[0] : null
  const population = c.population != null ? fmtPop(c.population) : null
  const area = c.area != null ? fmtArea(c.area) : null
  const languages = c.languages ? Object.values(c.languages) : []
  const region = c.region || null
  const subregion = c.subregion || null
  const borders = Array.isArray(c.borders) ? c.borders : []
  const latlng = Array.isArray(c.latlng) ? c.latlng : null

  out[alpha2] = {
    alpha2,
    capital,
    population,
    area,
    languages: { official: languages, widelySpoken: [] },
    coordinates: latlng ? `${Math.abs(latlng[0]).toFixed(1)}°${latlng[0] >= 0 ? 'N' : 'S'} ${Math.abs(latlng[1]).toFixed(1)}°${latlng[1] >= 0 ? 'E' : 'W'}` : null,
    borders,
    region,
    subregion
  }
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), 'utf8')

console.log(JSON.stringify({
  sourceCountries: raw.length,
  enriched: Object.keys(out).length,
  outFile: OUT_FILE,
  sample: Object.values(out).slice(0, 3)
}, null, 2))
