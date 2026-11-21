# DESIGN.md — QMUL campus app (campusM) visual spec

Source of truth: `refs/ref-1-home-top.png` … `refs/ref-4.png` (1179×2556, iPhone 15 Pro @3x → 393×852 pt)
and `refs/recording.mp4` (8 s, 60 fps, launch + scroll). Every value below was sampled or measured
from those pixels and divided by 3. Units are CSS px at a 393 px wide viewport. The build targets
390×844 with a fluid 3‑column grid, so everything lands within 1 px of the reference.

## 1. Colours

| Token | Hex | Where sampled |
|---|---|---|
| `--qm-navy` tile fill | `#063486` | tile interiors (range #063486–#083585) |
| `--qm-teal` tile border | `#2eb0bf` | 4 px device border (range #2c9aaf–#2eb0bf) |
| `--qm-logo` | `#154091` | crown + wordmark |
| header / nav background | `#ffffff` | |
| header bottom hairline | `#444444` 1 px | y = 123 |
| nav top hairline | `#b3b3b3` 1 px | y = 746 |
| nav active (icon fill + label) | `#1a73e8` | "My Campus" |
| nav inactive icon + label | `#222222` | |
| greeting text | `#ebebee` | "Hello, …" (not pure white) |
| tile label / icon | `#ffffff` | |
| alert banner red | `#b23325` | SECURITY ALERT card |
| banner pause button | `rgba(0,0,0,.55)` circle | |
| banner dots pill | `rgba(0,0,0,.45)` pill, dots `#eaf0f3` | |
| tile badge | bg `#cfd6e4`, text `#3b4a66` | "2" on Module Evaluation |
| highlight outline | `#e1df17` | yellow box round Exam timetable |
| TalkCampus banner green | `#2f7a3e` (from recording) | carousel slide 1 |

**Page background (fixed to the viewport, content scrolls over it):**
- 124 → 373 px: the hero photo (`public/img/hero.jpg`, London skyline with dark cloud, cool blue
  grade). The photo stays put while the grid scrolls over it (visible in ref‑3: clouds behind the Email row).
- 373 → 747 px: diagonal gradient. Sampled corners: top‑left `#243f6e`, top‑right `#254673`,
  bottom‑left `#2b7495`, bottom‑right `#2d8aa4`.
  → `linear-gradient(165deg, #233c6b 0%, #2d8aa4 100%)` over that band.

## 2. Typography

| Role | Family | Weight | Size / line | Notes |
|---|---|---|---|---|
| Tile label | Source Sans 3 (= Source Sans Pro) | 600 | 15.5 / 18 px | cap height 10.3 px measured; wraps to 2–3 lines |
| Big tile label (AskQM) | Source Sans 3 | 600 | 31 / 36 px | exactly 2× small |
| Greeting "Hello, Aisha" | Helvetica Neue / Helvetica / Arial | 400 | 49 / 1 | cap height 35.3 px, colour #ebebee |
| Bottom nav label | Open Sans | 700 | 10.5 / 1 | cap height 7.3 px |
| Banner title | Source Sans 3 | 700 | 22.5 px uppercase | "SECURITY ALERT:" |
| Banner body | Source Sans 3 | 400 | 23.5 / 34 px | 3 lines |
| Logo wordmark | Helvetica (Queen Mary) + Helvetica Neue Condensed Bold (University of London) | | 201×55 px | reproduced from a 3× crop → `public/img/qm-logo.png` |
| Badge number | Source Sans 3 | 600 | 15 px | |
| Status bar | SF Pro (system) | 600 | 17 px | only drawn in the desktop iPhone frame |

Letter‑spacing is 0 everywhere. No text shadows.

## 3. Header (0 → 124 px)

- Status bar area 0–59 px, white.
- Logo: 201×55 px image, left 97, top 69 (horizontally centred, bottom sits on the hairline).
- Refresh (sync) icon: 18×13 px, two curved arrows, stroke 2, `#000`, left 315, top 90.
- Kebab: three 3.5 px dots, x 361, centres y 91.5 / 97 / 102.5.
- 1 px `#444` hairline at the bottom.

## 4. Hero (124 → 373 px, 249 px tall)

- Full‑bleed photo, no overlay needed (grade baked into the asset).
- Greeting: left 50 px, cap‑top 51 px below hero top (abs 174), baseline abs 209.

## 5. Tile grid

- Outer margin 15 px left/right; 3 columns of 106.67 px; gap 22 px both axes; tiles are square.
- First row top = 267 px (overlapping the hero by 106 px). Row pitch 128.67 px.
- **Small tile**: fill `#063486`, border 1.33 px `#2eb0bf` (4 device px), radius 0, no shadow.
  - Label: Source Sans 600 15.5/18, padding‑left 13.7 (from outer edge), cap‑top 12 px below top.
  - Icon: 42×42 box, anchored bottom‑left at 12 px / 12 px, white, 2 px stroke, round joins, thin outline style.
- **Big tile (AskQM)**: spans 2×2 slots (15→250 × 267→502) and is inset 8 px → 23→242 × 274→495.
  Border 3 px. Everything inside is the small tile ×2: label 31 px at left 25 / cap‑top 24, speech‑bubble
  icon ≈ 80×94 at left 24 / bottom 21.
- Badge ("2"): 22 px circle, overlapping the top‑right corner (−6, −6).
- Highlight state: 3 px `#e1df17` outline, 4 px outside the tile (seen on Exam timetable).
- Banner slot (full width): 377×120 px (8 px side margins), occupies one row slot with 15.3 px
  above and below (the grid gap shrinks from 22 → 15.3 around it). Padding‑left 15.3, title cap‑top 19.4.
  Warning triangle 73×77 at right 18 / top 27. Dots pill 70×18 centred, 9 px from the bottom.
  Pause circle Ø 27 at right 10 / bottom 10.

Scroll order in the real app: AskQM(2×2) + Timetable + MySiS · QMplus, Campus map, Your Union ·
Email, Library, Events · Exam timetable, Missed teaching reporting, Desk availability ·
Print credit, IT status, Transport · [banner carousel] · MyQMUL, Queen Mary Network, Your guide ·
Room availability, Report a problem, LinkedIn Learning · Careers and Enterprise, Alumni services,
Module Evaluation(badge 2) · Exam timetable(highlighted), Record my attendance.

## 6. Bottom nav (747 → 852 px)

- White, 1 px `#b3b3b3` top hairline, 71 px tall + 34 px home‑indicator safe area.
- 5 equal columns (78.6 px). Icon 24×24 at top 13 (abs 760–784). Label cap‑top at abs 794.
- Icons (Material‑style outlines, 2 px stroke, `#222`): home (filled when active), settings gear,
  calendar, bell, search. Active = `#1a73e8` icon fill + label.
- Home indicator: black 134×5 pill, 8 px from the bottom (desktop frame only).

## 7. Spacing scale

8 · 12 · 15 · 22 · 24 · 34 (safe area) · 106.67 (tile) · 128.67 (row pitch)

## 8. Motion (from the recording)

- Launch: white screen with a small grey spinner (centre) for ~2.7 s; header logo shown at ~50 %
  opacity while loading, bottom nav already visible. Then hero fades in and **tiles pop in one by
  one in a random order** over ~1.2 s (each: scale 0.2→1 with a squashed aspect, ~200 ms ease‑out).
- Scroll: native momentum; background fixed; greeting scrolls away with the grid.
- Banner carousel: auto‑advances (~5 s) green TalkCampus → red Security alert, dots + pause button.
- Press: tile dims (opacity .85) for the duration of the touch. New screens slide in from the right
  (iOS push), back slides out.
- No shadows, no rounded corners, no blur effects anywhere on the home screen.

## 9. Icon style guide (for new tiles)

White, 2 px stroke, round caps/joins, drawn in a 48‑unit viewBox, single‑weight outline with the odd
solid shape (Your Union lion, LinkedIn "in"). Keep new icons (Socials, Opportunities, Free & Cheap)
to the same vocabulary: outline people, outline briefcase/star, outline tag.
