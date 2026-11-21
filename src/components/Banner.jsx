import { img } from '../img.js'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WarnTriangle, PauseIcon, PlayIcon } from './Icons.jsx'

const SLIDES = [
  { key: 'talkcampus', render: () => <img src={img('/img/banner-talkcampus.jpg')} alt="TalkCampus — your 24/7 shoulder to lean on" /> },
  {
    key: 'alert',
    render: () => (
      <div className="slide alert">
        <h3>Security alert:</h3>
        <p>Scammers pretending<br />to be IT Services support</p>
        <div className="warn"><WarnTriangle /></div>
      </div>
    ),
  },
  {
    key: 'promo',
    render: (onPress) => (
      <button className="slide promo" style={{ textAlign: 'left', width: '100%' }} onClick={() => onPress?.('socials')}>
        <h3>New: Socials, Opportunities, Campus Perks</h3>
        <p>Find your people, never miss a deadline,<br />and eat well on a budget. Tap to explore.</p>
      </button>
    ),
  },
]

export function Banner({ initial = 0, autoplay = true, onPress }) {
  const [i, setI] = useState(initial)
  const [playing, setPlaying] = useState(autoplay)
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [playing])
  return (
    <div className="banner">
      <AnimatePresence initial={false}>
        <motion.div key={SLIDES[i].key} className="slide" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
          {SLIDES[i].render(onPress)}
        </motion.div>
      </AnimatePresence>
      <div className="dots">{SLIDES.map((s, k) => <i key={s.key} className={k === i ? 'on' : ''} />)}</div>
      <button className="pause" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
        {playing || !autoplay ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  )
}
