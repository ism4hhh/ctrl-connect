// Shared building blocks for the Ctrl + Connect screens, styled per DESIGN.md (navy/teal, Source Sans, square corners).
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './Chrome.jsx'
import { store, useStore } from '../store.js'
import { img } from '../img.js'

export const AppCtx = createContext({ push: () => {}, pop: () => {}, requireAuth: (fn) => fn() })
export const useApp = () => useContext(AppCtx)

export function Screen({ title, onBack, children, footer, logo }) {
  return (
    <>
      {logo ? <Header /> : <Header title={title} onBack={onBack} />}
      <div className="body">{children}</div>
      {footer ? <div className="footer">{footer}</div> : null}
    </>
  )
}

export function Chips({ options, value, onChange, multi }) {
  return (
    <div className="chips">
      {options.map((o) => {
        const on = multi ? value.includes(o.key) : value === o.key
        return <button key={o.key} className={'chip' + (on ? ' on' : '')} onClick={() => onChange(o.key)}>{o.label}</button>
      })}
    </div>
  )
}

export const Tag = ({ children, kind = '' }) => <span className={'tag ' + kind}>{children}</span>

// 44px rounded-square logo; falls back to initials in a coloured circle when there is no image or it fails to load.
export function Logo({ src, name, color = '#063486', size = 44 }) {
  const [err, setErr] = useState(false)
  const initials = (name || '').split(/\s+/).filter((w) => /^[A-Za-z0-9]/.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
  const [wide, setWide] = useState(false)
  if (!src || err) return <span className="lg fallback" style={{ width: size, height: size, background: color, fontSize: Math.round(size * 0.38) }}>{initials}</span>
  return (
    <span className={'lg' + (wide ? ' wide' : '')} style={{ width: wide ? Math.round(size * 1.5) : size, height: size }}>
      <img src={img(src)} alt="" onError={() => setErr(true)} onLoad={(e) => { const i = e.currentTarget; if (i.naturalWidth / i.naturalHeight > 1.9) setWide(true) }} />
    </span>
  )
}

export function Avatar({ a, size = 40, blur }) {
  return <span className={'avatar' + (blur ? ' blurred' : '')} style={{ background: a.color, width: size, height: size, fontSize: size * 0.4 }}>{a.name[0]}</span>
}

export function Toggle({ on, onChange }) {
  return <button className={'toggle' + (on ? ' on' : '')} onClick={() => onChange(!on)} aria-pressed={on}><i /></button>
}

const portal = (node) => { const root = document.querySelector('.phone'); return root ? createPortal(node, root) : node }

export function Sheet({ open, onClose, children, title }) {
  return portal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}>
            <div className="grab" />
            {title ? <h3 className="sheet-title">{title}</h3> : null}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function Toast({ msg }) {
  return portal(
    <AnimatePresence>
      {msg && (
        <motion.div className="toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{msg}</motion.div>
      )}
    </AnimatePresence>
  )
}
export function useToast() {
  const [msg, setMsg] = useState('')
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(''), 2600); return () => clearTimeout(t) }, [msg])
  return [msg, setMsg]
}

export function Confetti() {
  const bits = useMemo(() => Array.from({ length: 28 }, (_, i) => ({ i, a: (i / 28) * Math.PI * 2, d: 90 + (i * 37) % 70, c: ['#2eb0bf', '#e1df17', '#ffffff', '#f97316', '#a78bfa'][i % 5], r: (i * 53) % 360 })), [])
  return (
    <div className="confetti" aria-hidden>
      {bits.map((b) => (
        <motion.i key={b.i} style={{ background: b.c }} initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }} animate={{ x: Math.cos(b.a) * b.d, y: Math.sin(b.a) * b.d + 40, opacity: 0, rotate: b.r, scale: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }} />
      ))}
    </div>
  )
}

export function SafetyNote() {
  const { user } = useStore()
  return (
    <div className="safety">
      <div className="section-title">How this stays safe</div>
      <div className="card pad">
        <p><b>Verified uni emails only.</b> Everyone here signed up with a .ac.uk address and a one-time code.</p>
        <p><b>Mutual opt-in.</b> You only see someone's LinkedIn or number after you both tap Match. Nothing is shared one-way.</p>
        <p><b>Report or block</b> anyone from the ⋯ on their row. Blocked people never see you again.</p>
        <div className="row-inline">
          <span>Hide me from attendee lists</span>
          <Toggle on={user.hidden} onChange={(v) => store.setUser({ hidden: v })} />
        </div>
      </div>
    </div>
  )
}

const lockIcon = (
  <svg width="26" height="30" viewBox="0 0 26 30" fill="none" stroke="#063486" strokeWidth="2" strokeLinejoin="round"><rect x="2" y="12" width="22" height="16" rx="2" /><path d="M7 12V8a6 6 0 0 1 12 0v4" /><circle cx="13" cy="20" r="2" fill="#063486" stroke="none" /></svg>
)

// Attendee list with the blurred/locked state, Match buttons and report/block.
export function AttendeeList({ people, locked, lockText, meet, context, section, itemId }) {
  const { matches, blocked } = useStore()
  const mOf = (a) => matches?.[section]?.[itemId]?.[a.id] || null
  const { requireAuth } = useApp()
  const [active, setActive] = useState(null)
  const [more, setMore] = useState(null)
  const [toast, setToast] = useToast()
  const visible = people.filter((a) => !blocked[a.id])
  const startMatch = (a) => requireAuth(() => { if (!store.getMatch(section, itemId, a.id)) store.setMatch(section, itemId, a.id, 'pending'); setActive(a) })
  return (
    <div className="attendees">
      <div className={'card' + (locked ? ' locked' : '')}>
        {(locked ? visible.slice(0, 4) : visible).map((a) => (
          <div className="row" key={a.id}>
            <Avatar a={a} blur={locked} />
            <div className={'who' + (locked ? ' blurred' : '')}>
              <div className="name">{a.name} {a.external ? <Tag kind="grey">{a.external}</Tag> : null}</div>
              <div className="sub">{a.course} · {a.year === 'pg' ? 'Postgrad' : `Year ${a.year}`}{a.solo ? <span className="solo"> · going solo</span> : null}</div>
            </div>
            {!locked && a.solo ? (
              <button className={'btn small' + (mOf(a) === 'matched' ? ' matched' : mOf(a) === 'pending' ? ' secondary' : '')} data-match={mOf(a) || 'none'} onClick={() => startMatch(a)}>
                {mOf(a) === 'matched' ? 'Matched ✓' : mOf(a) === 'pending' ? 'Sent' : 'Match'}
              </button>
            ) : null}
            {!locked ? <button className="more" onClick={() => setMore(a)} aria-label="More">⋯</button> : null}
          </div>
        ))}
        {locked ? (
          <div className="lock-overlay">
            {lockIcon}
            <b>Only attendees can see who's going</b>
            <span>{lockText}</span>
          </div>
        ) : null}
      </div>
      {!locked && visible.length === 0 ? <div className="empty">Nobody to show yet.</div> : null}
      <MatchSheet a={active} meet={meet} context={context} section={section} itemId={itemId} onClose={() => setActive(null)} />
      <Sheet open={!!more} onClose={() => setMore(null)} title={more ? more.name : ''}>
        <button className="sheet-btn" onClick={() => { store.toggleKey('reported', more.id, true); setMore(null); setToast('Thanks — the Students’ Union team will review this within 24 hours.') }}>Report {more?.name}</button>
        <button className="sheet-btn danger" onClick={() => { store.toggleKey('blocked', more.id, true); setMore(null); setToast(`${more.name} is blocked and can no longer see you.`) }}>Block {more?.name}</button>
        <button className="sheet-btn plain" onClick={() => setMore(null)}>Cancel</button>
      </Sheet>
      <Toast msg={toast} />
    </div>
  )
}

export function MatchSheet({ a, meet, context, section, itemId, onClose }) {
  const { matches } = useStore()
  const st = a ? matches?.[section]?.[itemId]?.[a.id] || null : null
  useEffect(() => {
    if (!a || st !== 'pending') return
    const t = setTimeout(() => store.setMatch(section, itemId, a.id, 'matched'), 2200) // simulated acceptance
    return () => clearTimeout(t)
  }, [a, st, section, itemId])
  return (
    <Sheet open={!!a} onClose={onClose}>
      {a && st !== 'matched' ? (
        <div className="match pending">
          <Avatar a={a} size={64} />
          <h3>Request sent to {a.name}</h3>
          <div className="spinner dark" />
          <p>Waiting for {a.name} to say yes. Their contact details stay hidden until you both match.</p>
          <button className="btn secondary" onClick={onClose}>Close</button>
        </div>
      ) : a ? (
        <div className="match done">
          <Confetti />
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
            <Avatar a={a} size={64} />
            <h3>It's a match!</h3>
            <p className="lead">{a.name} wants to {context === 'buddy' ? 'apply together' : 'go with you'} too.</p>
          </motion.div>
          <div className="card pad contact">
            <div className="kv"><span>LinkedIn</span><b>linkedin.com/{a.linkedin}</b></div>
            <div className="kv"><span>Phone</span><b>{a.phone}</b></div>
            <div className="kv"><span>Suggested meeting point</span><b>{meet}</b></div>
          </div>
          <button className="btn" onClick={onClose}>Message {a.name}</button>
          <button className="btn plain" onClick={onClose}>Done</button>
        </div>
      ) : null}
    </Sheet>
  )
}

export function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), ms); return () => clearInterval(t) }, [ms])
  return now
}
