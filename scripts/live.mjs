import { chromium } from 'playwright'
const url = process.argv[2]
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
const t0 = Date.now(); const errs = []; p.on('pageerror', (e) => errs.push(e.message))
await p.goto(url, { waitUntil: 'networkidle' }); const ms = Date.now() - t0
await p.waitForTimeout(2500); await p.screenshot({ path: 'qa/out/live-phone.png' })
await p.locator('.tile[data-label="Socials"]').click(); await p.waitForTimeout(600); await p.screenshot({ path: 'qa/out/live-socials.png' })
console.log('live load ms', ms, 'errors', errs.length ? errs : 'none', 'title', await p.title())
await b.close()
