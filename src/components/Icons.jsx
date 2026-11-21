// Thin white outline icons in the campusM style (48-unit grid, 2.2 stroke, round joins).
import { img } from '../img.js'
import React from 'react'

const S = ({ children, vb = '0 0 48 48', sw = 2.2, ...rest }) => (
  <svg viewBox={vb} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {children}
  </svg>
)

export const TileIcons = {
  bubble: () => (
    <S vb="0 0 40 47" sw={1.15}>
      <path d="M20 1.2a18.8 18.8 0 0 1 0 37.6c-3.1 0-6-.8-8.6-2.1-2.4 2.7-5.2 4.9-8.7 5.8 2.3-2.2 3.4-5.3 3.4-8.4A18.8 18.8 0 0 1 20 1.2z" />
    </S>
  ),
  clock: () => (
    <S><circle cx="24" cy="24" r="20" /><path d="M24 11v13l8 6" /></S>
  ),
  person: () => (
    <S><circle cx="24" cy="15" r="8.5" /><path d="M7.5 43v-5.5c0-7 7.4-12 16.5-12s16.5 5 16.5 12V43z" /></S>
  ),
  plus: () => (
    <S><path d="M19 9a5 5 0 0 1 10 0v10h10a5 5 0 0 1 0 10H29v10a5 5 0 0 1-10 0V29H9a5 5 0 0 1 0-10h10z" /></S>
  ),
  pin: () => (
    <S><path d="M24 45S9 29 9 18.5a15 15 0 0 1 30 0C39 29 24 45 24 45z" /><circle cx="24" cy="18.5" r="5.5" /></S>
  ),
  union: () => <img src={img('/img/union-lion.png')} alt="" />,
  mail: () => (
    <S vb="0 0 48 36"><rect x="2" y="2" width="44" height="32" /><path d="M2 3l22 17L46 3" /></S>
  ),
  book: () => (
    <S vb="0 0 48 38"><path d="M24 7c-5-4.2-11.5-4.5-21-3v29c9.5-1.5 16-1.2 21 3 5-4.2 11.5-4.5 21-3V4c-9.5-1.5-16-1.2-21 3z" /><path d="M24 7v29" /></S>
  ),
  calstar: () => (
    <S><rect x="4" y="9" width="40" height="34" /><rect x="12" y="4" width="3.5" height="9" rx="1.75" /><rect x="22.25" y="4" width="3.5" height="9" rx="1.75" /><rect x="32.5" y="4" width="3.5" height="9" rx="1.75" /><path d="M24 17.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5-4.8-4.6 6.6-.9z" /></S>
  ),
  caldots: () => (
    <S><rect x="4" y="9" width="40" height="34" /><rect x="12" y="4" width="3.5" height="9" rx="1.75" /><rect x="22.25" y="4" width="3.5" height="9" rx="1.75" /><rect x="32.5" y="4" width="3.5" height="9" rx="1.75" /><g fill="currentColor" stroke="none"><circle cx="15" cy="23" r="2.1" /><circle cx="24" cy="23" r="2.1" /><circle cx="33" cy="23" r="2.1" /><circle cx="15" cy="32.5" r="2.1" /><circle cx="24" cy="32.5" r="2.1" /><circle cx="33" cy="32.5" r="2.1" /></g></S>
  ),
  xsquare: () => (
    <S sw={3}><rect x="7" y="7" width="34" height="34" rx="4" /><path d="M17 17l14 14M31 17L17 31" strokeWidth="3.6" /></S>
  ),
  monitor: () => (
    <S><rect x="3" y="6" width="42" height="29" /><path d="M24 35v8M14 43h20" /></S>
  ),
  printer: () => (
    <S><path d="M12 17V6h24v11" /><rect x="4" y="17" width="40" height="18" rx="2.5" /><path d="M12 29h24v14H12z" fill="var(--navy)" /><path d="M18 35h12M18 39h12" /></S>
  ),
  gear: () => (
    <S vb="0 0 512 512" sw={30}><path d="M262.29 192.31a64 64 0 1 0 57.4 57.4 64.13 64.13 0 0 0-57.4-57.4M416.39 256a154 154 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.5 164.5 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22 155 155 0 0 1-21.46-12.57 16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.5 164.5 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22 155 155 0 0 1 21.46 12.57 16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47" /></S>
  ),
  bike: () => (
    <S vb="0 0 52 36"><circle cx="11" cy="25" r="9" /><circle cx="41" cy="25" r="9" /><path d="M11 25l9-15h11l10 15M20 10l7 15H11M31 10l-3-6h-4M31 4h4" /></S>
  ),
  info: () => (
    <S><circle cx="24" cy="24" r="20" /><path d="M20.5 21.5H25v12M20.5 33.5h8" strokeWidth="2.6" /><circle cx="24.5" cy="14.5" r="2.2" fill="currentColor" stroke="none" /></S>
  ),
  globe: () => (
    <S><circle cx="24" cy="24" r="20" /><path d="M14 7c2 3 7 4 6 8s-6 3-7 7 4 5 4 9-3 6-1 10M33 6c-1 3-6 5-5 9s7 2 8 6-2 4-1 7 4 2 5 5" /></S>
  ),
  guide: () => (
    <S><circle cx="24" cy="24" r="20" /><path d="M34 14L13 23l9 3 3 9z" /><path d="M22 26l12-12" /></S>
  ),
  door: () => (
    <S><path d="M20 5h21v38H20" /><path d="M20 5l-8 3v34l8 2" /><path d="M4 24h12M12 19.5l5 4.5-5 4.5" /></S>
  ),
  warn: () => (
    <S><path d="M24 5l21 37H3z" /><path d="M24 18v12" strokeWidth="2.8" /><circle cx="24" cy="36" r="1.9" fill="currentColor" stroke="none" /></S>
  ),
  linkedin: () => (
    <S><rect x="4" y="4" width="40" height="40" rx="5" fill="#fff" stroke="none" /><text x="9" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="27" fill="var(--navy)" stroke="none">in</text></S>
  ),
  careers: () => (
    <S><path d="M24 43V8M17 15l7-7 7 7" /><path d="M24 22c-5 0-9 3-12 7M12 24l-1 6 6 1" /><path d="M24 22c5 0 9 3 12 7M36 24l1 6-6 1" /></S>
  ),
  alumni: () => (
    <S><circle cx="15" cy="30" r="9" /><circle cx="15" cy="27.5" r="2.6" /><path d="M9.5 36c1-3 3-4.5 5.5-4.5s4.5 1.5 5.5 4.5" /><circle cx="37" cy="12" r="5.5" /><circle cx="37" cy="37" r="5.5" /><path d="M21.5 24l11-8M23 34h8.5" /></S>
  ),
  clipboard: () => (
    <S><rect x="8" y="8" width="32" height="37" rx="2" /><rect x="18" y="4" width="12" height="7" rx="2" fill="var(--navy)" /><path d="M14 20h4v4h-4zM22 22h11M14 29h4v4h-4zM22 31h11M14 38h4v4h-4zM22 40h11" /></S>
  ),
  docpen: () => (
    <S><path d="M9 4h20l9 9v31H9z" /><path d="M29 4v9h9M15 20h16M15 27h16M15 34h8" /><path d="M31 43l9-9 3 3-9 9h-3z" fill="var(--navy)" /></S>
  ),
  // ---- Ctrl + Connect tiles (same vocabulary) ----
  socials: () => (
    <S><circle cx="17" cy="15" r="7" /><circle cx="33" cy="17" r="5.5" /><path d="M4 42v-4c0-6.5 5.8-11 13-11s13 4.5 13 11v4z" /><path d="M31 27c7 0 13 4 13 10v3h-8" /></S>
  ),
  opps: () => (
    <S><path d="M24 5l5.6 11.6 12.7 1.8-9.2 9 2.2 12.7L24 34l-11.3 6.1 2.2-12.7-9.2-9 12.7-1.8z" /></S>
  ),
  tag: () => (
    <S><path d="M6 6h17l19 19-17 17L6 23z" /><circle cx="14.5" cy="14.5" r="3" /></S>
  ),
}

// Bottom nav — Ionicons (MIT), the set the real app uses.
const I = ({ children, filled, sw = 36 }) => (
  <svg viewBox="0 0 512 512" fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
)
export const NavIcons = {
  home: () => (
    <I filled>
      <path d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79Z" />
      <path d="m490.91 244.15-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97" />
    </I>
  ),
  settings: () => (
    <I><path d="M262.29 192.31a64 64 0 1 0 57.4 57.4 64.13 64.13 0 0 0-57.4-57.4M416.39 256a154 154 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.5 164.5 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22 155 155 0 0 1-21.46-12.57 16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.5 164.5 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22 155 155 0 0 1 21.46 12.57 16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47" /></I>
  ),
  calendar: () => (
    <I><rect width="416" height="384" x="48" y="80" rx="48" /><path d="M128 48v32M384 48v32M464 160H48" /></I>
  ),
  alerts: () => (
    <I><path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57M320 384v16a64 64 0 0 1-128 0v-16" /></I>
  ),
  search: () => (
    <I><path d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z" /><path d="M338.29 338.29 448 448" /></I>
  ),
}

// header glyphs
export const RefreshIcon = () => (
  <svg viewBox="0 0 24 17" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 4.5A9.5 9.5 0 0 0 4.2 4.8" /><path d="M3 1v4.5h4.5" />
    <path d="M3 12.5a9.5 9.5 0 0 0 16.8-.3" /><path d="M21 16v-4.5h-4.5" />
  </svg>
)
export const KebabIcon = () => (
  <svg viewBox="0 0 3.6 13" fill="#000"><circle cx="1.8" cy="1.8" r="1.8" /><circle cx="1.8" cy="6.5" r="1.8" /><circle cx="1.8" cy="11.2" r="1.8" /></svg>
)
export const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#154091" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4l-8 8 8 8" /></svg>
)
export const WarnTriangle = () => (
  <svg viewBox="0 0 73 77" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round">
    <path d="M36.5 3.5L70.5 73.5H2.5z" /><path d="M36.5 29v21" strokeWidth="6.5" /><circle cx="36.5" cy="61" r="3.6" fill="#fff" stroke="none" />
  </svg>
)
export const PauseIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11" fill="#fff"><rect x="1" y="1" width="3.5" height="10" /><rect x="7.5" y="1" width="3.5" height="10" /></svg>
)
export const PlayIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11" fill="#fff"><path d="M2 1l9 5-9 5z" /></svg>
)
