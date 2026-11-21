import React, { useMemo, useState } from 'react'
import { FOOD, DEALS, PERIOD } from '../data/freecheap.js'
import { domainLogo } from '../data/opportunities.js'
import { Screen, Tag, Sheet, Logo, useNow, useToast, Toast } from '../components/ui.jsx'
import { store, useStore } from '../store.js'

const STATUS = { ok: ['In stock', 'green'], low: ['Running low', 'amber'], out: ['Out of stock', 'red'] }
const TABS = [['food', 'Free food'], ['deals', 'Deals & openings'], ['period', 'Period products']]

export function PerksScreen({ onBack, params }) {
  const loaded = useMemo(() => Date.now(), [])
  const now = useNow(1000)
  const { claimed, stockReports } = useStore()
  const [tab, setTab] = useState(params?.tab || 'food')
  const [extra, setExtra] = useState([])
  const [post, setPost] = useState(false)
  const [form, setForm] = useState({ what: '', where: '', mins: 60 })
  const [toast, setToast] = useToast()
  const food = [...extra, ...FOOD]
  const left = (f) => Math.max(0, Math.round((loaded + f.mins * 60000 - now) / 60000))
  return (
    <Screen title="Campus Perks" onBack={onBack}>
      <div className="intro">
        <h1>Eat well on a student budget.</h1>
        <p>Free food left over from events, student deals around Mile End, and where the free period products are.</p>
      </div>
      <div className="seg tabs" role="tablist">
        {TABS.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}
      </div>

      {tab === 'food' && (
        <>
          <div className="section-title">Free food right now</div>
          <div className="list">
            {food.map((f) => {
              const m = left(f)
              return (
                <div key={f.id} className={'card pad food' + (m === 0 ? ' gone' : '')} style={{ display: 'flex', gap: 12 }}>
                  <Logo src={f.logo || domainLogo(f.domain)} name={f.society} color={f.color} />
                  <div className="body-col">
                    <div className="title">{f.what}</div>
                    <div className="meta">{f.where} · {f.portions}</div>
                    <div className="meta small">Posted by {f.by}</div>
                    <div className="food-foot">
                      <span className={'count ' + (m <= 15 ? 'red' : m <= 45 ? 'amber' : 'grey')}>{m === 0 ? 'Gone' : `Expires in ${m} min`}</span>
                      <button className={'btn small' + (claimed[f.id] ? ' matched' : '')} onClick={() => store.toggleKey('claimed', f.id)}>{claimed[f.id] ? 'On my way ✓' : "I'm heading there"}</button>
                    </div>
                  </div>
                </div>
              )
            })}
            <button className="btn secondary" onClick={() => setPost(true)}>Post free food</button>
          </div>
        </>
      )}

      {tab === 'deals' && (
        <>
          <div className="section-title">Student deals & new openings near Mile End</div>
          <div className="card">
            {DEALS.map((d) => (
              <div className="row" key={d.id}>
                <Logo src={domainLogo(d.domain)} name={d.name} color={d.color} />
                <div className="who">
                  <div className="name">{d.name} <Tag kind={d.tag === 'New opening' ? 'green' : d.tag === 'Cheap eats' ? 'amber' : 'grey'}>{d.tag}</Tag></div>
                  <div className="sub">{d.what} · {d.until}</div>
                  <div className="sub">{d.where}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="fine" style={{ padding: '10px 16px 0' }}>Show your QMUL ID or TOTUM card. Deals change weekly — societies can submit new ones from the ⋯ menu.</p>
        </>
      )}

      {tab === 'period' && (
        <>
          <div className="section-title">Free period products on campus</div>
          <div className="card">
            {PERIOD.map((p) => {
              const reported = stockReports[p.id]
              const [label, kind] = reported ? ['Out of stock', 'red'] : STATUS[p.status]
              return (
                <div className="row" key={p.id}>
                  <div className="who">
                    <div className="name">{p.where}</div>
                    <div className="sub"><Tag kind={kind}>{label}</Tag> {reported ? <span>Reported just now · restock requested</span> : p.note ? <span>{p.note}</span> : null}</div>
                  </div>
                  {!reported && p.status !== 'out' ? <button className="btn small secondary" onClick={() => { store.toggleKey('stockReports', p.id, Date.now()); setToast('Thanks — Estates have been notified.') }}>Report out of stock</button> : null}
                </div>
              )
            })}
          </div>
          <p className="fine" style={{ padding: '10px 16px 0' }}>Products are provided by the Students' Union. Reports go straight to the Estates helpdesk.</p>
        </>
      )}

      <Sheet open={post} onClose={() => setPost(false)} title="Post free food">
        <label className="label">What is it?</label>
        <input className="input" value={form.what} onChange={(e) => setForm({ ...form, what: e.target.value })} placeholder="e.g. Leftover sandwiches" />
        <label className="label">Where?</label>
        <input className="input" value={form.where} onChange={(e) => setForm({ ...form, where: e.target.value })} placeholder="Building and room" />
        <label className="label">Gone in about</label>
        <div className="seg">{[30, 60, 120].map((m) => <button key={m} className={form.mins === m ? 'on' : ''} onClick={() => setForm({ ...form, mins: m })}>{m} min</button>)}</div>
        <button className={'btn' + (form.what && form.where ? '' : ' disabled')} style={{ marginTop: 14 }} onClick={() => { if (!form.what || !form.where) return; setExtra([{ id: 'x' + Date.now(), what: form.what, where: form.where, by: 'You', mins: form.mins, portions: 'Help yourself', color: '#063486', society: 'You' }, ...extra]); setPost(false); setForm({ what: '', where: '', mins: 60 }); setToast('Posted. It disappears automatically when the timer runs out.') }}>Post</button>
      </Sheet>
      <Toast msg={toast} />
    </Screen>
  )
}
