// Fetch real Wikipedia lead images for editorial countries (ID, JP, US).
// Writes src/features/atlas/data/country-images.json
// Run once: node scripts/fetch-country-images.mjs

import fs from 'node:fs'

const UA = 'LinguaQuest/1.0 (educational project)'

async function getImage(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=640&format=json`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) return null
  const json = await res.json()
  const pages = json?.query?.pages
  if (!pages) return null
  const page = Object.values(pages)[0]
  return page?.thumbnail?.source ?? null
}

// Map: alpha2 -> { capital, landscape, culture } Wikipedia article titles
const targets = {
  ID: {
    capital: 'Jakarta',
    landscape: 'Komodo National Park',
    culture: 'Yogyakarta'
  },
  JP: {
    capital: 'Tokyo',
    landscape: 'Mount Fuji',
    culture: 'Kyoto'
  },
  US: {
    capital: 'Washington, D.C.',
    landscape: 'Grand Canyon',
    culture: 'New York City'
  }
}

const out = {}
for (const [alpha2, titles] of Object.entries(targets)) {
  out[alpha2] = {}
  for (const [key, title] of Object.entries(titles)) {
    const img = await getImage(title)
    out[alpha2][key] = img
    console.log(alpha2, key, img ? 'OK' : 'MISS')
  }
}

fs.writeFileSync('src/features/atlas/data/country-images.json', JSON.stringify(out, null, 2))
console.log('Wrote country-images.json')
