# JOB-02: Country Explorer — Design Proposal

**Date:** 2026-10-18  
**Status:** Proposal — Awaiting Approval  
**Project:** Lingua Quest V2

---

## Executive Summary

Redesign Country Detail page dari flat text layout menjadi **interactive, visual-first exploration experience** yang konsisten dengan Night Atlas design system. Establish clear information architecture dengan 3 distinct layers: **Landing (exploration) → Country Detail (discovery) → Dashboard (learning)**.

**Core principles:**
- **Visual over text** — 3D visualization, interactive elements, minimal prose
- **Progressive disclosure** — information unfolds through interaction
- **Consistent theming** — Night Atlas palette, brass accents, radial gradients
- **Clear separation** — geographic/cultural content stays outside quest/exp/level system

**Goal:** Country Detail becomes bridge between passive exploration (landing) and active learning (dashboard), without bleeding learning mechanics into geographic content.

---

## Information Architecture

### Three Distinct Layers

```
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 1: LANDING PAGE (World Atlas)                            │
│ Purpose: Discover countries through globe/list                 │
│ Content: Geographic selection, search, visual exploration      │
│ NO: Quest, exp, level, user progress                          │
├─────────────────────────────────────────────────────────────────┤
│ LAYER 2: COUNTRY DETAIL                                        │
│ Purpose: Deep dive into one country's geography/culture        │
│ Content: 3D vis, facts, culture, languages, related countries  │
│ Bridge: Subtle CTA to dashboard if expeditions exist          │
│ NO: Quest list, progress bars, community features             │
├─────────────────────────────────────────────────────────────────┤
│ LAYER 3: DASHBOARD (Future — Not in scope)                    │
│ Purpose: Learning hub — quest, progress, community            │
│ Content: Available expeditions, exp/level, achievements        │
│ Entry: From country detail CTA or direct nav                  │
└─────────────────────────────────────────────────────────────────┘
```

### User Flow

**Current session (JOB-02):**
```
Landing → Click country → Country Detail → [Back to Atlas]
   ↓            ↓              ↓
 Globe      3D highlight   Visual facts
 List       Preview card   Interactive
```

**Future flow (Dashboard integration):**
```
Landing → Country Detail → Dashboard → Mission → Results → Dashboard
                ↓              ↓          ↓         ↓
            Geography      Quest list   Observe   Exp/Level
            Culture        Available    Choose    Passport
                          Expeditions   Decide
```

**Boundary rules:**
- Landing page = **zero** quest/learning content
- Country Detail = geographic/cultural content + **one subtle CTA** to dashboard if expeditions exist
- Dashboard = **all** learning mechanics (exp, level, quest, community)

---

## Country Detail Page — Redesign Specification

### Current Problems

1. **Flat hero** — alpha2 code in box + plain text name
2. **No visual identity** — missing 3D country visualization
3. **Text-heavy sections** — Quick Facts as plain `<dl>`, prose paragraphs
4. **Generic layout** — doesn't match Night Atlas immersive feel
5. **Unclear CTAs** — "View available expeditions" goes nowhere
6. **No interactivity** — static page, no hover states, no animations

### Redesigned Structure

**6 sections, vertical scroll:**

1. **Hero Section** — Country name + 3D visualization
2. **Essential Facts** — Interactive fact cards
3. **Cultural Identity** — Visual + minimal text
4. **Language Discovery** — Interactive phrase explorer
5. **Regional Context** — Related countries grid
6. **Expedition Gateway** — CTA to dashboard (if expeditions exist)

---

### Section 1: Hero

**Layout:** Split viewport — 40% left (content), 60% right (3D)

**Left content:**
```
← Back to Atlas                    [brass, subtle, top-left]

[Small eyebrow]
Asia · Southeast Asia              [muted, uppercase, tracked]

Malaysia                           [Giant serif, --brass accent]
[Alternate name if different]      [Smaller, muted]

[Single-line intro]                [16px, max 60ch]
A country of contrasts...

[Scroll indicator]                 [Animated, brass]
↓ Explore
```

**Right 3D visualization:**
- Isolated country geometry extracted from globe
- Slow auto-rotation (10s per revolution)
- Brass glow edge (`box-shadow: 0 0 60px rgba(231,190,124,0.4)`)
- Dark background with radial gradient (`--night` to transparent)
- Hover: pause rotation, subtle lift
- Canvas size: fills right 60%, responsive aspect ratio

**Background:**
- Radial gradient: `radial-gradient(circle at 70% 50%, rgba(25,51,74,0.4), #0b1523)`
- Subtle noise texture overlay (10% opacity)

**Technical:**
- Reuse `three-globe` library
- Extract country geometry via `__atlasProject` (already exists in Renderer.tsx)
- Render isolated in separate Canvas
- Camera position: angled view, not dead-center

---

### Section 2: Essential Facts

**Layout:** 4-column grid (responsive: 2-col tablet, 1-col mobile)

**Fact card anatomy:**
```
┌──────────────────────────┐
│  [Icon]                  │  ← Brass accent
│                          │
│  CAPITAL                 │  ← Label, uppercase, tracked, muted
│  Kuala Lumpur            │  ← Value, larger, white
└──────────────────────────┘
```

**Cards:**
1. Capital (icon: pin/marker)
2. Population (icon: people)
3. Area (icon: expand)
4. Languages (icon: chat bubbles)

**Interaction:**
- Hover: lift 4px, brass border glow
- Click: expand with additional context (e.g., population → urban vs rural split)
- Stagger animation on scroll-in (GSAP)

**Style:**
- Background: `--surface` with subtle gradient
- Border: 1px `rgba(255,255,255,0.1)`
- Border-radius: 12px
- Padding: 24px
- Transition: `transform 0.3s ease, box-shadow 0.3s ease`

---

### Section 3: Cultural Identity

**Layout:** Two-column (1-col mobile)

**Left column:**
```
[Eyebrow] Culture & Heritage

[Heading] A brief cultural context  [No generic H2]

[2-3 short paragraphs]             [Max 50ch per line]
Minimal prose, focus on distinctive
traits, not encyclopedia copy.
```

**Right column:**
- Visual element: abstract pattern or texture inspired by country
- Could be: geometric pattern, color palette swatch, iconography
- **Not** a photo (avoid stock image trap)
- **Not** a stereotype

**Alternative layout:** Single column with **inline visual accents**
- Brass divider lines
- Pull quotes styled as large serif text
- Avoid wall-of-text

**Style:**
- Heading: serif, `--brass`, 32px
- Body: sans-serif, `--ink`, 16px, line-height 1.6
- Visual accent: brass border-left 4px, or radial gradient overlay

---

### Section 4: Language Discovery

**Layout:** Centered content block, max 800px width

**Structure:**
```
[Eyebrow] Languages

[Primary language chip]            [Large, brass border]
Malay (Bahasa Melayu)

[Secondary languages]              [Smaller chips, muted border]
English · Mandarin · Tamil

[Interactive phrase explorer]
┌────────────────────────────────┐
│ Hello                          │  ← Click to hear/expand
│ Apa khabar?                    │
├────────────────────────────────┤
│ Thank you                      │
│ Terima kasih                   │
└────────────────────────────────┘
```

**Phrase explorer:**
- 4-6 common phrases
- Click: reveal romanization, cultural context (1 sentence)
- Hover: brass underline animation
- If audio exists: play button (defer to future)
- If no phrases available: hide section entirely

**Style:**
- Language chips: `display: inline-flex`, padding 8px 16px, border-radius 999px
- Primary chip: border `2px solid var(--brass)`, background `rgba(231,190,124,0.1)`
- Phrase cards: similar to fact cards, but taller, serif font for non-Latin script

---

### Section 5: Regional Context

**Layout:** Grid of related country cards (3-col desktop, 2-col tablet, 1-col mobile)

**Card anatomy:**
```
┌──────────────────────┐
│                      │  ← Hover: brass border glow
│  [Mini 3D preview]   │  ← Small isolated geometry or flat shape
│                      │
│  Singapore           │  ← Country name
│  SG · Asia           │  ← Code + region, muted
└──────────────────────┘
```

**Content:**
- Show 6 related countries (neighbors or same subregion)
- Click card → navigate to that country's detail page
- Smooth transition (fade out, route, fade in)

**Mini 3D preview options:**
1. **Best:** Tiny isolated geometry (100×100px canvas)
2. **Fallback:** Flat country shape silhouette (SVG path from geometry)
3. **Minimal:** Alpha2 code styled as flag placeholder

**Interaction:**
- Hover: card lifts 8px, brass border appears
- Focus: brass outline for keyboard nav
- Click: navigate with history.push

**Style:**
- Card: `--surface` background, border-radius 12px, padding 16px
- Mini preview: 100×100px, centered
- Name: 18px, white
- Metadata: 14px, muted

---

### Section 6: Expedition Gateway

**Conditional rendering:**
- **If expeditions exist for this country:** Show CTA card
- **If no expeditions:** Show honest empty state

**CTA card (if expeditions exist):**
```
┌────────────────────────────────────────┐
│                                        │
│  Ready to explore?                     │  ← Heading
│                                        │
│  [n] expeditions available in Malaysia │  ← Count, muted
│                                        │
│  [View expeditions →]                  │  ← Brass button, prominent
│                                        │
└────────────────────────────────────────┘
```

**Empty state (if no expeditions):**
```
┌────────────────────────────────────────┐
│                                        │
│  No expeditions yet                    │
│                                        │
│  We're working on learning content     │
│  for this country. Check back soon.    │
│                                        │
│  [← Back to Atlas]                     │  ← Secondary button
│                                        │
└────────────────────────────────────────┘
```

**Route:**
- CTA → `/dashboard?country=MY` (future)
- For now → `/dashboard` with "Coming soon" message
- Or → modal overlay: "Expeditions feature launching soon"

**Style:**
- Card: centered, max 600px width, large padding (48px)
- Background: `--surface` with brass border-top 2px
- Button: brass background, dark text, 48px height, rounded

---

## Landing Page Enhancement

**Goal:** Add **one subtle hint** to dashboard feature, without cluttering current clean layout.

### Proposed Addition: Footer Section

**Before footer, add new section:**

```html
<section id="learning-preview" class="landing-section page-width">
  <div class="section-intro">
    <p class="eyebrow">Beyond exploration</p>
    <h2>Learn through expeditions</h2>
  </div>
  <p>
    Country entries introduce places. Expeditions let you step inside them.
    Coming soon: interactive missions, cultural scenarios, and language practice.
  </p>
  <a href="/dashboard" class="quiet-link">
    Preview the dashboard <span aria-hidden="true">→</span>
  </a>
</section>
```

**Visual:**
- Same styling as other landing sections
- Minimal, one paragraph
- Quiet link (not prominent CTA)
- Sits above footer

**Alternative:** Add to existing "About" section as paragraph + link.

**Do NOT:**
- Add dashboard nav to header (too early, no content yet)
- Show quest/exp/level on landing
- Create separate "Features" section

---

## Dashboard Blueprint (Future — JOB-03+)

**Not in scope for JOB-02**, but documented for consistency.

### Route
`/dashboard`

### Layout
```
┌─────────────────────────────────────────────────────┐
│ Header: [Logo] [Explore] [Dashboard] [Community]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Welcome back, [Guest]              [Lv 1] [50 EXP] │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Available Expeditions                       │   │
│ │                                             │   │
│ │ [Yogyakarta card] [Kyoto card] [...]       │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Your Progress                               │   │
│ │                                             │   │
│ │ [Exp bar] [Achievements] [Passport]        │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Features
1. **Expedition cards** — available missions per country
2. **Progress tracking** — exp, level, achievements
3. **Passport** — completed missions, collected phrases
4. **Practice queue** — spaced repetition
5. **Community** (future) — leaderboard, shared achievements

### Entry points
- Direct nav: header link "Dashboard"
- From country detail: "View expeditions" CTA
- From landing: footer section link

### Visual consistency
- Reuse Night Atlas theme
- Same header/footer as landing/country pages
- Brass accents for completed items
- Dark cards for expedition/progress blocks

---

## Design System Rules

### Night Atlas Theme (Existing)

**Colors:**
```css
--night: #0b1523          /* Deep blue-black background */
--surface: #19334a        /* Elevated surface */
--brass: #e7be7c          /* Highlight, selection, CTA */
--sea: #a0c9d2            /* Country polygons, muted accent */
--ink: #f8f9fa            /* Primary text */
--muted: rgba(248,249,250,0.6)  /* Secondary text */
```

**Typography:**
```css
--font-serif: Georgia, 'Times New Roman', serif
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui

Headings: serif, --brass
Body: sans-serif, --ink
Labels: sans-serif, --muted, uppercase, letter-spacing 0.1em
```

**Spacing:**
```css
--space-xs: 8px
--space-sm: 16px
--space-md: 24px
--space-lg: 48px
--space-xl: 96px
```

**Borders:**
```css
border-radius: 12px (cards, buttons)
border: 1px solid rgba(255,255,255,0.1)
```

### Animation Principles

**Timing:**
- Fast: 200ms (hover, focus)
- Medium: 300ms (transitions, cards)
- Slow: 600ms (page enter/exit, scroll reveals)

**Easing:**
- `ease-out` for entrances
- `ease-in-out` for state changes
- Custom cubic-bezier for spring effects

**GSAP scroll triggers:**
- Stagger animations for card grids (0.1s delay between items)
- Fade + slide up for sections
- Parallax for hero 3D element (subtle, 0.2x scroll speed)

**Interaction states:**
- Hover: lift + glow (`transform: translateY(-4px)`, `box-shadow`)
- Active: slight press (`transform: scale(0.98)`)
- Focus: brass outline 2px

### Accessibility

**Keyboard:**
- All interactive elements focusable
- Visible focus state (brass outline)
- Skip links present
- Logical tab order

**Screen readers:**
- Semantic HTML (`<section>`, `<article>`, `<nav>`)
- `aria-label` on interactive elements
- `aria-live` for dynamic content
- Alt text for 3D visualizations: "3D visualization of [Country]"

**Reduced motion:**
- Respect `prefers-reduced-motion`
- Disable auto-rotation, parallax
- Use fade instead of complex animations

---

## Component Specifications

### 1. CountryHero Component

**Props:**
```typescript
interface CountryHeroProps {
  country: Country
  locale: Locale
}
```

**Renders:**
- Left content block (name, region, intro)
- Right 3D canvas (isolated country geometry)
- Background gradient + noise texture

**3D implementation:**
```typescript
// Reuse three-globe extraction
const geometry = extractCountryGeometry(country.alpha2)
const mesh = new Mesh(geometry, brassMaterial)

// Camera setup
camera.position.set(0, 0, 200)
camera.lookAt(0, 0, 0)

// Auto-rotation
useFrame(() => {
  if (!paused) mesh.rotation.y += 0.001
})
```

**State:**
- `paused` — hover pauses rotation

**File:** `src/features/country/components/CountryHero.tsx`

---

### 2. FactCard Component

**Props:**
```typescript
interface FactCardProps {
  icon: ReactNode
  label: string
  value: string
  detail?: string  // Optional expanded content
}
```

**Renders:**
- Icon (brass accent)
- Label (uppercase, muted)
- Value (large, white)
- Optional detail (shown on click)

**Interaction:**
- Click toggles expanded state
- Hover lifts card

**File:** `src/features/country/components/FactCard.tsx`

---

### 3. LanguageExplorer Component

**Props:**
```typescript
interface LanguageExplorerProps {
  official: string[]
  widelySpoken?: string[]
  phrases?: Phrase[]  // {en, translation, note}
}
```

**Renders:**
- Language chips (primary + secondary)
- Phrase cards (if available)
- Empty state if no phrases

**Interaction:**
- Click phrase card → reveal note
- Hover → brass underline

**File:** `src/features/country/components/LanguageExplorer.tsx`

---

### 4. RelatedCountryCard Component

**Props:**
```typescript
interface RelatedCountryCardProps {
  country: Country
  locale: Locale
  onClick: () => void
}
```

**Renders:**
- Mini 3D preview or flat shape
- Country name
- Code + region

**Interaction:**
- Click navigates to country detail
- Hover lifts + brass border

**File:** `src/features/country/components/RelatedCountryCard.tsx`

---

### 5. ExpeditionGateway Component

**Props:**
```typescript
interface ExpeditionGatewayProps {
  country: Country
  hasExpeditions: boolean
  expeditionCount?: number
}
```

**Renders:**
- CTA card if expeditions exist
- Empty state if none

**Interaction:**
- Button routes to `/dashboard?country=${code}`

**File:** `src/features/country/components/ExpeditionGateway.tsx`

---

## Technical Implementation Notes

### Data Requirements

**Existing (from manifest.json + country-details.ts):**
- ✓ Country name (EN/ID)
- ✓ Alpha2 code
- ✓ Region/subregion
- ✓ Capital
- ✓ Population
- ✓ Area
- ✓ Languages (official, widely spoken)
- ✓ Culture text
- ✓ Borders (for related countries)

**New fields needed:**
- `intro` (1-line country intro for hero) — add to country-details.ts
- `phrases` (optional array of common phrases) — add if available
- `expeditions` (array of expedition IDs) — placeholder for future

**Schema extension:**
```typescript
interface CountryDetail {
  // ... existing fields
  intro?: string  // Hero one-liner
  phrases?: Array<{
    en: string
    translation: string
    note?: string
  }>
  expeditions?: string[]  // Expedition IDs
}
```

### 3D Country Extraction

**Current globe has `__atlasProject` method** (line 12, Renderer.tsx) that projects country vertices.

**For isolated rendering:**
1. Extract geometry from topology
2. Filter to selected country ID
3. Create buffer geometry from vertices
4. Render in separate Canvas
5. Apply brass material + glow

**Performance:**
- Extract once on mount
- Cache geometry
- Reuse for all country detail pages

**Fallback:**
- If extraction fails → show flat SVG silhouette
- If WebGL unavailable → hide 3D, show larger text hero

### Routing Updates

**Add navigation from CountryPreview:**
```tsx
// In CountryPreview.tsx
<button onClick={() => navigate(`/country/${alpha2.toLowerCase()}`)}>
  View details →
</button>
```

**Update Router.tsx:**
```tsx
// Already exists:
<Route path="/country/:alpha2" element={<CountryDetail />} />

// Add future:
<Route path="/dashboard" element={<Dashboard />} />
```

### Animation Implementation

**Scroll triggers (GSAP):**
```typescript
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('.fact-card', {
    scrollTrigger: {
      trigger: '.facts-grid',
      start: 'top 80%'
    },
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  })
}, [])
```

**Hover states (CSS):**
```css
.fact-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.fact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(231,190,124,0.2);
}
```

### Responsive Breakpoints

**Desktop:** 1200px+  
**Tablet:** 768px - 1199px  
**Mobile:** < 768px

**Hero section:**
- Desktop: 40/60 split (content/3D)
- Tablet: 50/50 split
- Mobile: stacked (content top, 3D bottom, smaller)

**Fact cards:**
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column

**Related countries:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

---

## Success Metrics

**Visual quality:**
- [ ] Country hero has 3D visualization
- [ ] All sections use brass accents consistently
- [ ] Hover states work on all interactive elements
- [ ] Scroll animations trigger correctly
- [ ] Mobile layout doesn't break

**Functionality:**
- [ ] Back to atlas button navigates correctly
- [ ] Related country cards navigate to detail pages
- [ ] Expedition CTA routes to dashboard (or shows "coming soon")
- [ ] Empty states display when data missing
- [ ] Keyboard navigation works through all sections

**Performance:**
- [ ] Page loads < 2s on desktop
- [ ] 3D extraction doesn't block render
- [ ] Smooth 60fps scroll
- [ ] No console errors

**Accessibility:**
- [ ] Semantic HTML structure
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader announces section changes
- [ ] Reduced motion respected

**Content:**
- [ ] Intro text for 5+ countries
- [ ] Phrases for 2+ countries
- [ ] Related countries show correct neighbors
- [ ] Expedition gateway shows correct state

---

## Implementation Phases

### Phase 1: Structure (1-2 hours)
- Create new CountryDetail component
- Split into 6 sections
- Wire up data from country-details.ts
- Basic layout (no styling yet)

### Phase 2: Hero + 3D (2-3 hours)
- Build CountryHero component
- Extract country geometry from globe
- Render isolated 3D visualization
- Add auto-rotation + hover pause

### Phase 3: Fact Cards (1 hour)
- Build FactCard component
- Create 4-card grid
- Add hover/click interactions
- Stagger animations

### Phase 4: Cultural + Language (1-2 hours)
- Style culture section (2-col or inline accents)
- Build LanguageExplorer component
- Add phrase cards (if data available)

### Phase 5: Related Countries (1 hour)
- Build RelatedCountryCard component
- Create grid layout
- Add navigation

### Phase 6: Expedition Gateway (30 min)
- Build conditional CTA
- Add empty state
- Wire routing

### Phase 7: Polish (1-2 hours)
- Scroll animations (GSAP)
- Responsive breakpoints
- Reduced motion
- Keyboard nav
- Test all interactions

**Total estimate:** 8-12 hours

---

## Files to Create/Modify

### New Files

**Components:**
```
src/features/country/
├── components/
│   ├── CountryHero.tsx
│   ├── FactCard.tsx
│   ├── LanguageExplorer.tsx
│   ├── RelatedCountryCard.tsx
│   └── ExpeditionGateway.tsx
├── hooks/
│   └── useCountryGeometry.ts
└── utils/
    └── extractGeometry.ts
```

**Styles:**
```
src/styles/
└── country-detail.css  (complete rewrite)
```

**Data:**
```
src/features/atlas/data/
└── country-details.ts  (extend schema)
```

### Modified Files

**Landing:**
```
src/app/Landing.tsx              (add footer section)
src/sections/LandingSections.tsx (or extend About section)
```

**Atlas:**
```
src/features/atlas/harness/CountryPreview.tsx  (add "View details" button)
```

**Router:**
```
src/app/Router.tsx  (add /dashboard placeholder route)
```

---

## Approval Checklist

Before proceeding with implementation:

- [ ] Hero layout approved (40/60 split, 3D visualization)
- [ ] Fact card design approved (icon + value + optional detail)
- [ ] Language explorer design approved (chips + phrase cards)
- [ ] Related countries design approved (mini 3D or flat shape)
- [ ] Expedition gateway approach approved (CTA vs empty state)
- [ ] Landing page enhancement approved (footer section vs About extension)
- [ ] Information architecture approved (3-layer separation)
- [ ] Component file structure approved

**Sign-off required before coding.**

---

## Open Questions

1. **Intro text:** Write new 1-line intros for all countries, or start with 5-10 priority countries?
2. **Phrases:** Add phrase data for how many countries initially? (Suggest: Indonesia, Japan to start)
3. **Mini 3D previews:** Full 3D extraction for related countries, or flat SVG shapes? (Performance trade-off)
4. **Dashboard route:** Show "Coming soon" modal, or redirect to landing with message?
5. **Empty states:** Hide missing sections entirely, or show "Data coming soon" placeholder?

**Recommendations:**
1. Start with 10 countries (ASEAN + popular destinations)
2. Phrases for Indonesia + Japan only (2 countries)
3. Flat SVG shapes for related countries (performance)
4. Modal overlay "Expeditions launching soon"
5. Hide sections if data missing (cleaner UX)

---

## Next Steps After Approval

1. Extend `country-details.ts` schema (add `intro`, `phrases`, `expeditions`)
2. Write intro text for 10 priority countries
3. Create phrase data for Indonesia + Japan
4. Build CountryHero component with 3D extraction
5. Implement remaining components
6. Style with Night Atlas theme
7. Add GSAP scroll animations
8. Test responsive + accessibility
9. Deploy + verify

**Estimated completion:** 2-3 days full-time work.

---

**END OF PROPOSAL**
