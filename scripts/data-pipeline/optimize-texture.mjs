// One-time asset optimization: downscale the 5400x2700 earth texture to 2048x1024.
// Uses Chromium's high-quality image resampling (no extra deps required).
import { chromium } from 'playwright-core'
import fs from 'node:fs'

const SRC = 'public/assets/earth-day.jpg'
const OUT = 'public/assets/earth-day-2k.jpg'

const exe = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const browser = await chromium.launch({ headless: true, executablePath: exe })
const page = await browser.newPage()

const dataUrl = `data:image/jpeg;base64,${fs.readFileSync(SRC).toString('base64')}`

const result = await page.evaluate(async ({ dataUrl, w, h }) => {
  const img = new Image()
  img.src = dataUrl
  await img.decode()

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, 0, 0, w, h)

  return {
    dataUrl: canvas.toDataURL('image/jpeg', 0.86),
    srcSize: `${img.naturalWidth}x${img.naturalHeight}`
  }
}, { dataUrl, w: 2048, h: 1024 })

fs.writeFileSync(OUT, Buffer.from(result.dataUrl.split(',')[1], 'base64'))

const before = fs.statSync(SRC).size
const after = fs.statSync(OUT).size
console.log(JSON.stringify({
  sourceDimensions: result.srcSize,
  targetDimensions: '2048x1024',
  beforeBytes: before,
  afterBytes: after,
  savedPercent: Math.round((1 - after / before) * 100) + '%'
}, null, 2))

await browser.close()
