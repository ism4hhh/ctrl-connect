// Matches must be isolated per section and per item.
import { chromium } from 'playwright'
import { createServer } from 'vite'
const server = await createServer({ server: { port: 5196, strictPort: true }, logLevel: 'silent' }); await server.listen()
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const base = 'http://localhost:5196'
const seed = { user: { signedUp: true, name: 'Aisha', external: false, uni: 'Queen Mary University of London', email: 'aisha.demo@qmul.ac.uk', course: 'Biochemistry', year: 1, hidden: false }, going: { e1: true, e2: true, e8: true }, buddies: { o1: true, o5: true } }
await p.goto(base + '/?qa=1'); await p.evaluate((s) => localStorage.setItem('plusone.v1', JSON.stringify(s)), seed)
const btn = (name) => p.locator(`.attendees .row:has(.name:has-text("${name}")) .btn`).first()
const state = async (name) => (await btn(name).getAttribute('data-match'))
const open = async (q) => { await p.goto(base + '/?qa=1&' + q, { waitUntil: 'networkidle' }); await p.waitForTimeout(400) }
const results = []
const check = (label, got, want) => { results.push([label, got, want, got === want ? 'PASS' : 'FAIL']) }
// 1. match Maya on event e1
await open('screen=event&id=e1'); check('e1 Maya before', await state('Maya'), 'none')
await btn('Maya').click(); await p.waitForTimeout(2600); await p.locator('.sheet .btn.plain').click(); await p.waitForTimeout(300)
check('e1 Maya after match', await state('Maya'), 'matched')
// 2. same person on another event stays unmatched
await open('screen=event&id=e2'); check('e2 Maya (other event)', await state('Maya'), 'none')
await open('screen=event&id=e8'); check('e8 Maya (other event)', await state('Maya'), 'none')
// 3. opportunities buddy list stays unmatched
await open('screen=opp&id=o1'); check('o1 Maya (opportunities)', await state('Maya'), 'none')
// 4. match Maya as a buddy on o1; must not leak to o5 or back to events
await btn('Maya').click(); await p.waitForTimeout(2600); await p.locator('.sheet .btn.plain').click(); await p.waitForTimeout(300)
check('o1 Maya after buddy match', await state('Maya'), 'matched')
await open('screen=opp&id=o5'); check('o5 Maya (other opportunity)', await state('Maya'), 'none')
await open('screen=event&id=e2'); check('e2 Maya still none', await state('Maya'), 'none')
await open('screen=event&id=e1'); check('e1 Maya still matched', await state('Maya'), 'matched')
const stored = await p.evaluate(() => JSON.parse(localStorage.getItem('plusone.v1')).matches)
check('store shape', JSON.stringify(stored), JSON.stringify({ socials: { e1: { a1: 'matched' } }, opportunities: { o1: { a1: 'matched' } } }))
console.table(results.map(([l, g, w, r]) => ({ check: l, got: g, want: w, result: r })))
const fails = results.filter((r) => r[3] === 'FAIL').length
await b.close(); await server.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0)
