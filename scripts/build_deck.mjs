// Build plusone_deck.html (self-contained) and script.md from deck/deck.html + deck/notes.json.
// usage: node scripts/build_deck.mjs [out.html] [APP_URL override for testing]
import fs from 'node:fs'
const out = process.argv[2] || 'plusone_deck.html'
const urlOverride = process.argv[3]
const b64 = (p, mime) => `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`
const notes = JSON.parse(fs.readFileSync('deck/notes.json', 'utf8'))
let html = fs.readFileSync('deck/deck.html', 'utf8')
html = html.replace('{{QRLIB}}', () => fs.readFileSync('node_modules/qrcode-generator/dist/qrcode.js', 'utf8'))
html = html.replace('{{AISHA}}', () => b64('aisha.png', 'image/png'))
html = html.replace('{{HOME}}', () => b64('deck/home-shot.jpg', 'image/jpeg'))
html = html.replace('{{APP_EMBED}}', () => fs.readFileSync('plusone.html').toString('base64'))
if (urlOverride) html = html.replace('const APP_URL = "https://PLACEHOLDER.vercel.app";', `const APP_URL = ${JSON.stringify(urlOverride)};`)
fs.writeFileSync(out, html)
// script.md
const words = notes.reduce((n, s) => n + s.notes.replace(/\([^)]*\)/g, '').split(/\s+/).filter(Boolean).length, 0)
let md = `# Ctrl + Connect · pitch script\n\nCtrl + Connect · WoHack 2026 · about ${words} words, roughly ${Math.round(words / 135 * 60)} seconds at a natural pace.\n\n`
notes.forEach((s, k) => { md += `## ${k + 1}. ${s.title}\n\n${s.notes}\n\n` })
fs.writeFileSync('script.md', md)
console.log(out, (fs.statSync(out).size / 1024).toFixed(0), 'KB ·', words, 'words')
