// Desktop-frame and phone screenshots for the write-up.
import { chromium } from 'playwright'
import { createServer } from 'vite'
import fs from 'node:fs'
const server = await createServer({ server: { port: 5198, strictPort: true }, logLevel: 'silent' }); await server.listen()
const browser = await chromium.launch()
const out = process.argv[2] || 'qa/out/shots'; fs.mkdirSync(out, { recursive: true })
const paths = (process.argv[3] || '/').split(',')
for (const p of paths) {
  const name = p.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home'
  const d = await browser.newPage({ viewport: { width: 1280, height: 960 }, deviceScaleFactor: 1 })
  await d.goto('http://localhost:5198' + p + (p.includes('?') ? '&' : '?') + 'qa=1', { waitUntil: 'networkidle' }); await d.waitForTimeout(400)
  await d.screenshot({ path: `${out}/desktop-${name}.png` }); await d.close()
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  await m.goto('http://localhost:5198' + p + (p.includes('?') ? '&' : '?') + 'qa=1', { waitUntil: 'networkidle' }); await m.waitForTimeout(400)
  await m.screenshot({ path: `${out}/phone-${name}.png` }); await m.close()
}
await browser.close(); await server.close(); console.log('shots ok')
