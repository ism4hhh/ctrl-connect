// Visual QA: screenshot the build at 393x852 @3x (the reference device) and diff it against the real app screenshots.
// usage: node scripts/qa.mjs [round-name]
import { chromium } from 'playwright'
import { createServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const round = process.argv[2] || 'r'
const outDir = path.join('qa', 'out', round)
fs.mkdirSync(outDir, { recursive: true })

const CASES = [
  { name: 'home-top', ref: 'qa/ref-1-home-top.png', url: '/?qa=1&sb=1&name=Ismah&ref=1' },
  { name: 'home-mid', ref: 'qa/ref-3.png', url: '/?qa=1&sb=1&name=Ismah&ref=1&slide=1', anchor: 'Email', top: 136 },
  { name: 'home-bottom', ref: 'qa/ref-4.png', url: '/?qa=1&sb=1&name=Ismah&ref=1&slide=1', anchor: 'MyQMUL', top: 240 },
]

const server = await createServer({ server: { port: 5199, strictPort: true }, logLevel: 'silent' })
await server.listen()
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 3 })
const page = await ctx.newPage()

const STATUS_ROWS = 59 * 3 // ignore the iOS status bar (time/battery differ)
const results = []
for (const c of CASES) {
  await page.goto('http://localhost:5199' + c.url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(300)
  if (c.anchor) {
    await page.evaluate(({ anchor, top }) => {
      const el = [...document.querySelectorAll('.tile')].find((t) => t.dataset.label === anchor)
      const sc = document.querySelector('.scroll')
      const r = el.getBoundingClientRect()
      sc.scrollTop += r.top - top
    }, { anchor: c.anchor, top: c.top })
    await page.waitForTimeout(200)
  }
  const buf = await page.screenshot({ type: 'png' })
  const build = PNG.sync.read(buf)
  const ref = PNG.sync.read(fs.readFileSync(c.ref))
  const w = Math.min(build.width, ref.width), h = Math.min(build.height, ref.height)
  // copy the status bar rows from the ref so they don't count
  for (let y = 0; y < STATUS_ROWS; y++) for (let x = 0; x < w; x++) {
    const i = (y * build.width + x) * 4, j = (y * ref.width + x) * 4
    build.data[i] = ref.data[j]; build.data[i + 1] = ref.data[j + 1]; build.data[i + 2] = ref.data[j + 2]
  }
  const diff = new PNG({ width: w, height: h })
  const n = pixelmatch(ref.data, build.data, diff.data, w, h, { threshold: 0.18, includeAA: false, diffColor: [255, 0, 255], alpha: 0.35 })
  const pct = ((n / (w * h)) * 100).toFixed(2)
  // side-by-side: ref | build | diff
  const sbs = new PNG({ width: w * 3, height: h })
  const blit = (src, dx) => { for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (y * src.width + x) * 4, o = (y * sbs.width + x + dx) * 4; sbs.data[o] = src.data[i]; sbs.data[o + 1] = src.data[i + 1]; sbs.data[o + 2] = src.data[i + 2]; sbs.data[o + 3] = 255 } }
  blit(ref, 0); blit(build, w); blit(diff, w * 2)
  fs.writeFileSync(path.join(outDir, `${c.name}-build.png`), PNG.sync.write(build))
  fs.writeFileSync(path.join(outDir, `${c.name}-diff.png`), PNG.sync.write(diff))
  fs.writeFileSync(path.join(outDir, `${c.name}-sbs.png`), PNG.sync.write(sbs))
  results.push({ case: c.name, mismatch: pct + '%' })
}
console.table(results)
await browser.close()
await server.close()
