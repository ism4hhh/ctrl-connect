// App chrome shared by every screen: status bar, header, bottom nav.
import { img } from '../img.js'
import React from 'react'
import { BackIcon } from './Icons.jsx'
import meta from '../data/chromeMeta.json'

const SB = 59 // status bar height the reference metrics were measured with
const NAV_TOP = 852 - 72 - 34 // 746 in the reference frame

export function StatusBar() {
  return (
    <div className="statusbar" aria-hidden>
      <div className="time">9:41</div>
      <div className="right">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="#000"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" opacity=".3" /><rect x="10" y="3" width="3" height="9" rx="1" opacity=".3" /><rect x="15" y="0" width="3" height="12" rx="1" opacity=".3" /></svg>
        <span className="net">5G</span>
        <svg width="28" height="13" viewBox="0 0 28 13"><rect x="0.5" y="0.5" width="24" height="12" rx="3.5" fill="none" stroke="#000" strokeOpacity=".35" /><rect x="2" y="2" width="5" height="9" rx="1.5" fill="#ff3b30" /><path d="M26.5 4.5v4a2 2 0 0 0 0-4z" fill="#000" fillOpacity=".4" /></svg>
      </div>
    </div>
  )
}

function Glyph({ k }) {
  const m = meta[k]
  return <i className="glyph" style={{ left: m.x, top: `calc(var(--sb) + ${m.y - SB}px)`, width: m.w, height: m.h, WebkitMaskImage: `url(${img(`/img/icons/${k}.png`)})`, maskImage: `url(${img(`/img/icons/${k}.png`)})` }} />
}

export function Header({ title, onBack }) {
  return (
    <div className="header">
      {title ? (
        <>
          <button className="back" onClick={onBack} aria-label="Back"><BackIcon /></button>
          <div className="title">{title}</div>
        </>
      ) : (
        <img className="logo" src={img('/img/qm-logo.png')} alt="Queen Mary University of London" />
      )}
      <Glyph k="hdr-refresh" />
      <Glyph k="hdr-kebab" />
    </div>
  )
}

const NAV = [
  { key: 'home', label: 'My Campus' },
  { key: 'settings', label: 'Settings' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'search', label: 'Search' },
]

export function BottomNav({ active = 'home', onSelect }) {
  return (
    <nav className="nav">
      {NAV.map((n) => {
        const m = meta['nav-' + n.key]
        return (
          <button key={n.key} className={active === n.key ? 'on' : ''} onClick={() => onSelect?.(n.key)}>
            <i className="nicon" style={{ width: m.w, height: m.h, top: m.y - NAV_TOP - 1, WebkitMaskImage: `url(${img(`/img/icons/nav-${n.key}.png`)})`, maskImage: `url(${img(`/img/icons/nav-${n.key}.png`)})` }} />
            <span>{n.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
