import { img } from '../img.js'
import React from 'react'
import { motion } from 'framer-motion'
import { TileIcons } from './Icons.jsx'
import iconMeta from '../data/iconMeta.json'

// A home-grid tile. Existing tiles use the icon masks lifted from the real app (pixel-exact size and
// position, see scripts/extract_icons.py); new Ctrl + Connect tiles use inline SVG drawn in the same style.
export function Tile({ t, onPress, animate, index }) {
  const Icon = TileIcons[t.icon]
  const meta = iconMeta[t.icon]
  const cls = ['tile', t.big && 'big', t.hl && 'hl'].filter(Boolean).join(' ')
  const delay = animate ? ((index * 7919) % 23) / 23 * 0.9 : 0
  return (
    <motion.button
      className={cls}
      data-label={t.label}
      onClick={() => onPress?.(t)}
      whileTap={{ opacity: 0.82 }}
      initial={animate ? { opacity: 0, scaleX: 0.35, scaleY: 0.12 } : false}
      animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.22, delay, ease: 'easeOut' }}
    >
      <span className={'lbl' + (t.tight ? ' tight' : '')}>{t.label}</span>
      {meta ? (
        <img className="ic" src={img(`/img/icons/${t.icon}.png`)} alt="" style={{ width: meta.w, height: meta.h, left: meta.left, bottom: meta.bottom }} />
      ) : (
        <span className="ic">{Icon ? <Icon /> : null}</span>
      )}
      {t.badge ? <span className="badge">{t.badge}</span> : null}
      {t.isNew ? <span className="new">NEW</span> : null}
    </motion.button>
  )
}
