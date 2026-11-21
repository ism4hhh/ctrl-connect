import React, { useMemo, useState } from 'react'
import { OPPS, YEARS, CATEGORIES, ELIG, daysLeft, fmtDeadline, domainLogo } from '../data/opportunities.js'
import { byId } from '../data/socials.js'
import { Chips, Tag, Screen, AttendeeList, Logo, useApp } from '../components/ui.jsx'
import { store, useStore } from '../store.js'

const catLabel = (k) => CATEGORIES.find((c) => c.key === k)?.label
function Countdown({ iso }) {
  const d = daysLeft(iso)
  const kind = d <= 3 ? 'red' : d <= 7 ? 'amber' : 'grey'
  return <span className={'count ' + kind}>{d <= 0 ? 'Closes today' : d === 1 ? 'Closes tomorrow' : `Closes in ${d} days`}</span>
}
const yearLabel = (y) => (y === 'pg' ? 'Postgrad' : `Year ${y}`)

export function OpportunitiesScreen({ onBack }) {
  const { push } = useApp()
  const { user } = useStore()
  const [year, setYear] = useState(user.year || 1)
  const [cat, setCat] = useState('all')
  const [view, setView] = useState('list')
  const list = useMemo(() => OPPS.filter((o) => o.years.includes(year) && (cat === 'all' || o.cat === cat)).sort((a, b) => a.deadline.localeCompare(b.deadline)), [year, cat])
  return (
    <Screen title="Opportunities" onBack={onBack}>
      <div className="intro">
        <h1>Things you'd never hear about.</h1>
        <p>Funding, insight days and competitions filtered to your year, with who else on your course is applying.</p>
      </div>
      <Chips options={YEARS} value={year} onChange={(y) => { setYear(y); store.setUser({ year: y }) }} />
      <Chips options={[{ key: 'all', label: 'All' }, ...CATEGORIES]} value={cat} onChange={setCat} />
      <div className="seg small">
        <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>List</button>
        <button className={view === 'timeline' ? 'on' : ''} onClick={() => setView('timeline')}>Deadlines</button>
      </div>
      {view === 'list' ? (
        <div className="list">
          {list.map((o) => (
            <button key={o.id} className="card opp" onClick={() => push('opp', { id: o.id })}>
              <Logo src={domainLogo(o.domain)} name={o.org} color={o.color} />
              <div className="body-col">
                <div className="society">{catLabel(o.cat)} · {o.org}</div>
                <div className="title">{o.title}</div>
                <div className="meta"><Countdown iso={o.deadline} /> <span className="dot">·</span> {fmtDeadline(o.deadline)}</div>
                <div className="tags">{o.elig.map((t) => <Tag key={t} kind={t === 'all' ? 'grey' : ''}>{ELIG[t]}</Tag>)}</div>
                {o.applying ? <div className="going">{o.applying} {o.applying === 1 ? 'person' : 'people'} on your course {o.applying === 1 ? 'is' : 'are'} applying</div> : null}
              </div>
            </button>
          ))}
          {list.length === 0 ? <div className="empty">Nothing in this category for your year yet.</div> : null}
        </div>
      ) : (
        <div className="timeline">
          {list.map((o, i) => {
            const month = new Date(o.deadline + 'T12:00:00').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
            const prev = i ? new Date(list[i - 1].deadline + 'T12:00:00').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : null
            return (
              <React.Fragment key={o.id}>
                {month !== prev ? <div className="month">{month}</div> : null}
                <button className="tl-item" onClick={() => push('opp', { id: o.id })}>
                  <div className="date"><b>{new Date(o.deadline + 'T12:00:00').getDate()}</b><span>{new Date(o.deadline + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short' })}</span></div>
                  <div className="line"><i /></div>
                  <div className="what"><div className="title">{o.title}</div><div className="sub">{o.org} · <Countdown iso={o.deadline} /></div></div>
                </button>
              </React.Fragment>
            )
          })}
        </div>
      )}
    </Screen>
  )
}

export function OppDetail({ params, onBack }) {
  const o = OPPS.find((x) => x.id === params.id)
  const { buddies } = useStore()
  const { requireAuth } = useApp()
  const asked = !!buddies[o.id]
  const people = o.buddies.map(byId).filter(Boolean).map((a) => ({ ...a, solo: true }))
  return (
    <Screen title={catLabel(o.cat)} onBack={onBack} footer={<button className="btn" onClick={() => {}}>Apply on {o.org.split(' ')[0]}'s site ↗</button>}>
      <div className="cover" style={{ '--c': o.color }}>
        <Logo src={domainLogo(o.domain)} name={o.org} color={o.color} size={66} />
        <div className="txt"><b>{o.org}</b><span>{catLabel(o.cat)} · {o.years.map(yearLabel).join(', ')}</span></div>
      </div>
      <div className="card pad hero-card after-cover">
        <h1>{o.title}</h1>
        <div className="deadline"><Countdown iso={o.deadline} /><span>Deadline {fmtDeadline(o.deadline)}</span></div>
        <div className="tags">{o.elig.map((t) => <Tag key={t} kind={t === 'all' ? 'grey' : ''}>{ELIG[t]}</Tag>)}</div>
        <p className="blurb">{o.blurb}</p>
        {o.applying ? <div className="going big">{o.applying} people on your course are applying</div> : null}
      </div>
      <div className="section-title">Find an application buddy</div>
      <div className="card pad note">Applying with someone doubles the chance you actually submit. Match with another applicant: once you both say yes you get each other's details and a time to go through the form together.</div>
      {!asked ? (
        <button className="btn secondary" style={{ margin: '10px 16px 0', width: 'calc(100% - 32px)' }} onClick={() => requireAuth(() => store.toggleKey('buddies', o.id, true))}>Find an application buddy</button>
      ) : null}
      <AttendeeList
        people={people}
        locked={!asked}
        lockText="Tap “Find an application buddy” to see who else is applying."
        meet="Library ground-floor café, Tuesday 14:00 — bring your draft and go through the form together."
        context="buddy"
        section="opportunities"
        itemId={o.id}
      />
    </Screen>
  )
}
