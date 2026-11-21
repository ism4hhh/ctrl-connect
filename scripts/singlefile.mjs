// Build the app into ONE self-contained HTML file (JS, CSS and images inlined) that opens from disk.
import { build } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
await build({ base: './', logLevel: 'silent', build: { outDir: 'dist-single', emptyOutDir: true, modulePreload: false, cssCodeSplit: false } })
let html = fs.readFileSync('dist-single/index.html', 'utf8')
html = html.replace(/<script type="module"[^>]*src="\.\/(assets\/[^"]+)"><\/script>/, (_, f) => `<script type="module">${fs.readFileSync('dist-single/' + f, 'utf8').replace(/<\/script>/g, '<\\/script>')}</script>`)
html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+)">/, (_, f) => `<style>${fs.readFileSync('dist-single/' + f, 'utf8')}</style>`)
html = html.replace(/<link rel="manifest"[^>]*>\s*/g, '')
const mime = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' }
html = html.replace(/(?:\.{1,2}\/)*\/?(img|logos)\/([A-Za-z0-9_./-]+?\.(png|jpg|webp))/g, (m, dir, f, ext) => {
  const p = path.join('public', dir, f); if (!fs.existsSync(p)) return m
  return `data:${mime[ext]};base64,${fs.readFileSync(p).toString('base64')}`
})
const map = {}
const walk = (d) => fs.readdirSync(d).forEach((f) => { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (/\.(png|jpg|webp)$/.test(f)) map['/' + path.relative('public', p).split(path.sep).join('/')] = `data:${mime[f.split('.').pop()]};base64,${fs.readFileSync(p).toString('base64')}` })
walk('public/img'); walk('public/logos')
html = html.replace('<script type="module">', `<script>window.__IMG=${JSON.stringify(map)}</script><script type="module">`)
fs.writeFileSync('plusone.html', html)
console.log('plusone.html', (fs.statSync('plusone.html').size / 1024).toFixed(0), 'KB')
