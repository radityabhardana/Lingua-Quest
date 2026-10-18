// Merge population (World Bank) into the enriched country dataset.
// Run once: node scripts/fetch-populations.mjs

import fs from 'node:fs'

const FILE = 'src/features/atlas/data/country-details-enriched.json'

// World Bank: all countries, population, latest available
const url = 'https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&mrnev=1&per_page=400'
const res = await fetch(url)
if (!res.ok) throw new Error(`World Bank fetch failed: ${res.status}`)
const json = await res.json()

const rows = Array.isArray(json) ? json[1] : null
if (!rows) throw new Error('Unexpected World Bank response shape')

// ISO3 -> population
const byIso3 = new Map()
for (const row of rows) {
  const iso3 = row.countryiso3code
  const value = row.value
  if (iso3 && value != null) byIso3.set(iso3, value)
}

// Need ISO3 per alpha2 -> reuse mledoze source
const src = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json')
const raw = await src.json()
const alpha2ToIso3 = new Map()
for (const c of raw) {
  if (c.cca2 && c.cca3) alpha2ToIso3.set(c.cca2, c.cca3)
}

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'))

const fmtPop = (n) => {
  if (n == null) return null
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')} million`
  if (n >= 1_000) return `${Math.round(n / 1_000)} thousand`
  return `${n}`
}

let filled = 0
let missing = 0
for (const [alpha2, entry] of Object.entries(data)) {
  const iso3 = alpha2ToIso3.get(alpha2)
  const pop = iso3 ? byIso3.get(iso3) : null
  if (pop != null) {
    entry.population = fmtPop(pop)
    filled++
  } else {
    missing++
  }
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8')
console.log(JSON.stringify({ total: Object.keys(data).length, filled, missing }, null, 2))
