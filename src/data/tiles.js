// Home grid, in the exact order of the real app (see DESIGN.md §5), with the three Ctrl + Connect tiles
// inserted straight after the first block (AskQM + Timetable + MySiS).
export const HOME_TILES = [
  { label: 'AskQM', icon: 'bubble', big: true },
  { label: 'Timetable', icon: 'clock' },
  { label: 'MySiS', icon: 'person' },
  // ---- Ctrl + Connect (new) ----
  { label: 'Socials', icon: 'socials', isNew: true, screen: 'socials' },
  { label: 'Opportunities', tight: true, icon: 'opps', isNew: true, screen: 'opportunities' },
  { label: 'Campus Perks', icon: 'tag', isNew: true, screen: 'perks' },
  // ------------------------
  { label: 'QMplus', icon: 'plus' },
  { label: 'Campus map', icon: 'pin' },
  { label: 'Your Union', icon: 'union' },
  { label: 'Email', icon: 'mail' },
  { label: 'Library', icon: 'book' },
  { label: 'Events', icon: 'calstar' },
  { label: 'Exam timetable', icon: 'caldots' },
  { label: 'Missed teaching reporting', icon: 'xsquare' },
  { label: 'Desk availability', icon: 'monitor' },
  { label: 'Print credit', icon: 'printer' },
  { label: 'IT status', icon: 'gear' },
  { label: 'Transport', icon: 'bike' },
  { banner: true },
  { label: 'MyQMUL', icon: 'info' },
  { label: 'Queen Mary Network', icon: 'globe' },
  { label: 'Your guide', icon: 'guide' },
  { label: 'Room availability', icon: 'door' },
  { label: 'Report a problem', icon: 'warn' },
  { label: 'LinkedIn Learning', icon: 'linkedin' },
  { label: 'Careers and Enterprise', icon: 'careers' },
  { label: 'Alumni services', icon: 'alumni' },
  { label: 'Module Evaluation', icon: 'clipboard', badge: 2 },
  { label: 'Exam timetable', icon: 'caldots', hl: true },
  { label: 'Record my attendance', icon: 'docpen' },
]

// Same list without the Ctrl + Connect tiles — used for the pixel-QA comparison against the real app.
export const REFERENCE_TILES = HOME_TILES.filter((t) => !t.isNew)
