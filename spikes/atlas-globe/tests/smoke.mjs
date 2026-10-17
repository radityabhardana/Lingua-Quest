import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '4174', '--strictPort'], { stdio: 'pipe' })
const stop = () => server.kill()
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Vite startup timed out')), 20_000)
    server.stdout.on('data', chunk => { if (chunk.toString().includes('ready in')) { clearTimeout(timer); resolve() } })
    server.on('error', reject)
  })
  const browser = await chromium.launch({ executablePath: chrome, headless: true })
  const page = await browser.newPage()
  const requests = [], errors = []
  page.on('request', request => requests.push(request.url()))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('http://127.0.0.1:4174', { waitUntil: 'networkidle' })
  await page.getByRole('heading', { name: 'World atlas feasibility spike' }).waitFor()
  await page.locator('.poster').waitFor()
  await page.locator('canvas').waitFor()
  await page.getByRole('button', { name: 'Australia' }).click()
  await page.getByText('Selected: Australia').waitFor()
  await page.getByRole('button', { name: 'Force WebGL context loss' }).click()
  await page.getByText('WebGL unavailable — poster fallback active.').waitFor()
  if (await page.locator('canvas').count()) throw new Error('Canvas remained after forced context loss')
  if (requests.some(url => !url.startsWith('http://127.0.0.1:4174/'))) throw new Error(`Third-party request: ${requests.join(', ')}`)
  if (errors.length) throw new Error(`Console/page errors: ${errors.join(' | ')}`)
  await browser.close()
  console.log(`smoke passed: ${requests.length} local requests, no console/page errors`)
} finally { stop() }
