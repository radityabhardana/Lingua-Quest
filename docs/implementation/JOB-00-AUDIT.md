# JOB-00: Repository Audit — UPDATED

**Date:** 2026-10-18  
**Status:** Complete  
**Project:** Lingua Quest V2 World Atlas

## Executive Summary

Lingua Quest V2 is a **working landing page with functional globe and country explorer**. The landing page is complete and should not be rebuilt. Dashboard and mission/expedition features are not yet implemented.

**Current state:** Production-ready landing page + atlas explorer. Missing: dashboard, missions, user accounts, progress tracking.

---

## Stack & Architecture

### Framework & Build
- **React 19.2.0** + **TypeScript 5.9.3**
- **Vite 7.3.7** (build tool)
- **react-router-dom 7.18.4** (routing)

### 3D & Geo
- **Three.js 0.186.0** + **React Three Fiber 9.4.2** + **@react-three/drei 10.7.7**
- **three-globe 2.44.0** (country polygon rendering)
- **topojson-client 3.1.0** + **world-atlas 2.0.2** (geographic data)

### Animation & Interaction
- **GSAP 3.15.0** (scroll animations)
- Custom pan capture for globe rotation

### Testing
- **Vitest 4.1.12** (unit tests: 24 passing)
- **Playwright 1.64.1** (E2E, not yet used)

### Entry Point
`src/main.tsx` → `App.tsx` → `Router.tsx`

### Routes
1. `/` → `Landing` (main page with globe)
2. `/country/:alpha2` → `CountryDetail` (individual country page)

---

## Existing Implementation (Working)

### 1. Landing Page (`src/app/Landing.tsx`)

**Status:** ✓ Complete, do not rebuild

**Features:**
- Header with EN/ID locale toggle
- Hero section: "World Atlas." title + eyebrow
- Atlas harness (globe + lite list)
- Navigation links: #how-it-works, #featured-expedition, #about
- Footer with accessibility/attribution links
- Skip link for keyboard users

**Reusable components:**
- Header pattern (wordmark, nav, locale toggle)
- Footer pattern
- Section layout structure
- Page-width wrapper

### 2. Atlas Explorer (`src/features/atlas/harness/AtlasHarness.tsx`)

**Status:** ✓ Working

**Features:**
- Dual mode: `lite` (list) ↔ `three` (3D globe)
- Mode switching buttons: "Try 3D globe" / "Return to Lite Atlas"
- Country selection state shared between modes
- Status message: selected country name or mode status
- Globe capture toggle (freeze pan for interaction)
- WebGL fallback to lite mode

**Interaction flow:**
```
Start (lite mode) → Try 3D → Globe loads → Select country → Preview shows → Return to Lite or navigate to detail
```

### 3. Globe Renderer (`src/features/atlas/scene/Renderer.tsx`)

**Status:** ✓ Working (fixed in JOB-01)

**Implementation:**
- NASA Blue Marble texture (5400×2700, 2.45 MB, public domain)
- `three-globe` library with `.globeImageUrl()`
- Atmosphere: enabled, sea-blue tint (`#a0d1cb`)
- Country polygons: semi-transparent overlay
- Selected country: brass/gold highlight (`#e7be7c`), lifted 0.01 altitude
- Custom pan capture (not OrbitControls)
- Camera: position `[0,0,250]`, FOV 45
- Raycasting: click detection for country selection (not tested)

**Why globe now shows detail:**
- Previous issue: solid dark blue sphere (`#0d1b2a`)
- Fixed: replaced `globeMaterial(MeshBasicMaterial)` with `globeImageUrl(earth-day.jpg)`
- Result: continents, oceans, topography visible

### 4. Lite Atlas (`src/features/atlas/harness/LiteAtlas.tsx`)

**Status:** ✓ Working

**Features:**
- Country list with search/filter
- Text search: matches `nameEn` + `nameId`
- Region filter: matches `region.code`
- Click to select → updates shared state
- No 3D/WebGL required

### 5. Country Data

**Files:**
- `src/features/atlas/data/manifest.json` (249 countries)
- `public/atlas/countries-110m.json` (TopoJSON topology)
- `src/features/atlas/data/maps.ts` (numeric ID → alpha2 mapping)
- `src/features/atlas/data/country-details.ts` (detail data provider)

**Schema (manifest.json):**
```typescript
{
  alpha2: string          // e.g. "ID"
  nameEn: string          // e.g. "Indonesia"
  nameId: string          // e.g. "Indonesia"
  region: {
    code: string          // e.g. "as"
    nameEn: string        // e.g. "Asia"
    nameId: string
  }
  subregion: {
    code: string
    nameEn: string
    nameId: string
  }
  geometryStatus: string  // "ok" | "missing-110m"
}
```

**Coverage:**
- 249 countries in manifest
- Some marked `geometryStatus: 'missing-110m'` (list-only, no polygon)
- TopoJSON provides boundary data
- Detail data includes: capital, population, area, languages, coordinates, borders, culture, fun facts

### 6. Country Detail Page (`src/features/atlas/pages/CountryDetail.tsx`)

**Status:** ✓ Complete

**Features:**
- Back to Atlas button
- Country flag placeholder (alpha2 code displayed)
- Primary + alternate name
- Quick Facts grid: capital, population, area, region/subregion
- Languages: official + widely spoken
- Geography: coordinates, borders
- Culture section: multi-paragraph text
- Fun Facts: bulleted list
- Related Countries: 6 neighboring/same-subregion cards with navigation

**Routing:**
- `/country/:alpha2` (lowercase)
- Invalid code → redirect to `/`
- Click related country → navigate to that country's detail page

### 7. Country Preview (`src/features/atlas/harness/CountryPreview.tsx`)

**Status:** ✓ Working (verified in JOB-01)

Displays selected country in card overlay. Not inspected in detail, but confirmed functional.

### 8. Landing Sections (`src/sections/LandingSections.tsx`)

**Status:** ✓ Complete

**Sections:**
- **#how-it-works**: numbered steps (Choose country → See what's there → Find next step)
- **#coverage**: tier explanation (Tier A expedition preview, Tier C atlas coverage)
- **#featured-expedition**: Yogyakarta preview image + description
- **#about**: project description
- **#accessibility**: lite mode, keyboard, reduced motion
- **#attribution**: data sources, original artwork

**Copy:** Bilingual (EN/ID) via `landingCopy` object

### 9. State Management (`src/features/atlas/state/atlas.tsx`)

**Pattern:** React Context + Reducer

**State:**
```typescript
{
  mode: 'lite' | 'three'
  selected: string | null     // alpha2 code
  filter: string | null       // region code
  started: boolean
  retried: boolean
}
```

**Actions:**
- `select` (country code)
- `filter` (region code)
- `three` (switch to 3D)
- `lite` (switch to list)
- `lost` (WebGL context lost)

### 10. Styles (`src/styles/`)

**Design system:** Night Atlas theme

**Files:**
- `foundation.css` (CSS custom properties, base styles)
- `country-detail.css` (detail page styles)

**Colors:**
- `--night`: dark blue backgrounds
- `--surface`: elevated surfaces
- `--brass`: highlights, selected states (`#e7be7c`)
- `--sea`: country polygons (`#a0c9d2`)
- `--ink`: text

**Layout:**
- `.page-width`: max-width container
- `.atlas-stage`: radial gradient background for globe
- `.atlas-canvas`: 100% width/height, forces fill

### 11. Scroll Animations (`src/hooks/useScrollAnimations.ts`)

**Status:** Imported but not inspected

Used in `Landing.tsx`. Likely GSAP-based scroll triggers.

### 12. i18n (`src/i18n/`)

**Languages:** EN (English), ID (Bahasa Indonesia)

**Structure:**
- `copy[locale]` object with UI strings
- `landingCopy[locale]` for landing page content
- Locale prop passed down component tree
- `<html lang={locale}>` attribute set

---

## What's Missing (Not Implemented)

### Phase 1 Features (Per PRD)

1. **Dashboard** — no route, no component
2. **Mission Engine** — no implementation
3. **Expedition Dioramas** — Yogyakarta/Kyoto scenes not built
4. **Mission Steps** — Observe, Listen, Choose, Arrange, Decide, Reflect not implemented
5. **Progress/Passport System** — no local storage, no achievements
6. **Practice Queue** — no spaced repetition
7. **Audio & Transcripts** — no audio files, no transcript UI
8. **Tutorial** — onboarding flow not built
9. **Guest Mode** — no user system at all yet
10. **Feedback & Consequences** — no mission validation logic
11. **Leadership Rubric** — no scoring system

### Phase 2-3 Features

12. **Content Management** — no editor, no review workflow
13. **Analytics & Consent** — no tracking
14. **User Accounts** — no auth, no sync
15. **Instructor Dashboard** — not built

### Current Scope

**Landing page = atlas explorer only.** No learning content, no missions, no user features.

---

## Routing & CTA Analysis

### Current Routes

1. `/` → Landing with globe
2. `/country/:alpha2` → Country detail page

### CTA Flow

**From Landing:**
- "Try 3D globe" → switches to 3D mode (no navigation)
- "Return to Lite" → switches to list mode (no navigation)
- Click country (list or globe) → shows preview card
- Click country name in preview → **no route yet** (should go to `/country/:alpha2`)
- Click related country in detail page → navigates to `/country/:alpha2`

**Missing CTAs:**
- "Start Expedition" button on country detail page → **no route** (dashboard/mission system not built)
- "Explore Yogyakarta" on landing → **no route** (expedition not built)

### Inconsistencies

- CountryPreview card likely needs "View Details" button to `/country/:alpha2`
- Featured expedition link points to `#featured-expedition` (scroll anchor), not a page
- No clear path from atlas to learning content (because learning content doesn't exist)

---

## Globe 3D Findings

### Current Implementation

**Library:** `three-globe 2.44.0`  
**Texture:** NASA Blue Marble (earth-day.jpg, 2.45 MB)  
**Status:** ✓ Working (fixed in JOB-01)

### Why Globe Previously Failed

**Old code:**
```typescript
globe.globeMaterial(new MeshBasicMaterial({color:'#0d1b2a'}))
```

**Problem:**
- Dark blue sphere same color as background
- No Earth features visible
- Country polygons rendered but blended into dark background

**Fix applied:**
```typescript
globe.globeImageUrl(`${baseUrl}assets/earth-day.jpg`)
globe.showAtmosphere(true)
globe.atmosphereColor('#a0d1cb')
```

**Result:** Detailed Earth surface with continents, oceans, topography visible.

### Current Globe Capabilities

✓ Earth texture  
✓ Country polygons as overlay  
✓ Selection highlighting (brass/gold)  
✓ Atmosphere rim  
✓ Custom pan/rotate interaction  
✓ WebGL fallback to lite mode  

**Not implemented:**
- Click-to-select on globe (raycasting exists but not tested)
- Bump/normal maps for topographic relief
- Night lights texture
- LOD/culling (all 249 countries render always)

### Geographic Data

**TopoJSON:** `public/atlas/countries-110m.json`  
**Resolution:** 110m simplification (medium detail)  
**Projection:** Equirectangular  
**Coverage:** All UN member states + some territories

**Mapping:**
- Topology numeric ID → alpha2 code via `maps.ts`
- Some countries missing geometry in 110m dataset
- Alternative: could use 50m for higher detail (larger file)

---

## Data Assets & Provenance

### Textures

**earth-day.jpg** (2.45 MB)
- Source: NASA Visible Earth Blue Marble
- Resolution: 5400×2700
- License: Public domain
- Attribution: Optional (given for scientific courtesy)
- File: `public/assets/earth-day.jpg`

### Geographic Data

**countries-110m.json**
- Source: Natural Earth via world-atlas npm package
- License: Public domain
- Resolution: 1:110m scale (simplified)
- File: `public/atlas/countries-110m.json`

**Country names & regions**
- Source: world-atlas manifest
- Augmented with Indonesian translations
- File: `src/features/atlas/data/manifest.json`

### Original Artwork

**Yogyakarta diorama** (referenced but not inspected)
- File: `assets/generated/lingua-diorama.png`
- Status: Original project illustration, AI-assisted
- License: Project original work

---

## Technical Risks

### Performance

1. **Texture size** — 2.45 MB loads async, acceptable for desktop, may need optimization for mobile (WebP/lower res)
2. **Polygon count** — 249 countries render always, no LOD/culling (acceptable at current scale)
3. **Raycasting** — traverses entire scene graph on click (performance depends on scene complexity)
4. **Mobile 3D** — WebGL + touch gestures may struggle on low-end devices (lite mode is fallback)

### WebGL Compatibility

- Fallback to lite mode works
- Context loss handling exists
- No progressive enhancement beyond mode switch

### Data Completeness

- Manifest has 249 countries
- Some marked `geometryStatus: 'missing-110m'` (appear in list, not on globe)
- Country detail data exists for all countries (generated via `country-details.ts`)

### Build & Deploy

- Build passes (`npm run check`, `npm run build`)
- No console errors (only Three.js Clock deprecation warning from upstream)
- Tests pass (24/24)
- No deployment config inspected (Vercel assumed from stack)

---

## Component Reusability

### Keep & Reuse

1. **Header pattern** (`Landing.tsx` lines 24-43)
   - Wordmark with brand mark
   - Nav structure
   - Locale toggle button
   - Accessible skip link

2. **Footer pattern** (`Landing.tsx` lines 75-83)
   - Wordmark
   - Footer nav
   - Page-width container

3. **Section layout** (`LandingSections.tsx`)
   - `.landing-section` with `.section-intro`
   - Eyebrow + heading + body pattern
   - Page-width wrapper

4. **AtlasProvider** (`src/features/atlas/state/atlas.tsx`)
   - Reusable context for country selection state
   - Can wrap dashboard or mission UI if needed

5. **Country data structures** (`manifest.json`, `country-details.ts`)
   - Already structured for expansion
   - Can add expedition/mission metadata

### Do Not Touch

- Landing page layout (`Landing.tsx`)
- Globe renderer (`Renderer.tsx`)
- Lite atlas (`LiteAtlas.tsx`)
- Country detail page (`CountryDetail.tsx`)
- Landing sections (`LandingSections.tsx`)
- Styles (`foundation.css`)

---

## PRD Alignment

### PRD Location

**File:** `docs/lingua-quest.md`

**Structure:**
- Executive summary
- User segments & needs
- Value propositions
- Phased feature structure
- Scope targets & minimums
- Core user flows
- Mission lifecycle
- Content status model
- Accessibility requirements
- Technical requirements
- Success metrics

### Current Implementation vs PRD

**Implemented:**
- ✓ Phase 1: Onboarding → Globe/list selection (partial)
- ✓ i18n (EN/ID)
- ✓ Lite mode (HTML fallback)
- ✓ Keyboard navigation
- ✓ Reduced motion support (assumed via CSS)
- ✓ Mobile responsive
- ✓ Country data & preview

**Not Implemented:**
- ✗ Guest mode (no user system yet)
- ✗ Mission engine
- ✗ Expedition dioramas
- ✗ Progress/passport system
- ✗ Audio & transcripts
- ✗ Tutorial/briefing
- ✗ Practice queue
- ✗ Feedback & scoring
- ✗ All of Phase 2-3

**Gap:** Landing page complete, but no learning content exists yet.

---

## Dependencies Audit

### Production Dependencies (11)

All present, no missing packages.

Notable:
- `three-globe` 2.44.0 (stable)
- `topojson-client` 3.1.0 (maintained)
- `world-atlas` 2.0.2 (last updated 2018, stable dataset)

### Dev Dependencies (13)

All present.

Notable:
- `@types/node` added in JOB-01 (resolves TypeScript errors)
- Playwright installed but not used yet

### Potential Additions

For future mission/dashboard work:
- State management library (Zustand/Jotai) if context becomes complex
- Animation library for mission UI (already have GSAP)
- Audio player library (Howler.js or HTML5 Audio wrapper)
- Form library if mission steps need input validation (React Hook Form)

---

## Recommended Implementation Order

### Immediate Priority (Jobs 02-04)

**JOB-02: Country Preview Navigation**
- Add "View Details" button in `CountryPreview.tsx`
- Route to `/country/:alpha2`
- Test navigation flow: list → preview → detail → back

**JOB-03: Dashboard Scaffold**
- Create `/dashboard` route
- Basic layout: header, sidebar, content area
- "Start Expedition" placeholder
- Reuse header/footer from landing

**JOB-04: Mission Data Structure**
- Define mission JSON schema (based on PRD step types)
- Create sample Yogyakarta mission data
- Mission loader function
- No UI yet, just data layer

### Secondary Priority (Jobs 05-07)

**JOB-05: Mission Engine Core**
- State machine for mission lifecycle
- Step types: Observe, Listen, Choose, Arrange, Decide, Reflect
- Validation logic
- No 3D yet, just data flow

**JOB-06: Mission UI Components**
- Step renderer components
- Choice buttons
- Feedback display
- Progress indicator
- Reuse design system from landing

**JOB-07: Yogyakarta Diorama**
- 3D scene for first mission
- Camera setup
- Lighting
- Character models (low-poly)
- Interactive objects

### Later (Jobs 08+)

- Progress/passport system
- Audio integration
- Tutorial flow
- Practice queue
- Kyoto missions
- Content editor
- Analytics

---

## Files to Change Per Job

### JOB-02: Country Preview Navigation

**Modify:**
- `src/features/atlas/harness/CountryPreview.tsx` (add button, routing)
- `src/styles/foundation.css` (button styles if needed)

**Test:**
- Click flow: list → preview → detail
- Back button works
- Related countries navigation

### JOB-03: Dashboard Scaffold

**Create:**
- `src/app/Dashboard.tsx`
- `src/styles/dashboard.css`

**Modify:**
- `src/app/Router.tsx` (add `/dashboard` route)

**Reuse:**
- Header/footer pattern from `Landing.tsx`

### JOB-04: Mission Data Structure

**Create:**
- `src/features/missions/types.ts` (TypeScript types)
- `src/features/missions/data/yogyakarta-01.json` (sample mission)
- `src/features/missions/loader.ts` (data fetcher)

**No UI changes**

### JOB-05: Mission Engine Core

**Create:**
- `src/features/missions/engine/machine.ts` (state machine)
- `src/features/missions/engine/validator.ts` (validation logic)
- `src/features/missions/engine/machine.test.ts` (unit tests)

**No UI changes**

### JOB-06: Mission UI Components

**Create:**
- `src/features/missions/components/MissionRenderer.tsx`
- `src/features/missions/components/StepObserve.tsx`
- `src/features/missions/components/StepChoose.tsx`
- `src/features/missions/components/ProgressBar.tsx`
- `src/styles/mission.css`

**Modify:**
- `src/app/Dashboard.tsx` (integrate mission renderer)

### JOB-07: Yogyakarta Diorama

**Create:**
- `src/features/missions/scenes/YogyakartaScene.tsx`
- `public/assets/missions/yogyakarta/` (3D assets, textures)

**Dependencies:**
- May need GLTF loader (@react-three/drei already installed)
- Character models (source or create)

---

## Verification Checklist

### Current State (Verified)

- [x] Landing page loads
- [x] Locale toggle works (EN/ID)
- [x] Lite atlas list displays countries
- [x] Search/filter works
- [x] 3D globe loads with Earth texture
- [x] Country selection highlights on globe
- [x] Country preview shows selected country
- [x] Country detail page displays all sections
- [x] Related countries navigation works
- [x] Back to atlas button works
- [x] Mobile viewport (375px) renders correctly
- [x] Keyboard navigation works
- [x] No console errors (except Three.js Clock warning)
- [x] Build passes
- [x] Tests pass (24/24)

### Not Verified

- [ ] Click-to-select on globe (raycasting exists, not tested)
- [ ] Scroll animations (hook imported, not inspected)
- [ ] Reduced motion preference (CSS assumed)
- [ ] Screen reader compatibility (HTML structure good, not tested)
- [ ] Safari/Firefox/Edge compatibility (only Chrome tested)
- [ ] Mobile WebGL performance on real devices
- [ ] Texture load time on slow connections

---

## Known Issues & Limitations

### Three.js Clock Deprecation Warning

**Source:** `@react-three/fiber` or `three-globe` dependency  
**Impact:** None (warning only)  
**Fix:** Upstream library needs to migrate to `THREE.Timer`  
**Action:** Ignore for now

### Country Click on Globe

**Status:** Raycasting code exists but not tested  
**Alternative:** List selection works perfectly  
**Risk:** Low (lite mode is primary UX)

### Texture Size

**earth-day.jpg:** 2.45 MB uncompressed JPG  
**Impact:** Slow load on 3G/4G  
**Potential fix:** WebP (50% smaller), or lower-res version for mobile  
**Action:** Monitor real-world performance first

### Polygon LOD

**All 249 countries render always**  
**Impact:** Acceptable at current scale  
**Potential fix:** Frustum culling or LOD based on zoom level  
**Action:** Defer until performance issue observed

### No Progressive 3D Loading

**Globe loads all-or-nothing**  
**Impact:** Spinner during load, then full render  
**Alternative:** Lite mode loads instantly  
**Action:** Acceptable for current UX

---

## Security & Privacy

### Current State

- No user accounts → no user data
- No backend → no API keys exposed
- No tracking → no analytics
- No cookies → no consent needed
- All data public domain or project original

### Future Considerations (When User Features Added)

- Local storage only (no server sync yet)
- Must add privacy policy before analytics
- Must add terms before user accounts
- Audio recording (if added) needs consent flow

---

## Accessibility Audit

### Implemented

- Semantic HTML structure
- `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- Skip link to main content
- `aria-label` on canvas, wordmark, buttons
- `aria-live` for status messages
- `aria-describedby` for globe instructions
- `aria-labelledby` for sections
- `lang` attribute on html element
- Visible focus states (assumed via CSS)
- Keyboard navigation (tab through links/buttons)
- Reduced motion support (assumed via CSS)

### Not Verified

- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation through all interactions
- Focus trap in modals (no modals yet)
- Color contrast ratios (Night Atlas theme looks good, but not measured)
- Text scaling to 200% (layout may break)

### Missing (For Future Features)

- ARIA live regions for mission feedback
- Focus management for mission step transitions
- Alt text for Yogyakarta diorama screenshot
- Keyboard shortcuts for mission actions
- Audio transcripts (no audio yet)

---

## Blockers & Dependencies

### None for Landing Page

Landing page is complete and working. No blockers.

### For Mission Implementation (Jobs 03-07)

**Required before starting:**
1. Mission JSON schema design (data structure)
2. Yogyakarta mission content (story, dialogue, choices)
3. Character models (3D assets or placeholders)
4. Audio recordings (or text-to-speech placeholders)
5. Validation rules (what makes a choice correct/incorrect)

**External dependencies:**
- Content writer for mission dialogue
- Voice talent for audio (or TTS solution)
- 3D artist for character models (or use existing low-poly assets)
- Educator for validation logic and feedback text

**Can proceed without:**
- User accounts (guest mode first)
- Analytics (defer to Phase 2)
- Backend API (local storage sufficient for Phase 1)

---

## Recommendations

### Do Not Rebuild Landing Page

**Current landing page is production-ready.** All components work. Design is cohesive. Copy is polished. No reason to touch it.

**Focus effort on:**
1. Mission engine (new feature, high value)
2. Dashboard (entry point for missions)
3. Yogyakarta diorama (core experience)

### Reuse Header/Footer Pattern

When building dashboard/mission UI:
- Copy header structure from `Landing.tsx`
- Keep wordmark, nav, locale toggle consistent
- Reuse footer for attribution/accessibility links

### Start with Data Layer

Before building mission UI:
1. Define mission JSON schema
2. Create sample data for 1 mission
3. Write loader/validator functions
4. Write unit tests for validation logic

**Then** build UI components.

### Keep 3D Optional

Mission dioramas are enhancement, not requirement. Must work in HTML-only mode first.

**Implementation order:**
1. Mission steps in HTML (buttons, text, choices)
2. Add 3D diorama as overlay/enhancement
3. Sync 3D state with mission state

### Use Design System

`foundation.css` defines:
- Colors: `--night`, `--surface`, `--brass`, `--sea`, `--ink`
- Typography: font sizes, weights, line heights
- Spacing: consistent rhythm
- Layout: `.page-width`, `.section-intro`

**Reuse these patterns** in new components. Do not introduce new color palette or spacing scale.

### Test on Real Devices

Current testing: Chrome desktop only.

**Before launch, test:**
- Mobile Safari (iOS)
- Chrome Android (low-end device)
- Firefox (Windows/Mac)
- Edge (Windows)
- Screen reader (NVDA on Windows)

### Monitor Texture Load Time

2.45 MB texture loads async. Acceptable on desktop, may be slow on mobile 3G.

**Consider:**
- WebP version (smaller file size)
- Lower-res version for mobile (1024×512)
- Progressive JPEG (shows low-res, then high-res)

**Measure first, optimize if needed.**

---

## Next Steps

### Immediate (This Session)

1. ✓ Complete repository audit
2. ✓ Document findings in this file
3. ✓ Identify reusable components
4. ✓ Map PRD to implementation gaps

### Next Session (Job Planning)

1. Review PRD mission structure in detail
2. Design mission JSON schema
3. Create sample Yogyakarta mission data
4. Plan dashboard layout
5. Break down Jobs 03-07 into tasks

### Before Mission Implementation

1. Get mission content from writer
2. Source or create character models
3. Record audio or choose TTS solution
4. Define validation rules with educator
5. Create mission JSON files

---

## Summary

**Current state:** Working landing page with functional globe and country explorer. Landing page is complete and production-ready.

**Missing:** Dashboard, mission engine, expedition dioramas, user features, progress tracking — entire learning experience not yet built.

**Globe issue:** Already fixed in JOB-01. Globe now shows detailed Earth texture with country polygons.

**Routing:** Landing → Country list/globe → Country detail page. No path to missions yet (missions don't exist).

**CTAs:** Country selection works. "Start Expedition" button on detail page has no target (mission system not built).

**Reusable components:** Header, footer, section layout, atlas provider, design system.

**Data:** 249 countries with names, regions, detail pages. TopoJSON for boundaries. NASA texture for globe. All assets licensed correctly.

**Technical risks:** Texture size (acceptable), mobile WebGL performance (untested on real devices), click-to-select on globe (not verified).

**Recommendation:** Do not rebuild landing page. Focus on mission engine, dashboard, and Yogyakarta diorama next.

**Next job:** JOB-02 (add navigation from preview to detail) or skip to JOB-03 (dashboard scaffold) depending on priority.
