// Deck QC: screenshot every slide (and demo states) at 1920x1080, check the iframe is interactive, check for dashes.
import { chromium } from 'playwright'
import { createServer } from 'vite'
import fs from 'node:fs'
import { execSync } from 'node:child_process'
const out = 'qa/out/deck'; fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true })
const server = await createServer({ server: { port: 5195, strictPort: true }, logLevel: 'silent' }); await server.listen()
execSync('node scripts/build_deck.mjs qa/out/deck/deck_test.html http://localhost:5195/?qa=1', { stdio: 'inherit' })
const browser = await chromium.launch()
const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
const url = 'file://' + process.cwd() + '/qa/out/deck/deck_test.html'
let n = 0
const shot = async (name, wait = 2600) => { await p.waitForTimeout(wait); await p.screenshot({ path: `${out}/${String(++n).padStart(2, '0')}-${name}.png` }) }
await p.goto(url); await shot('01-opener')
for (let k = 2; k <= 8; k++) {
  await p.evaluate((k) => window.__deck.show(k - 1), k)
  await shot(`0${k}-${['', '', 'title', 'aisha', 'issue', 'solution', 'demo-qr', 'usps', 'close'][k]}`, k === 3 ? 4200 : 2600)
  if (k === 6) {
    for (let s = 1; s <= 5; s++) { await p.locator('#next').click(); await shot(`06-demo-step${s}`, s === 1 ? 2000 : 800) }
  }
  if (k === 8) { await p.locator('#next').click(); await shot('08-close-reveal', 1200) }
}
// iframe interactivity: tap the Socials tile inside the app
await p.evaluate(() => window.__deck.show(5)); await p.locator('#next').click(); await p.waitForTimeout(2500)
const frame = p.frameLocator('.phone iframe')
await frame.locator('.tile[data-label="Socials"]').click(); await p.waitForTimeout(900)
const title = await frame.locator('.header .title').last().textContent().catch(() => null)
await p.screenshot({ path: `${out}/99-iframe-interactive.png` })
// notes panel
await p.keyboard.press('n'); await p.waitForTimeout(600); await p.screenshot({ path: `${out}/98-notes-panel.png` }); await p.keyboard.press('n')
// dash check on visible text + notes
const text = await p.evaluate(() => Array.from(document.querySelectorAll('.slide')).map((s) => s.innerText).join('\n') + '\n' + NOTES.map((x) => x.title + ' ' + x.notes).join('\n'))
const dashes = (text.match(/[-–—]/g) || []).length
// placeholder build for the real deliverable
execSync('node scripts/build_deck.mjs', { stdio: 'inherit' })
const q = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await q.goto('file://' + process.cwd() + '/plusone_deck.html#6'); await q.locator('#next').click(); await q.waitForTimeout(2000); await q.screenshot({ path: `${out}/97-placeholder-demo.png` })
console.log(JSON.stringify({ iframeTitleAfterTap: title, dashesInText: dashes, errors: errs }, null, 1))
await browser.close(); await server.close()
