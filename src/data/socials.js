// Dummy data — every person here is fictional. Phone numbers use the Ofcom reserved 07700 900xxx range.
// Society logos are the societies' own Instagram profile pictures (public/logos/*.png); events are invented.
export const LONDON_UNIS = ['UCL', "King's College London", 'LSE', 'Imperial College London', "City St George's", 'Goldsmiths', 'SOAS', 'Birkbeck', 'University of Westminster', 'University of Greenwich', 'Brunel University', 'Royal Holloway', 'London Metropolitan', 'University of the Arts London', 'University of East London', 'Kingston University']

export const ATTENDEES = [
  { id: 'a1', name: 'Maya', course: 'Biochemistry', year: 1, solo: true, linkedin: 'in/maya-okafor', phone: '07700 900123', color: '#7c3aed' },
  { id: 'a2', name: 'Tomasz', course: 'Computer Science', year: 2, solo: false, linkedin: 'in/tomasz-k', phone: '07700 900234', color: '#0ea5e9' },
  { id: 'a3', name: 'Priya', course: 'Law', year: 1, solo: true, linkedin: 'in/priya-s', phone: '07700 900345', color: '#db2777' },
  { id: 'a4', name: 'Daniel', course: 'Economics', year: 3, solo: false, linkedin: 'in/daniel-m', phone: '07700 900456', color: '#059669' },
  { id: 'a5', name: 'Fatima', course: 'Medicine', year: 2, solo: true, linkedin: 'in/fatima-a', phone: '07700 900567', color: '#d97706' },
  { id: 'a6', name: 'Leo', course: 'Physics', year: 1, solo: false, linkedin: 'in/leo-chen', phone: '07700 900678', color: '#2563eb' },
  { id: 'a7', name: 'Sofia', course: 'Psychology', year: 2, solo: true, external: 'UCL', linkedin: 'in/sofia-r', phone: '07700 900789', color: '#9333ea' },
  { id: 'a8', name: 'Jamal', course: 'Mechanical Engineering', year: 3, solo: true, linkedin: 'in/jamal-w', phone: '07700 900890', color: '#0f766e' },
  { id: 'a9', name: 'Hana', course: 'English', year: 1, solo: false, linkedin: 'in/hana-y', phone: '07700 900901', color: '#be123c' },
  { id: 'a10', name: 'Arjun', course: 'Dentistry', year: 2, solo: false, external: "King's College London", linkedin: 'in/arjun-p', phone: '07700 900112', color: '#4f46e5' },
  { id: 'a11', name: 'Chloe', course: 'Politics', year: 1, solo: true, linkedin: 'in/chloe-b', phone: '07700 900223', color: '#ea580c' },
  { id: 'a12', name: 'Yusuf', course: 'Mathematics', year: 2, solo: true, linkedin: 'in/yusuf-h', phone: '07700 900334', color: '#1d4ed8' },
  { id: 'a14', name: 'Sana', course: 'Pharmacology', year: 1, solo: true, linkedin: 'in/sana-m', phone: '07700 900556', color: '#0e7490' },
  { id: 'a13', name: 'Nadia', course: 'Management', year: 1, solo: true, external: 'LSE', linkedin: 'in/nadia-e', phone: '07700 900445', color: '#b45309' },
]

// Tags: daytime, alcoholfree, openall. `logo` = file in public/logos; missing logo → initials.
export const EVENTS = [
  { id: 'e1', society: 'Queen Mary Padel Club', handle: '@qmpadel', logo: 'padel-club', color: '#6d28d9', title: "Beginners' padel social", when: 'Thu 26 Nov · 18:00–20:00', where: 'Stratford Padel Club', walk: '25 min walk · 12 min bus', campus: false, price: '£6', tags: ['alcoholfree', 'openall'], going: 24, solo: 7, attendees: ['a14', 'a1', 'a3', 'a7', 'a8', 'a2', 'a6', 'a13'], meet: 'Meet at Mile End station, Burdett Road exit, 17:25 — walk over together.', blurb: 'No experience needed — rackets provided. We mix pairs so nobody is stuck with a stranger for the whole hour.' },
  { id: 'e2', society: 'Biochemistry Society', handle: '@qmbiochemsoc', logo: null, color: '#0f766e', title: 'Coffee & cake welcome mixer', when: 'Mon 24 Nov · 13:00–14:30', where: 'Ground Café, Mile End', walk: '3 min walk', campus: true, price: 'FREE', tags: ['daytime', 'alcoholfree'], going: 31, solo: 9, attendees: ['a1', 'a5', 'a6', 'a9', 'a12', 'a11'], meet: 'Meet by the Ground Café counter at 12:55 — look for the BiochemSoc tote bag.', blurb: 'Between lectures, cake on us. Meet people on your course and find a lab partner before week 10.' },
  { id: 'e3', society: "Women's Football Club", handle: '@qmwfc', logo: 'womens-football', color: '#1d4ed8', title: '5-a-side pickup game', when: 'Wed 26 Nov · 17:30–19:00', where: 'Mile End sports pitches', walk: '6 min walk', campus: true, price: 'FREE', tags: ['alcoholfree'], going: 18, solo: 5, attendees: ['a1', 'a3', 'a5', 'a11', 'a9'], meet: 'Meet at the pitch gate on Bancroft Road at 17:20.', blurb: 'Turn up and play. Teams picked on the night, all levels, boots optional. Beginners especially welcome.' },
  { id: 'e4', society: 'Islamic Society', handle: '@qmifsoc', logo: 'islamic-society', color: '#15803d', title: "Sisters' games night", when: 'Fri 28 Nov · 18:30–21:00', where: 'Bancroft Building 1.13', walk: '4 min walk', campus: true, price: 'FREE', tags: ['alcoholfree'], going: 22, solo: 6, attendees: ['a3', 'a5', 'a11', 'a9', 'a1'], meet: 'Meet at the Bancroft Building entrance at 18:20.', blurb: 'Board games, snacks and quiz rounds. Sisters only, all years welcome.' },
  { id: 'e5', society: 'Pottery Society', handle: '@qmpotterysociety', logo: 'pottery-society', color: '#b45309', title: 'Daytime clay drop-in', when: 'Tue 25 Nov · 12:00–15:00', where: "Students' Union Hub, Art Room", walk: '2 min walk', campus: true, price: 'FREE', tags: ['daytime', 'alcoholfree', 'openall'], going: 15, solo: 8, attendees: ['a6', 'a7', 'a10', 'a12', 'a13', 'a11'], meet: 'Meet at the Hub front desk at 12:00 — aprons are by the door.', blurb: 'Drop in between lectures and make something ugly on purpose. Clay, tools and tea provided.' },
  { id: 'e6', society: 'QMUL Asian Society', handle: '@qmulasiansociety', logo: 'asian-society', color: '#92400e', title: 'Bollywood dance taster', when: 'Sat 29 Nov · 14:00–15:30', where: 'Qmotion studio', walk: '5 min walk', campus: true, price: '£3', tags: ['daytime', 'alcoholfree', 'openall'], going: 27, solo: 4, attendees: ['a1', 'a3', 'a9', 'a7', 'a13'], meet: 'Meet outside Qmotion reception at 13:50.', blurb: 'Learn a 90-second routine from scratch. No partner, no experience, no judgement.' },
  { id: 'e7', society: 'Intercultural Society', handle: '@qmintercultural', logo: 'intercultural-society', color: '#0369a1', title: 'Epping Forest winter walk', when: 'Sun 30 Nov · 10:00–15:00', where: 'Meet at Mile End station', walk: '40 min by tube from Mile End', campus: false, price: '£2 (travel)', tags: ['daytime', 'alcoholfree', 'openall'], going: 19, solo: 11, attendees: ['a5', 'a8', 'a11', 'a12', 'a7', 'a4', 'a13'], meet: 'Meet under the Mile End station clock at 09:50 — bring a snack.', blurb: '8 km easy loop through the forest, back by 3 pm. We walk at the pace of the slowest person.' },
  { id: 'e8', society: 'Computer Science Society', handle: '@qmcssoc', logo: 'cs-society', color: '#4c1d95', title: 'Build night: hackathon warm-up', when: 'Thu 27 Nov · 18:00–21:00', where: 'Bancroft Road 1.13', walk: '4 min walk', campus: true, price: 'FREE', tags: ['openall'], going: 35, solo: 12, attendees: ['a2', 'a6', 'a12', 'a8', 'a10', 'a1', 'a7'], meet: 'Meet at the Bancroft Road entrance at 17:55 — pizza arrives at 18:30.', blurb: 'Bring a laptop, find a team for WoHack. Mentors from the society on hand.' },
  { id: 'e9', society: 'Feminist Society', handle: '@qmulfeministsociety', logo: 'feminist-society', color: '#9d174d', title: 'Book club & tea', when: 'Fri 28 Nov · 13:00–14:00', where: 'Library, Group Study Room 2', walk: '3 min walk', campus: true, price: 'FREE', tags: ['daytime', 'alcoholfree', 'openall'], going: 12, solo: 6, attendees: ['a3', 'a9', 'a11', 'a7', 'a13'], meet: 'Meet at the Library turnstiles at 12:55.', blurb: "This month: bell hooks, All About Love. Haven't read it? Come anyway — half of us haven't." },
]

export const TAG_LABEL = { daytime: 'Daytime', alcoholfree: 'Alcohol free', openall: 'Open to all unis' }
export const EVENT_FILTERS = [
  { key: 'all', label: 'All', fn: () => true },
  { key: 'on', label: 'On campus', fn: (e) => e.campus },
  { key: 'off', label: 'Off campus', fn: (e) => !e.campus },
  { key: 'free', label: 'Free', fn: (e) => e.price === 'FREE' },
  { key: 'daytime', label: 'Daytime', fn: (e) => e.tags.includes('daytime') },
  { key: 'alcoholfree', label: 'Alcohol free', fn: (e) => e.tags.includes('alcoholfree') },
]
export const byId = (id) => ATTENDEES.find((a) => a.id === id)
export const societyLogo = (e) => (e.logo ? `/logos/${e.logo}.png` : null)
