// Dummy data for Campus Perks. Expiry is minutes from page load so the countdowns always look live.
export const FOOD = [
  { id: 'f1', what: 'End-of-day pastries & sandwiches, free', where: 'Pret, Mile End station', by: 'Pret Mile End · student scheme', mins: 50, portions: 'First come, first served', color: '#7f1d1d', domain: 'pret.co.uk', society: 'Pret' },
  { id: 'f2', what: 'Leftover pizza (veg + margherita)', where: 'Bancroft Road 1.13', by: 'Tomasz, 2nd year', mins: 45, portions: 'About 12 slices', color: '#4c1d95', logo: '/logos/cs-society.png', society: 'CS Society' },
  { id: 'f3', what: 'Unsold bakes at closing, free with QMUL ID', where: 'Greggs, Bow Road', by: 'Greggs Bow · 18:00 daily', mins: 95, portions: 'Usually 10–20 items', color: '#1e40af', domain: 'greggs.co.uk', society: 'Greggs' },
  { id: 'f4', what: 'Samosas & chai, ISoc stall', where: 'Library Square', by: 'Fatima, 2nd year', mins: 80, portions: 'Plenty', color: '#15803d', logo: '/logos/islamic-society.png', society: 'Islamic Society' },
  { id: 'f5', what: 'Free sides with any student order after 21:00', where: "Nando's, Mile End Road", by: "Nando's Mile End", mins: 160, portions: 'While stocks last', color: '#111', domain: 'nandos.co.uk', society: 'Nandos' },
  { id: 'f6', what: 'Free fruit boxes', where: "Students' Union reception", by: 'SU Welfare', mins: 190, portions: '20 boxes', color: '#063486', logo: null, society: "Students' Union" },
]
// Deals: real chains (logo by domain) plus new local openings (initials fallback).
export const DEALS = [
  { id: 'd1', name: 'Chai & Chatter', domain: null, color: '#b45309', what: 'Opening week: 50% off all drinks', where: 'Mile End Road · 3 min walk', tag: 'New opening', until: 'until 28 Nov' },
  { id: 'd2', name: 'Bāo Bun Bar', domain: null, color: '#be123c', what: 'Free side with any main', where: 'Stepney Green · 8 min walk', tag: 'New opening', until: 'until 5 Dec' },
  { id: 'd3', name: "Nando's Mile End", domain: 'nandos.co.uk', color: '#111', what: '20% off with TOTUM', where: 'Mile End Road · 4 min walk', tag: 'Student deal', until: 'ongoing' },
  { id: 'd4', name: 'Greggs Bow', domain: 'greggs.co.uk', color: '#1e40af', what: '15% off with a QMUL ID', where: 'Bow Road · 10 min walk', tag: 'Student deal', until: 'ongoing' },
  { id: 'd5', name: 'Pret Mile End', domain: 'pret.co.uk', color: '#7f1d1d', what: 'Filter coffee 99p before 10 am', where: 'Mile End station · 5 min walk', tag: 'Student deal', until: 'weekdays' },
  { id: 'd6', name: 'Wasabi Stratford', domain: 'wasabi.uk.com', color: '#166534', what: '10% off with a student card', where: 'Westfield Stratford · 12 min bus', tag: 'Student deal', until: 'ongoing' },
  { id: 'd7', name: 'Franco Manca Bethnal Green', domain: 'francomanca.co.uk', color: '#1f2937', what: 'Two sourdough pizzas for £15, Mon–Wed', where: 'Bethnal Green · 15 min walk', tag: 'Cheap eats', until: 'Mon–Wed' },
  { id: 'd8', name: 'Mile End Market', domain: null, color: '#0369a1', what: '£3 lunch boxes after 2 pm', where: 'Grove Road · 6 min walk', tag: 'Cheap eats', until: 'weekdays' },
]
export const PERIOD = [
  { id: 'p1', where: 'Library — ground floor toilets', status: 'ok' },
  { id: 'p2', where: 'Bancroft Building — 1st floor', status: 'ok' },
  { id: 'p3', where: "Students' Union Hub", status: 'low' },
  { id: 'p4', where: "Queens' Building — ground floor", status: 'out', note: 'Reported 2 h ago · restock requested' },
  { id: 'p5', where: 'Qmotion — changing rooms', status: 'ok' },
  { id: 'p6', where: 'Graduate Centre — 2nd floor', status: 'ok' },
]
