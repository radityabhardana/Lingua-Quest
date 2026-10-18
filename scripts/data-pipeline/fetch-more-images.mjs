// Fetch additional Wikipedia images: area (geography) + language for each editorial country.
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

const targets = {
  ID: { area: 'Lake Toba', language: 'Indonesian language' },
  JP: { area: 'Japanese archipelago', language: 'Japanese language' },
  US: { area: 'Great Plains', language: 'American English' }
}

const FILE = 'src/features/atlas/data/country-images.json'
const existing = JSON.parse(fs.readFileSync(FILE, 'utf8'))

for (const [alpha2, titles] of Object.entries(targets)) {
  existing[alpha2] = existing[alpha2] || {}
  for (const [key, title] of Object.entries(titles)) {
    const img = await getImage(title)
    existing[alpha2][key] = img
    console.log(alpha2, key, img ? 'OK' : 'MISS')
  }
}

fs.writeFileSync(FILE, JSON.stringify(existing, null, 2))
console.log('updated country-images.json')
