// The other bottom-nav tabs. Kept light: they exist so the nav behaves like the real app.
import React, { useState } from 'react'
import { Screen, Toggle, Avatar, useApp } from '../components/ui.jsx'
import { store, useStore } from '../store.js'
import { EVENTS } from '../data/socials.js'
import { HOME_TILES } from '../data/tiles.js'

export function SettingsTab() {
  const { user, blocked } = useStore()
  const me = { name: user.name, color: '#063486' }
  const nBlocked = Object.values(blocked).filter(Boolean).length
  return (
    <Screen logo>
      <h1 className="tab-title">Settings</h1>
      <div className="section-title">Ctrl + Connect profile</div>
      <div className="card">
        <div className="row">
          <Avatar a={me} />
          <div className="who">
            <div className="name">{user.name}{user.signedUp ? '' : ' (not signed up yet)'}</div>
            <div className="sub">{user.course} · {user.year === 'pg' ? 'Postgrad' : `Year ${user.year}`}</div>
            <div className="sub">{user.uni}</div>
          </div>
        </div>
        <div className="row"><span className="grow">Hide me from attendee lists</span><Toggle on={user.hidden} onChange={(v) => store.setUser({ hidden: v })} /></div>
        <div className="row"><span className="grow">Blocked people</span><span className="v">{nBlocked}</span></div>
        <div className="row"><button className="link" onClick={() => store.reset()}>Reset demo data</button></div>
      </div>
      <div className="section-title">App</div>
      <div className="card">
        <div className="row"><span className="grow">Notifications</span><span className="v">On</span></div>
        <div className="row"><span className="grow">Language</span><span className="v">English</span></div>
        <div className="row"><span className="grow">Version</span><span className="v">2026.11</span></div>
      </div>
      <div className="section-title">About</div>
      <div className="card pad note">
        <b>Concept prototype · WoHack 2026.</b> “Ctrl + Connect” is a student hackathon concept showing how Socials, Opportunities and Campus Perks could live inside the Queen Mary app. It is not an official Queen Mary University of London product. Every person, event and listing shown is fictional.
      </div>
    </Screen>
  )
}

export function CalendarTab() {
  const { going } = useStore()
  const { push } = useApp()
  const mine = EVENTS.filter((e) => going[e.id])
  return (
    <Screen logo>
      <h1 className="tab-title">Calendar</h1>
      <div className="section-title">November 2026</div>
      <div className="card">
        <div className="row"><div className="who"><div className="name">BCH301 — Lecture</div><div className="sub">Mon 24 Nov · 10:00 · Fogg Lecture Theatre</div></div></div>
        <div className="row"><div className="who"><div className="name">Biochemistry practical</div><div className="sub">Wed 26 Nov · 14:00 · Joseph Priestley Building</div></div></div>
      </div>
      <div className="section-title">Socials you're going to</div>
      <div className="card">
        {mine.length === 0 ? <div className="row"><div className="who"><div className="sub">Nothing yet — sign up to an event in Socials and it appears here.</div></div></div> : null}
        {mine.map((e) => <button className="row" key={e.id} onClick={() => push('event', { id: e.id })}><div className="who"><div className="name">{e.title}</div><div className="sub">{e.when} · {e.where}</div></div><span className="v">›</span></button>)}
      </div>
    </Screen>
  )
}

export function AlertsTab() {
  return (
    <Screen logo>
      <h1 className="tab-title">Alerts</h1>
      <div className="card">
        <div className="row"><div className="who"><div className="name">Security alert: scammers pretending to be IT Services</div><div className="sub">IT Services will never ask for your password by phone. Today, 09:10</div></div></div>
        <div className="row"><div className="who"><div className="name">New in the app: Socials, Opportunities, Campus Perks</div><div className="sub">Find your people and never miss a deadline. Yesterday</div></div></div>
        <div className="row"><div className="who"><div className="name">Library opening hours over the winter break</div><div className="sub">Mile End Library closes at 20:00 from 15 Dec. Thu</div></div></div>
      </div>
    </Screen>
  )
}

export function SearchTab() {
  const [q, setQ] = useState('')
  const { push } = useApp()
  const tiles = HOME_TILES.filter((t) => t.label && t.label.toLowerCase().includes(q.toLowerCase()))
  const events = q ? EVENTS.filter((e) => (e.title + e.society).toLowerCase().includes(q.toLowerCase())) : []
  return (
    <Screen logo>
      <h1 className="tab-title">Search</h1>
      <div style={{ padding: '0 16px' }}><input className="input" placeholder="Search the app" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="section-title">Services</div>
      <div className="card">{tiles.slice(0, 8).map((t, i) => <button className="row" key={t.label + i} onClick={() => t.screen && push(t.screen)}><div className="who"><div className="name">{t.label}</div></div><span className="v">›</span></button>)}</div>
      {events.length ? <><div className="section-title">Socials</div><div className="card">{events.map((e) => <button className="row" key={e.id} onClick={() => push('event', { id: e.id })}><div className="who"><div className="name">{e.title}</div><div className="sub">{e.society} · {e.when}</div></div><span className="v">›</span></button>)}</div></> : null}
    </Screen>
  )
}
