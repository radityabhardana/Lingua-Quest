// Final pass: ensure no fact row shows a flag/map. Replace bad landscape images
// with the capital photo (already verified good) or drop them so the row renders text-only.
import fs from 'node:fs'

const FILE = 'src/features/atlas/data/country-images.json'
const images = JSON.parse(fs.readFileSync(FILE, 'utf8'))

const BAD = /(Flag_of|_flag|Flag%20|Coat_of_arms|Emblem|Seal_of|Location|Map_of|Orthographic|_locator|BlankMap|WikiProject)/i

let cleared = 0
let fellBack = 0
for (const [alpha2, v] of Object.entries(images)) {
  for (const key of ['landscape', 'area']) {
    const url = v[key]
    if (!url || !BAD.test(url)) continue
    // Drop the bad image; the UI will fall back to the capital photo or render text-only.
    if (v.capital && !BAD.test(v.capital)) {
      v[key] = v.capital
      fellBack++
    } else {
      delete v[key]
      cleared++
    }
  }
  for (const key of ['capital', 'language']) {
    const url = v[key]
    if (url && BAD.test(url)) {
      delete v[key]
      cleared++
    }
  }
}

fs.writeFileSync(FILE, JSON.stringify(images, null, 2))
console.log(JSON.stringify({ cleared, fellBack }, null, 2))
