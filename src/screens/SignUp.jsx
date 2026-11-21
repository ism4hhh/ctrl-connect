import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Screen } from '../components/ui.jsx'
import { LONDON_UNIS } from '../data/socials.js'
import { store, useStore } from '../store.js'

const COURSES = ['Biochemistry', 'Biomedical Sciences', 'Computer Science', 'Law', 'Medicine', 'Economics', 'Psychology', 'Mechanical Engineering', 'English', 'Politics', 'Mathematics', 'Physics', 'Dentistry', 'Management', 'Other']

export function SignUpScreen({ onBack, params }) {
  const { user } = useStore()
  const [step, setStep] = useState(0)
  const [external, setExternal] = useState(false)
  const [uni, setUni] = useState(LONDON_UNIS[0])
  const [form, setForm] = useState({ name: user.name || 'Aisha', email: user.email || 'aisha.demo@qmul.ac.uk', course: user.course || 'Biochemistry', year: user.year || 1 })
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const inp = useRef(null)
  useEffect(() => { if (step === 2) setTimeout(() => inp.current?.focus(), 350) }, [step])

  const emailOk = /^[^\s@]+@[^\s@]+\.ac\.uk$/i.test(form.email.trim())
  const next = () => {
    if (step === 1) {
      if (!form.name.trim()) return setErr('Add your first name.')
      if (!emailOk) return setErr('Use your university email — it has to end in .ac.uk.')
      setErr(''); setStep(2); return
    }
    setStep(step + 1)
  }
  const finish = () => {
    if (code.length !== 6) return
    store.setUser({ signedUp: true, external, uni: external ? uni : 'Queen Mary University of London', name: form.name.trim(), email: form.email.trim(), course: form.course, year: form.year })
    params?.onDone?.()
  }
  const dir = 1
  return (
    <Screen title="Join Ctrl + Connect" onBack={step === 0 ? onBack : () => setStep(step - 1)}>
      <div className="steps"><i className={step >= 0 ? 'on' : ''} /><i className={step >= 1 ? 'on' : ''} /><i className={step >= 2 ? 'on' : ''} /></div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={{ x: 40 * dir, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40 * dir, opacity: 0 }} transition={{ duration: 0.22 }} className="form">
          {step === 0 && (
            <>
              <h1>Who are you?</h1>
              <p className="lead">Ctrl + Connect is for verified students only. Pick where you study.</p>
              <button className={'choice' + (!external ? ' on' : '')} onClick={() => setExternal(false)}>
                <b>Queen Mary student</b><span>Sign up with your @qmul.ac.uk email</span>
              </button>
              <button className={'choice' + (external ? ' on' : '')} onClick={() => setExternal(true)}>
                <b>Student from another uni</b><span>You'll see events tagged “Open to all unis”</span>
              </button>
              {external ? (
                <>
                  <label className="label">Your university</label>
                  <select className="input" value={uni} onChange={(e) => setUni(e.target.value)}>{LONDON_UNIS.map((u) => <option key={u}>{u}</option>)}</select>
                </>
              ) : null}
              <button className="btn" onClick={next}>Continue</button>
            </>
          )}
          {step === 1 && (
            <>
              <h1>About you</h1>
              <p className="lead">Only your first name, course and year are ever shown to other students.</p>
              <label className="label">First name</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <label className="label">University email</label>
              <input className="input" inputMode="email" autoCapitalize="none" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@qmul.ac.uk" />
              <label className="label">Course</label>
              <select className="input" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>{COURSES.map((c) => <option key={c}>{c}</option>)}</select>
              <label className="label">Year</label>
              <div className="seg">
                {[[1, '1st'], [2, '2nd'], [3, '3rd'], ['pg', 'Postgrad']].map(([k, l]) => <button key={k} className={form.year === k ? 'on' : ''} onClick={() => setForm({ ...form, year: k })}>{l}</button>)}
              </div>
              {err ? <div className="err">{err}</div> : null}
              <button className="btn" onClick={next}>Send me a code</button>
            </>
          )}
          {step === 2 && (
            <>
              <h1>Check your inbox</h1>
              <p className="lead">We sent a 6-digit code to <b>{form.email}</b>. It expires in 10 minutes.</p>
              <button className="code-box" onClick={() => inp.current?.focus()}>
                {Array.from({ length: 6 }, (_, i) => <div key={i} className={i === code.length ? 'on' : ''}>{code[i] || ''}</div>)}
              </button>
              <input ref={inp} className="ghost" inputMode="numeric" pattern="[0-9]*" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} />
              <button className="link" onClick={() => setCode('482913')}>Prototype: fill a demo code</button>
              <button className={'btn' + (code.length === 6 ? '' : ' disabled')} onClick={finish}>Verify and continue</button>
              <p className="fine">No account is created in this prototype. Nothing is sent anywhere.</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </Screen>
  )
}
