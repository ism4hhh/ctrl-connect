// Quality check: open plusone.html from disk, click through every flow, screenshot at phone and desktop sizes.
import { chromium } from 'playwright'
import fs from 'node:fs'
const out = 'qa/out/qc'; fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true })
const url = 'file://' + process.cwd() + '/plusone.html'
const browser = await chromium.launch()
const errors = []
const mk = async (desktop) => {
  const p = desktop
    ? await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 })
    : await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  p.on('pageerror', (e) => errors.push((desktop ? 'desktop ' : 'phone ') + e.message))
  p.on('console', (m) => { if (m.type() === 'error' && !/favicon/.test(m.text())) errors.push((desktop ? 'desktop ' : 'phone ') + m.text()) })
  await p.goto(url); await p.waitForTimeout(2300)
  await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(2300)
  return p
}
let n = 0
const shot = async (p, name, pre = 'phone') => { await p.waitForTimeout(450); await p.screenshot({ path: `${out}/${pre}-${String(++n).padStart(2, '0')}-${name}.png` }) }
const tap = async (p, sel) => { await p.locator(sel).last().click() }
const scrollBody = async (p, y) => { await p.evaluate((y) => { const b = [...document.querySelectorAll('.screen .body')].pop(); if (b) b.scrollTop = y }, y) }

// ---------- phone walkthrough ----------
const p = await mk(false)
await shot(p, 'home')
await p.evaluate(() => { document.querySelector('.scroll').scrollTop = 250 }); await shot(p, 'home-new-tiles')
await tap(p, '.tile[data-label="Socials"]'); await shot(p, 'socials')
await tap(p, '.chip:has-text("Daytime")'); await shot(p, 'socials-daytime'); await tap(p, '.chip:has-text("All")')
await p.locator('.card.event').first().click(); await shot(p, 'event-locked')
await scrollBody(p, 520); await shot(p, 'event-locked-list')
await p.locator('.footer .btn').click(); await shot(p, 'signup-1')
await tap(p, '.form .btn'); await shot(p, 'signup-2')
await tap(p, '.form .btn'); await shot(p, 'signup-3')
await tap(p, '.link:has-text("demo code")'); await tap(p, '.form .btn'); await p.waitForTimeout(600); await shot(p, 'event-going')
await scrollBody(p, 560); await shot(p, 'event-attendees')
await p.locator('.attendees .btn:has-text("Match")').first().click(); await shot(p, 'match-pending')
await p.waitForTimeout(2300); await shot(p, 'match-done')
await tap(p, '.sheet .btn.plain'); await tap(p, '.header .back'); await tap(p, '.header .back')
await tap(p, '.tile[data-label="Opportunities"]'); await shot(p, 'opps-year1')
await tap(p, '.chip:has-text("3rd year")'); await shot(p, 'opps-year3')
await tap(p, '.chip:has-text("Postgrad")'); await shot(p, 'opps-postgrad')
await tap(p, '.chip:has-text("Spring weeks")'); await tap(p, '.chip:has-text("1st year")'); await shot(p, 'opps-springweeks-y1')
await tap(p, '.chip:has-text("All")'); await tap(p, '.seg.small button:has-text("Deadlines")'); await shot(p, 'opps-timeline')
await p.locator('.tl-item').first().click(); await shot(p, 'opp-detail')
await tap(p, '.btn.secondary:has-text("buddy")'); await scrollBody(p, 380); await shot(p, 'opp-buddies')
await p.locator('.attendees .btn:has-text("Match")').first().click(); await p.waitForTimeout(2400); await shot(p, 'buddy-match')
await tap(p, '.sheet .btn.plain'); await tap(p, '.header .back'); await tap(p, '.header .back')
await tap(p, '.tile[data-label="Campus Perks"]'); await shot(p, 'perks-food')
await tap(p, '.seg.tabs button:has-text("Deals")'); await shot(p, 'perks-deals')
await tap(p, '.seg.tabs button:has-text("Period")'); await p.locator('.btn.small.secondary:has-text("Report")').first().click(); await shot(p, 'perks-period')
await tap(p, '.header .back')
await tap(p, '.nav button:has-text("Settings")'); await shot(p, 'settings')
await p.close()

// ---------- desktop ----------
n = 0
const d = await mk(true)
await shot(d, 'home', 'desktop')
await tap(d, '.tile[data-label="Socials"]'); await shot(d, 'socials', 'desktop')
await d.locator('.card.event').first().click(); await shot(d, 'event', 'desktop')
await tap(d, '.header .back'); await tap(d, '.header .back')
await tap(d, '.tile[data-label="Opportunities"]'); await shot(d, 'opps', 'desktop')
await tap(d, '.header .back'); await tap(d, '.tile[data-label="Campus Perks"]'); await tap(d, '.seg.tabs button:has-text("Deals")'); await shot(d, 'perks', 'desktop')
await d.setViewportSize({ width: 1100, height: 650 }); await shot(d, 'small-window', 'desktop')
await d.close()
console.log('errors:', errors.length ? errors : 'none')
await browser.close()
