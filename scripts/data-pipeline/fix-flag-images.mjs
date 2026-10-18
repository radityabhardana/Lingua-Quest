// Replace flag/map lead images with genuine scenery photos.
// Strategy: query "<country> tourism" / "<country> landscape" and reject flag-like filenames.
import fs from 'node:fs'

const UA = 'LinguaQuest/1.0 (educational project)'
const FILE = 'src/features/atlas/data/country-images.json'

const manifest = JSON.parse(fs.readFileSync('src/features/atlas/data/manifest.json', 'utf8'))
const images = JSON.parse(fs.readFileSync(FILE, 'utf8'))

const BAD = /(Flag_of|_flag|Flag%20|Coat_of_arms|Emblem|Seal_of|Location|Map_of|Orthographic|_locator|BlankMap|WikiProject)/i

async function searchImage(query) {
  const searchUrl =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search' +
    '&gsrsearch=' + encodeURIComponent(query) +
    '&gsrlimit=8&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=640'
  const res = await fetch(searchUrl, { headers: { 'User-Agent': UA } })
  if (!res.ok) return null
  const json = await res.json()
  const pages = json?.query?.pages
  if (!pages) return null

  for (const p of Object.values(pages)) {
    const title = p.title || ''
    if (BAD.test(title)) continue
    if (!/\.(jpg|jpeg|png)$/i.test(title)) continue
    const url = p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url
    if (url) return url
  }
  return null
}

const targets = []
for (const c of manifest.records) {
  const cur = images[c.alpha2]?.landscape
  if (cur && BAD.test(cur)) {
    targets.push({ alpha2: c.alpha2, name: c.nameEn })
  }
}

console.log(`Replacing ${targets.length} flag-like images...`)

let replaced = 0
for (const t of targets) {
  const queries = [
    `${t.name} landscape nature`,
    `${t.name} scenery`,
    `${t.name} tourism`
  ]
  let url = null
  for (const q of queries) {
    url = await searchImage(q)
    if (url) break
    await new Promise(r => setTimeout(r, 120))
  }
  if (url) {
    images[t.alpha2] = images[t.alpha2] || {}
    images[t.alpha2].landscape = url
    replaced++
  }
  process.stdout.write(`\r${replaced}/${targets.length}`)
  await new Promise(r => setTimeout(r, 150))
}

fs.writeFileSync(FILE, JSON.stringify(images, null, 2))
console.log(`\nReplaced ${replaced} of ${targets.length}`)
