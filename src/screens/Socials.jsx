import React, { useState } from 'react'
import { EVENTS, EVENT_FILTERS, TAG_LABEL, byId, societyLogo } from '../data/socials.js'
import { Chips, Tag, Screen, AttendeeList, SafetyNote, Logo, useApp } from '../components/ui.jsx'
import { store, useStore } from '../store.js'

const Pin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-7-7.5-7-12.5a7 7 0 0 1 14 0C19 14.5 12 22 12 22z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
const Clock = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
const Walk = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13" cy="4" r="1.5" /><path d="M10 22l2-7 3 2v5M8 13l2-5 4 1 2 3M14 9l-1 4" /></svg>

export function EventCard({ e, onPress }) {
  const { going } = useStore()
  return (
    <button className="card event" onClick={() => onPress(e)}>
      <Logo src={societyLogo(e)} name={e.society} color={e.color} />
      <div className="body-col">
        <div className="society">{e.society}</div>
        <div className="title">{e.title}</div>
        <div className="meta"><Clock /> {e.when}</div>
        <div className="meta"><Pin /> {e.where} <span className="dot">·</span> <Walk /> {e.walk}</div>
        <div className="tags">
          <Tag kind={e.campus ? '' : 'amber'}>{e.campus ? 'On campus' : 'Off campus'}</Tag>
          <Tag kind={e.price === 'FREE' ? 'green' : 'grey'}>{e.price}</Tag>
          {e.tags.map((t) => <Tag key={t} kind="grey">{TAG_LABEL[t]}</Tag>)}
        </div>
        <div className="going">{going[e.id] ? <b className="you">You're going · </b> : null}{e.going} going · <b>{e.solo} going solo</b></div>
      </div>
    </button>
  )
}

export function SocialsScreen({ onBack }) {
  const { push } = useApp()
  const [f, setF] = useState('all')
  const list = EVENTS.filter(EVENT_FILTERS.find((x) => x.key === f).fn)
  return (
    <Screen title="Socials" onBack={onBack}>
      <div className="intro">
        <h1>Go to things. Not alone.</h1>
        <p>Society events near Mile End, with the people going solo made visible — so turning up by yourself is the normal option, not the brave one.</p>
      </div>
      <Chips options={EVENT_FILTERS} value={f} onChange={setF} />
      <div className="list">
        {list.map((e) => <EventCard key={e.id} e={e} onPress={(ev) => push('event', { id: ev.id })} />)}
        {list.length === 0 ? <div className="empty">Nothing matches that filter this week.</div> : null}
      </div>
    </Screen>
  )
}

export function EventDetail({ params, onBack }) {
  const e = EVENTS.find((x) => x.id === params.id)
  const { going, user } = useStore()
  const { requireAuth } = useApp()
  const isGoing = !!going[e.id]
  const openAll = e.tags.includes('openall')
  // external students only appear on "open to all unis" events; hidden users don't appear.
  const people = e.attendees.map(byId).filter((a) => a && (openAll || !a.external))
  const toggleGoing = () => requireAuth(() => store.toggleKey('going', e.id, !isGoing))
  return (
    <Screen
      title={e.society}
      onBack={onBack}
      footer={
        isGoing ? (
          <div className="footer-row"><span className="you">✓ You're going</span><button className="btn small secondary" onClick={toggleGoing}>Leave</button></div>
        ) : (
          <button className="btn" onClick={toggleGoing}>Sign up to event</button>
        )
      }
    >
      <div className="cover" style={{ '--c': e.color }}>
        <Logo src={societyLogo(e)} name={e.society} color={e.color} size={66} />
        <div className="txt"><b>{e.society}</b><span>{e.handle} · {e.going} going</span></div>
      </div>
      <div className="card pad hero-card after-cover">
        <h1>{e.title}</h1>
        <div className="meta"><Clock /> {e.when}</div>
        <div className="meta"><Pin /> {e.where}</div>
        <div className="meta"><Walk /> {e.walk} from Mile End campus</div>
        <div className="tags">
          <Tag kind={e.campus ? '' : 'amber'}>{e.campus ? 'On campus' : 'Off campus'}</Tag>
          <Tag kind={e.price === 'FREE' ? 'green' : 'grey'}>{e.price}</Tag>
          {e.tags.map((t) => <Tag key={t} kind="grey">{TAG_LABEL[t]}</Tag>)}
        </div>
        <p className="blurb">{e.blurb}</p>
        <div className="going big">{e.going} going · <b>{e.solo} going solo</b></div>
      </div>

      <div className="section-title">Who's going</div>
      {!openAll && user.external ? (
        <div className="card pad note">This event is for Queen Mary students only. Look for events tagged <b>Open to all unis</b>.</div>
      ) : null}
      <AttendeeList
        people={people}
        locked={!isGoing}
        lockText="Sign up to this event to see the list and find someone to go with."
        meet={e.meet}
        context="event"
        section="socials"
        itemId={e.id}
      />
      {isGoing ? <p className="hint">Tap <b>Match</b> on someone going solo. If they tap it back, you both get each other's details and a meeting point.</p> : null}
      <SafetyNote />
    </Screen>
  )
}
