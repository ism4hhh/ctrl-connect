import { chromium } from 'playwright'
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
await p.goto('file://' + process.cwd() + '/plus-one.html'); await p.waitForTimeout(2500)
await p.screenshot({ path: 'qa/out/file-home.png' })
await p.locator('.tile[data-label="Socials"]').click(); await p.waitForTimeout(700); await p.locator('.card.event').first().click(); await p.waitForTimeout(700)
await p.screenshot({ path: 'qa/out/file-event.png' })
console.log('file:// errors:', errs.length ? errs : 'none'); await b.close()
