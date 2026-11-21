// Dummy opportunities — real organisations for realism; none of these are live listings.
// Logos are fetched by domain at build time (scripts/fetch_logos.sh) from Google's favicon service.
export const TODAY = new Date('2026-11-21T09:00:00')
export const YEARS = [{ key: 1, label: '1st year' }, { key: 2, label: '2nd year' }, { key: 3, label: '3rd year' }, { key: 'pg', label: 'Postgrad' }]
export const CATEGORIES = [
  { key: 'funding', label: 'Scholarships & funding' },
  { key: 'consultancy', label: 'Student consultancy projects' },
  { key: 'competitions', label: 'Competitions' },
  { key: 'insight', label: 'Insight days' },
  { key: 'springweeks', label: 'Spring weeks' },
]
export const ELIG = { firstgen: 'First gen', women: 'Women in STEM', lowincome: 'Low income', international: 'International', all: 'Open to all' }

export const OPPS = [
  { id: 'o1', title: 'Access to Opportunities Fund top-up', org: 'QMUL Advice & Counselling', domain: 'qmul.ac.uk', color: '#063486', cat: 'funding', years: [1, 2, 3], deadline: '2026-12-05', elig: ['lowincome', 'firstgen'], applying: 5, blurb: 'Up to £500 towards placements, travel and interview costs. One form, no essay.', buddies: ['a1', 'a11', 'a6'] },
  { id: 'o2', title: 'Undergraduate of the Year: Women in STEM', org: 'TARGETjobs', domain: 'targetjobs.co.uk', color: '#1e3a8a', cat: 'competitions', years: [2, 3], deadline: '2027-01-31', elig: ['women'], applying: 3, blurb: 'National award with a paid summer placement at a partner firm for the winner.', buddies: ['a5', 'a7'] },
  { id: 'o3', title: '180 Degrees Consulting: winter cohort', org: '180 Degrees Consulting', domain: '180dc.org', color: '#0f766e', cat: 'consultancy', years: [2, 3, 'pg'], deadline: '2026-12-01', elig: ['all'], applying: 2, blurb: 'A 10-week pro-bono project for a London charity, in teams of five.', buddies: ['a4', 'a8'] },
  { id: 'o4', title: 'Bank of England spring week', org: 'Bank of England', domain: 'bankofengland.co.uk', color: '#7f1d1d', cat: 'springweeks', years: [1, 2], deadline: '2026-12-12', elig: ['firstgen', 'lowincome'], applying: 4, blurb: 'Five days in Threadneedle Street. Travel and lunch covered.', buddies: ['a3', 'a12', 'a11'] },
  { id: 'o5', title: 'Insight day: careers in life sciences', org: 'GSK', domain: 'gsk.com', color: '#ea580c', cat: 'insight', years: [1, 2], deadline: '2026-11-30', elig: ['women', 'firstgen'], applying: 6, blurb: 'A day at Stevenage R&D with lab tours and a CV clinic. Great for Biochemistry.', buddies: ['a1', 'a5', 'a9'] },
  { id: 'o6', title: 'Santander Universities scholarship', org: 'Santander Universities', domain: 'santander.co.uk', color: '#b91c1c', cat: 'funding', years: [1, 2, 3], deadline: '2027-01-20', elig: ['lowincome', 'firstgen', 'international'], applying: 4, blurb: '£1,500 awards for students with a household income under £30k. Short form plus a 200-word statement.', buddies: ['a11', 'a13', 'a6'] },
  { id: 'o7', title: "Master's funding clinic: Chevening & Commonwealth", org: 'Chevening', domain: 'chevening.org', color: '#1e40af', cat: 'funding', years: ['pg'], deadline: '2026-12-10', elig: ['international'], applying: 1, blurb: 'One-to-one help with scholarship applications for international postgrads.', buddies: ['a10'] },
  { id: 'o8', title: 'Spring week: technology', org: 'Deloitte', domain: 'deloitte.com', color: '#065f46', cat: 'springweeks', years: [1], deadline: '2026-12-20', elig: ['firstgen'], applying: 7, blurb: 'First-years only. Shadow a consulting team for a week in Easter break.', buddies: ['a3', 'a6', 'a9', 'a11'] },
  { id: 'o9', title: 'Student consultancy: Barts Health NHS project', org: 'QM Enterprise', domain: 'qmul.ac.uk', color: '#063486', cat: 'consultancy', years: [3, 'pg'], deadline: '2026-12-08', elig: ['all'], applying: 2, blurb: 'Help a hospital team cut patient waiting-room time. Credit-bearing option.', buddies: ['a4', 'a8'] },
  { id: 'o10', title: 'Biology essay prize 2027', org: 'Royal Society of Biology', domain: 'rsb.org.uk', color: '#166534', cat: 'competitions', years: [1, 2, 3], deadline: '2027-02-15', elig: ['all'], applying: 3, blurb: '1,500 words on a topic of your choice. £500 prize and publication.', buddies: ['a1', 'a5'] },
  { id: 'o11', title: 'Insight day: women in finance', org: 'Goldman Sachs', domain: 'goldmansachs.com', color: '#1e3a8a', cat: 'insight', years: [1, 2], deadline: '2026-12-03', elig: ['women'], applying: 4, blurb: 'Half-day at Plumtree Court with networking over lunch.', buddies: ['a3', 'a7', 'a13'] },
  { id: 'o12', title: 'PhD studentships (Barts & The London)', org: 'Wellcome Trust', domain: 'wellcome.org', color: '#111827', cat: 'funding', years: [3, 'pg'], deadline: '2027-01-08', elig: ['international', 'lowincome'], applying: 2, blurb: 'Fully funded 4-year programme with a £21k stipend.', buddies: ['a5', 'a8'] },
  { id: 'o13', title: 'Insight day: policy careers in Whitehall', org: 'Civil Service Fast Stream', domain: 'civil-service-careers.gov.uk', color: '#1f2937', cat: 'insight', years: [3, 'pg'], deadline: '2026-12-15', elig: ['firstgen', 'lowincome', 'all'], applying: 3, blurb: 'Meet Fast Streamers from Treasury and DHSC, with a mock assessment exercise.', buddies: ['a4', 'a8', 'a12'] },
  { id: 'o14', title: 'Spring week: investment banking', org: 'UBS', domain: 'ubs.com', color: '#991b1b', cat: 'springweeks', years: [1, 2], deadline: '2026-12-18', elig: ['women', 'firstgen'], applying: 5, blurb: 'A week in Broadgate with a guaranteed summer-internship interview at the end.', buddies: ['a3', 'a11', 'a13', 'a6'] },
  { id: 'o15', title: 'Postgraduate research consultancy: East London Business Alliance', org: 'QM Enterprise', domain: 'qmul.ac.uk', color: '#063486', cat: 'consultancy', years: ['pg'], deadline: '2027-01-12', elig: ['all'], applying: 2, blurb: 'Paid 6-week consultancy for Tower Hamlets social enterprises. Postgrads only.', buddies: ['a4', 'a10'] },
  { id: 'o16', title: 'Research poster competition', org: 'QMUL Doctoral College', domain: 'qmul.ac.uk', color: '#063486', cat: 'competitions', years: ['pg'], deadline: '2027-02-01', elig: ['all'], applying: 1, blurb: 'Present your research in one poster. £300 prize and a slot at the annual showcase.', buddies: ['a10', 'a8'] },
]

export function daysLeft(iso) {
  return Math.ceil((new Date(iso + 'T23:59:00') - TODAY) / 86400000)
}
export function fmtDeadline(iso) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}
export const domainLogo = (domain) => (domain ? `/logos/domains/${domain}.png` : null)
