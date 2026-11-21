import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StatusBar, Header, BottomNav } from './components/Chrome.jsx'
import { AppCtx } from './components/ui.jsx'
import { Home } from './screens/Home.jsx'
import { SocialsScreen, EventDetail } from './screens/Socials.jsx'
import { OpportunitiesScreen, OppDetail } from './screens/Opportunities.jsx'
import { PerksScreen } from './screens/Perks.jsx'
import { SignUpScreen } from './screens/SignUp.jsx'
import { SettingsTab, CalendarTab, AlertsTab, SearchTab } from './screens/Tabs.jsx'
import { store } from './store.js'

const params = new URLSearchParams(location.search)
const QA = params.get('qa') === '1'
const isPhone = () => window.matchMedia('(max-width: 500px)').matches

const SCREENS = { socials: SocialsScreen, event: EventDetail, opportunities: OpportunitiesScreen, opp: OppDetail, perks: PerksScreen, signup: SignUpScreen }
const TABS = { settings: SettingsTab, calendar: CalendarTab, alerts: AlertsTab, search: SearchTab }

export default function App() {
  const name = params.get('name') || 'Aisha'
  const slide = Number(params.get('slide') || 0)
  const referenceMode = params.get('ref') === '1'
  const showSB = params.get('sb') === '1' || !isPhone()
  const [booted, setBooted] = useState(QA)
  const [stack, setStack] = useState([]) // pushed screens: [{ name, params, key }]
  const [tab, setTab] = useState('home')
  const pending = useRef(null)

  useEffect(() => {
    if (QA) return
    const t = setTimeout(() => setBooted(true), 1400)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    // Desktop: scale the iPhone frame down so it always fits the window; phones stay full screen.
    const fit = () => {
      const f = isPhone() ? 1 : Math.min(1, (window.innerHeight - 32) / 868, (window.innerWidth - 32) / 414)
      document.documentElement.style.setProperty('--fit', String(f))
    }
    fit(); window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  useEffect(() => {
    const s = params.get('screen')
    if (s && SCREENS[s]) setStack([{ name: s, params: { id: params.get('id') }, key: 1 }])
  }, [])

  const push = (name, p = {}) => setStack((s) => [...s, { name, params: p, key: Date.now() + Math.random() }])
  const pop = () => setStack((s) => s.slice(0, -1))
  // Gate: the first time someone signs up to an event or taps Match, run the sign-up flow, then resume.
  const requireAuth = (fn) => {
    if (store.get().user.signedUp) return fn()
    pending.current = fn
    push('signup', { onDone: () => { setStack((s) => s.filter((x) => x.name !== 'signup')); const f = pending.current; pending.current = null; setTimeout(() => f?.(), 350) } })
  }
  const top = stack[stack.length - 1]
  const TabScreen = TABS[tab]

  const phoneCls = ['phone', showSB && 'sb'].filter(Boolean).join(' ')
  return (
    <AppCtx.Provider value={{ push, pop, requireAuth }}>
      <div className={'stage' + (QA ? ' qa' : '')}>
        <div className="frame">
          <div className={phoneCls}>
            <div className="bg-hero" />
            <div className="bg-grad" />
            <div className="bg-below" />
            {booted && <Home name={name} qa={QA} slide={slide} referenceMode={referenceMode} animate={!QA} onOpen={(scr) => push(scr)} />}
            <Header />
            {TabScreen ? <div className="screen tab"><TabScreen /></div> : null}
            <AnimatePresence>
              {stack.map((s, i) => {
                const S = SCREENS[s.name]
                return (
                  <motion.div key={s.key} className="screen" style={{ zIndex: 25 + i }} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.32, ease: [0.32, 0.72, 0, 1] }}>
                    <S params={s.params} onBack={pop} />
                  </motion.div>
                )
              })}
            </AnimatePresence>
            <BottomNav active={tab} onSelect={(k) => { setTab(k); if (k === 'home') setStack([]) }} />
            {!booted && (
              <div className="splash"><div className="spinner" /></div>
            )}
            {showSB && <StatusBar />}
            {showSB && <div className="home-indicator" />}
          </div>
        </div>
      </div>
    </AppCtx.Provider>
  )
}
