# Ctrl + Connect — new features inside the Queen Mary app

**WoHack 2026 · theme: University Equality (widening participation in higher education)**
Concept prototype. Not an official Queen Mary University of London product. Every person, event and listing is fictional.

Live demo: https://ctrl-connect-zeta.vercel.app (QR code in `qr.png`; URL also in `DEPLOY_URL`). Open it on a phone for the full-screen experience; on a laptop it sits inside an iPhone frame.

## The problem

Universities have the societies, the funding, the insight days and the free stuff. Having them *available* is not the same as being able to *use* them:

- Going to a society event alone feels like a risk, so students who arrived without a ready-made friendship group — commuters, first-generation students, international students — stay home. The event exists; they never get there.
- Opportunities with real money attached (bursaries, spring weeks, insight days for women in STEM or first-gen students) are announced in places you only know to look if someone already told you. The deadline passes before you hear about it.
- The small, concrete things that make a tight month survivable — leftover food from an event, a new café's opening discount, where the free period products actually are — travel by word of mouth, so they reach the students who already have the network.

## Persona

**Aisha, Biochemistry, Year 1.** Commutes in from Ilford, no one from school came to Queen Mary. She has the campus app on her phone because it's where the timetable is. The moment things go wrong: Tuesday, 1 pm, a free Biochemistry Society mixer is on in the café downstairs. She reads the Instagram post twice, decides she can't walk in alone, and goes to the library instead.

## What we built

Ctrl + Connect adds three tiles to the existing app home screen, straight after the AskQM block, in the same style as every other tile (plus a NEW badge) so it feels shipped rather than bolted on.

### Socials (hero feature)
- Society events near Mile End with walking time from campus, on/off campus, price or FREE, and tags (daytime, alcohol free, open to all unis).
- Filter chips: All · On campus · Off campus · Free · Daytime · Alcohol free.
- Every event shows **"24 going · 7 going solo"** — going alone is made visible and normal.
- The attendee list is **blurred and locked** until you sign up to that event ("Only attendees can see who's going").
- Attendees show first name, course, year, a uni tag if they're from another university, and a "going solo" label.
- **Match**: tap Match on someone going solo. The prototype simulates their acceptance after ~2 s, with a celebration animation; only after that mutual match are LinkedIn, phone and a **suggested meeting point** revealed. Before that, no contact details exist anywhere in the UI.
- Safety: verified `.ac.uk` emails only, a "hide me" toggle, report and block on every row, and a plain-language explainer of mutual opt-in.
- Students from other universities only appear on events tagged "Open to all unis".

### Opportunities
- Filter by year (1st, 2nd, 3rd, Postgrad — set at sign-up, switchable; every year has at least three items) and by category: Scholarships & funding · Student consultancy projects · Competitions · Insight days · Spring weeks.
- Cards with a deadline countdown, eligibility tags (first gen, women in STEM, low income, international) and "5 people on your course are applying".
- A **Deadlines** timeline view, grouped by month.
- **Find an application buddy** — the same mutual-match flow, with a suggested time and place to go through the form together.

### Campus Perks
Three tabs:
- **Free food** posted by students with a live expiry countdown and "I'm heading there".
- **Deals & new openings** near Mile End, with restaurant logos.
- **Period products**: free locations on campus with stock status and **Report out of stock**.

### Sign-up (first time you tap "Sign up to event" or "Match")
Queen Mary student or student from another London uni (dropdown) → first name, university email (must end in `.ac.uk`), course, year → fake 6-digit code screen. Pre-filled with Aisha / Biochemistry / Year 1 so the demo takes ten seconds. No account is created; nothing is sent anywhere.

## Fit with the University Equality theme

The barrier we chose is social and informational, not academic: the students who get the most out of university are the ones who already have people to go with and someone to tell them about the bursary. Ctrl + Connect lowers the cost of showing up alone (you can see who else is solo, and arrange to meet one of them first), puts the money and the opportunities in the one app every student already opens for their timetable, filtered to what they are actually eligible for, and treats free food and period products as first-class campus information rather than gossip. Every design choice assumes the user has no network yet.

## How the replica was built

Judges open this on their own phones, so it had to be indistinguishable from the real app. The real app was measured, not imitated:

1. Screenshots of the live Queen Mary app (iPhone 15 Pro, 3×) and a screen recording were analysed pixel by pixel — colours sampled, tile grid, type sizes, header and nav geometry measured — into `DESIGN.md`.
2. The home screen was rebuilt in React to those values. The existing tile icons, header glyphs and nav icons were lifted from the screenshots as alpha masks so they are pixel-exact; the three new tiles use inline SVG drawn in the same thin-line style.
3. A Playwright harness (`npm run qa`) renders the build at 393×852 @3× and diffs it against the screenshots with pixelmatch; five rounds got the home screen to a 1.7 % pixel mismatch (the rest is sub-pixel edge aliasing and a cloud band behind the greeting).
4. The launch animation (tiles popping in one by one), the fixed photo-and-gradient background, and the rotating banner carousel were reproduced from the recording.

## Tech stack

- **Vite 7 + React 19** — app shell and screens
- **Tailwind CSS 4** (via `@tailwindcss/vite`) for utilities; the replica itself is hand-written CSS driven by the measured values in `DESIGN.md`
- **framer-motion 12** — iOS-style push/pop transitions, bottom sheets, tap feedback, tile pop-in, match celebration
- **localStorage** (wrapped in try/catch) — all state: sign-up, events you're going to, matches, blocks, reports, claims, stock reports. No backend.
- **Playwright + pixelmatch + pngjs** — visual QA loop against the reference screenshots (`scripts/qa.mjs`, `scripts/measure.py`)
- **Pillow + NumPy** (Python) — colour sampling, geometry measurement and icon-mask extraction from the screenshots (`scripts/extract_icons.py`, `scripts/extract_chrome.py`)
- **ffmpeg** — frame extraction from the screen recording
- **qrcode** (npm) — `qr.png` for the slides
- `scripts/singlefile.mjs` builds `plusone.html`, a single self-contained file with every image inlined as base64
- Hosting: Vercel

## Credits

- Queen Mary University of London — the campus app this concept lives inside, the wordmark and the existing tile icons. Used for a student hackathon prototype only.
- Society logos are the societies' own Instagram profile pictures (Padel Club, Pottery, Intercultural, Islamic, Computer Science, Women's Football, Asian and Feminist societies), used here for the demo only; a society without a logo falls back to initials.
- Company and restaurant logos are fetched by domain at build time from Google's favicon service (`t0.gstatic.com/faviconV2`), with DuckDuckGo's icon service (`icons.duckduckgo.com`) as a second source for a few small ones, and the trademark holders own them. Anything that fails to load falls back to initials.
- Fonts: [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) (Adobe, OFL) and [Open Sans](https://fonts.google.com/specimen/Open+Sans) (Google, OFL) via Google Fonts.
- [Ionicons](https://ionic.io/ionicons) (MIT) for bottom-nav icon references.
- Open source: React, Vite, Tailwind CSS, framer-motion, Playwright, pixelmatch, pngjs, qrcode, Pillow, NumPy, ffmpeg.
- Built with Claude Code (Anthropic) as a pair programmer for the design audit, build and QA loop.
- Phone numbers in the dummy data use the Ofcom-reserved 07700 900xxx range. All names are invented.

## Run it locally

```bash
npm install
npm run dev
```

`npm run qa` re-runs the screenshot comparison (needs the reference screenshots in `refs/`). `node scripts/smoke.mjs` clicks through every flow and screenshots each step.

## Team

Built in one day at WoHack 2026 (Queen Mary University of London) by:

| Name | Role |
|---|---|
| Ismah Qureshi ([@ism4hhh](https://github.com/ism4hhh)) | Lead developer & deployment: co-built the React/Vite/Tailwind front end and the iPhone-frame demo, deployed it on Vercel, and set up the repository |
| Kaniz Humayra ([@kaniz-humayra](https://github.com/kaniz-humayra)) | Front-end development & data: co-built the React/Vite front end; created the demo dataset (society events, opportunities by year, deals and free-stuff listings, society and company logos) |
| [Imaan Mirza](https://devpost.com/imaanmz02) | UX & interface design: designed the screens and user flows (Socials, Opportunities, Free & Cheap), layout and animations, and the design audit |
| [Nabila Alhadi](https://devpost.com/nabila10113) | Research & safety design: defined the user persona and barriers; designed the buddy matching and safety rules (mutual opt-in, verified emails, hide-me) |
| [Forehanmi Adeoye](https://devpost.com/forehanmi) | Pitch, testing & submission: wrote the demo script, recorded the 3-minute video, ran testing and QA of the flows, and wrote the Devpost submission |
