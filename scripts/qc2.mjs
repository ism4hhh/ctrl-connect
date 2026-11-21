import { chromium } from 'playwright'
const url = 'file://' + process.cwd() + '/plusone.html'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
await p.goto(url); await p.waitForTimeout(2600); await p.screenshot({ path: 'qa/out/qc/final-phone-home.png' })
await p.locator('.tile[data-label="Socials"]').click(); await p.waitForTimeout(700); await p.screenshot({ path: 'qa/out/qc/final-phone-socials.png' })
const d = await b.newPage({ viewport: { width: 1100, height: 650 } })
await d.goto(url); await d.waitForTimeout(2600); await d.screenshot({ path: 'qa/out/qc/final-desktop-small.png' })
await b.close(); console.log('ok')
