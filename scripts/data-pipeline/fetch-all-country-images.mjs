// Bulk-fetch Wikipedia lead images for every country's capital and the country itself.
// Writes src/features/atlas/data/country-images.json (merging with editorial entries).
// Run once: node scripts/fetch-all-country-images.mjs

import fs from 'node:fs'

const UA = 'LinguaQuest/1.0 (educational project)'
const FILE = 'src/features/atlas/data/country-images.json'

const manifest = JSON.parse(fs.readFileSync('src/features/atlas/data/manifest.json', 'utf8'))
const enriched = JSON.parse(fs.readFileSync('src/features/atlas/data/country-details-enriched.json', 'utf8'))
const existing = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : {}

// Wikipedia allows up to 50 titles per query
const BATCH = 40

async function fetchBatch(titles) {
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=640&redirects=1&titles=' +
    encodeURIComponent(titles.join('|'))
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) return {}
  const json = await res.json()
  const pages = json?.query?.pages ?? {}
  const out = {}
  for (const page of Object.values(pages)) {
    if (page?.title && page?.thumbnail?.source) out[page.title] = page.thumbnail.source
  }
  return out
}

// Build a title list: country article + capital article
const lookups = []
for (const c of manifest.records) {
  const e = enriched[c.alpha2]
  if (!e?.capital) continue
  lookups.push({ alpha2: c.alpha2, kind: 'landscape', title: c.nameEn })
  lookups.push({ alpha2: c.alpha2, kind: 'capital', title: e.capital })
}

const uniqueTitles = [...new Set(lookups.map(l => l.title))]
const imageByTitle = {}

for (let i = 0; i < uniqueTitles.length; i += BATCH) {
  const batch = uniqueTitles.slice(i, i + BATCH)
  const found = await fetchBatch(batch)
  Object.assign(imageByTitle, found)
  process.stdout.write(`\r${Math.min(i + BATCH, uniqueTitles.length)}/${uniqueTitles.length}`)
  await new Promise(r => setTimeout(r, 250))
}
console.log('')

let added = 0
for (const { alpha2, kind, title } of lookups) {
  const img = imageByTitle[title]
  if (!img) continue
  existing[alpha2] = existing[alpha2] || {}
  if (!existing[alpha2][kind]) {
    existing[alpha2][kind] = img
    added++
  }
}

fs.writeFileSync(FILE, JSON.stringify(existing, null, 2))
console.log(JSON.stringify({
  countries: Object.keys(existing).length,
  imagesAdded: added,
  titlesQueried: uniqueTitles.length
}, null, 2))
