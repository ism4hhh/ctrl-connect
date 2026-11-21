// Tiny localStorage-backed store. No backend — everything lives on the judge's phone.
import { useSyncExternalStore } from 'react'

const KEY = 'plusone.v1'
const DEFAULT = {
  user: { signedUp: false, name: 'Aisha', external: false, uni: 'Queen Mary University of London', email: 'aisha.demo@qmul.ac.uk', course: 'Biochemistry', year: 1, hidden: false },
  going: {},        // eventId -> true
  matches: { socials: {}, opportunities: {} }, // matches[section][itemId][attendeeId] -> 'pending' | 'matched'
  blocked: {},      // attendeeId -> true
  reported: {},     // attendeeId -> true
  claimed: {},      // foodId -> true
  stockReports: {}, // locationId -> timestamp
  buddies: {},      // oppId -> true (asked for a buddy)
}

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT
    const parsed = JSON.parse(raw)
    const m = parsed.matches && parsed.matches.socials && parsed.matches.opportunities ? parsed.matches : { socials: {}, opportunities: {} } // drop the old flat format
    return { ...DEFAULT, ...parsed, matches: m, user: { ...DEFAULT.user, ...(parsed.user || {}) } }
  } catch {
    return DEFAULT
  }
}

let state = read()
const listeners = new Set()
function write(next) {
  state = next
  try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* private mode etc. */ }
  listeners.forEach((l) => l())
}

export const store = {
  get: () => state,
  set: (patch) => write({ ...state, ...(typeof patch === 'function' ? patch(state) : patch) }),
  setUser: (patch) => write({ ...state, user: { ...state.user, ...patch } }),
  toggleKey: (bucket, id, value) => write({ ...state, [bucket]: { ...state[bucket], [id]: value === undefined ? !state[bucket][id] : value } }),
  // Matches are scoped: a match on one event or opportunity never shows anywhere else.
  getMatch: (section, itemId, attendeeId) => state.matches?.[section]?.[itemId]?.[attendeeId] || null,
  setMatch: (section, itemId, attendeeId, value) => {
    const sec = { ...(state.matches[section] || {}) }
    sec[itemId] = { ...(sec[itemId] || {}), [attendeeId]: value }
    write({ ...state, matches: { ...state.matches, [section]: sec } })
  },
  reset: () => { try { localStorage.removeItem(KEY) } catch {} write(DEFAULT) },
}

export function useStore() {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l) }, () => state, () => state)
}
