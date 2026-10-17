# Lingua Quest Landing Page — Validated Design Specification

**Date:** 2026-10-17  
**Direction:** Atlas Lapangan  
**Status:** Approved for implementation

## 1. Scope

Build one Indonesian-first, bilingual landing page for Lingua Quest using plain HTML, CSS, and JavaScript. The page introduces the product and lets visitors complete a short, deterministic language-learning demo without leaving `/`.

### Included

- Responsive landing page and in-page navigation.
- Indonesian and English UI copy, selected through a text language control.
- Embedded 60–90 second mission demo.
- One Yogyakarta atlas/diorama visual, with an HTML/2D equivalent.
- Reduced-motion, keyboard, screen-reader, low-bandwidth, and WebGL-failure paths.

### Excluded

- Product routes, accounts, forms, analytics, backend, saved progress, real chatbot/AI, globe, full expedition engine, and production audio recording workflow.
- Testimonials, usage statistics, or learning claims without evidence.
- React, Vue, or another UI framework.

## 2. Experience Principles

1. **Situation before features:** show language being used in context.
2. **Atlas, not SaaS:** editorial map composition, route lines, coordinates, and one purposeful diorama; no gradient blobs, glass cards, fake logos, or generic feature-card grids.
3. **Action with recovery:** every demo choice receives useful feedback and a clear next action; no punitive failure state.
4. **3D is enhancement:** all content and demo logic remain usable without WebGL.
5. **Indonesian guides, English practice:** instructions default to Indonesian; exercise dialogue is English with transcript and optional meaning.

## 3. Page Structure

Use semantic landmarks and these in-page targets:

1. **Header**
   - Wordmark; links to `#cara-belajar`, `#destinasi`, and `#aksesibilitas`.
   - `Bahasa: ID / EN` text control; no flags.
   - Compact `Coba demo` action targeting `#demo`.

2. **Hero / briefing**
   - Eyebrow: `GLOBAL YOUTH EXCHANGE • MISI 01`.
   - Heading: `Bahasa terasa nyata saat kamu punya tujuan.`
   - Supporting copy: `Jelajahi kota, dengarkan orang, dan pilih respons yang mengubah jalannya misi—dalam bahasa Inggris, dengan panduan Indonesia.`
   - Primary CTA: `Coba misi 60 detik`.
   - Secondary CTA: `Lihat cara kerjanya`, targeting `#cara-belajar`.
   - Trust line: `Tanpa akun • Audio opsional • ±60 detik`.
   - Right side: Yogyakarta diorama/poster with one active mission annotation.

3. **Embedded demo (`#demo`)**
   - Slightly overlaps the hero boundary on desktop; remains in normal document flow.
   - Contains mission progress, diorama/poster, NPC dialogue, transcript/audio controls, response choices, feedback, and completion stamp.

4. **How learning works (`#cara-belajar`)**
   - Route sequence: `Amati → Pahami → Pilih → Lihat dampak`.
   - Present as one connected itinerary, not four equal feature cards.

5. **Destinations (`#destinasi`)**
   - Large asymmetric atlas fields for Yogyakarta and Kyoto.
   - Yogyakarta is the featured expedition; Kyoto is the next route.
   - Label both as illustrative learning environments, not real-world navigation maps.

6. **Learning passport**
   - Show a sample destination stamp, practiced phrase, and reflection: `Saya dapat meminta informasi diulang.`
   - Do not add streaks, leaderboards, certificates, or proficiency claims.

7. **Light mode and accessibility (`#aksesibilitas`)**
   - Navy information band with a compact HTML-mode preview.
   - State that the core demo remains available without 3D or audio.

8. **Closing CTA and footer**
   - CTA repeats `Coba misi 60 detik`; after completion it becomes `Ulangi demo`.
   - Footer links only to valid in-page sections and source/attribution information. Do not imply unavailable product routes.

## 4. Hero and Motion Composition

- Desktop grid: 12 columns; copy uses 5 and visual uses 7. The diorama may break the container edge but must not cause horizontal overflow.
- A thin teal route line connects the hero annotation to the demo and subsequent itinerary.
- Initial reveal: eyebrow, heading, copy, actions, then visual at 100–140 ms intervals. Draw the route line once after content appears.
- The scene never spins or pans continuously. A single camera/scene response may occur after a demo choice.
- With `prefers-reduced-motion: reduce`, reveal all content immediately, remove route drawing and camera movement, and retain textual feedback.
- GSAP is optional; CSS transitions are preferred when sufficient. Content must not depend on animation completion.

## 5. Demo State Flow

The demo is a finite state machine; visual rendering must not control its logic.

| State | Required content and transition |
|---|---|
| `idle` | Mission card: `Misi kilat 01 — Kenali rekan timmu`; `Mulai percakapan` → `briefing`. |
| `briefing` | Goal and short instruction; `Temui Hana` → `dialogue`. Focus moves to the dialogue heading. |
| `dialogue` | English line: “Hi, I’m Hana. I’m from Kyoto, and I love sketching city streets.” Show transcript and `Lihat arti`; audio is optional and starts only from its button. `Pilih respons` → `choice`. |
| `choice` | Three keyboard-selectable responses. Submission → `feedback`. Do not use color as the only result signal. |
| `feedback` | Show category, rationale, and NPC response. A relevant choice can continue directly. Other choices offer `Coba respons lain` → `choice` and `Lanjutkan dengan bantuan` → reveal the relevant response, then `complete`. |
| `complete` | One restrained scene reaction, passport stamp, and practiced skill. Offer `Coba respons lain` → `choice` and `Ulangi demo` → `idle`. |

Suggested choices:

- `Do you like drawing old buildings?` — relevant follow-up.
- `What time is lunch?` — understandable but disconnected.
- `Okay.` — acceptable acknowledgement but does not continue the exchange.

Rules:

- No score, timer, dead end, random output, simulated human, or free-text chatbot input.
- Use a polite live region for feedback; do not move focus unexpectedly after a choice.
- Hero/header CTA scrolls to `#demo`, focuses its heading, and enters `briefing`; it must not start audio.
- Language changes preserve the current demo state and selected choice.
- State is page-session only; refresh may return to `idle`.

## 6. Visual System

### Color tokens

| Role | Value | Use |
|---|---|---|
| Canvas | `#F6F3EC` | Main page background |
| Ink | `#17263C` | Text, rules, dark sections |
| Primary | `#147D80` | Main actions, active route |
| Primary hover | `#0F6668` | Hover/pressed actions |
| Accent | `#E7A447` | Stamps and small highlights; pair with Ink |
| Surface | `#FFFFFF` | Demo and information panels |

Verify every final text/background combination. Amber is not body text on cream. Focus treatment uses a 2 px Ink outline plus a 3 px cream/white offset appropriate to the surface.

### Typography

- Display: **Literata**, 600–700.
- Body/UI: **Outfit**, 400–600.
- Self-host WOFF2 files when implementation assets are prepared; use `Georgia, serif` and system sans-serif fallbacks.
- Fluid hero title: approximately 44–76 px; body: 16–18 px; minimum helper text: 14 px.
- Avoid all-caps paragraphs; reserve tracked uppercase for short atlas labels.

### Shape, depth, and spacing

- Content width: 1200–1280 px with 24–32 px desktop gutters.
- Spacing follows an 8 px base scale. Section spacing: 96–144 px desktop, 64–88 px mobile.
- Panels use 12–16 px corners; chips/status labels may be pill-shaped. Do not make every control a pill.
- Use 1 px map rules, restrained navy-tinted shadows, and a low-opacity SVG/CSS paper grain. Decorative texture must be `aria-hidden` and pointer-inert.

## 7. Responsive Rules

- **≥1024 px:** hero 5/7 columns; demo stage approximately 60% visual and 40% dialogue panel.
- **768–1023 px:** hero may remain split if copy fits; demo becomes approximately 55/45.
- **<768 px:** one column; visual/poster above the panel, linear route, no overlap that obscures text. Header navigation may collapse into an accessible disclosure.
- Mobile dialogue panels remain in document flow; no fixed bottom sheet.
- Minimum control target is 44×44 px with at least 8 px separation.
- No horizontal scrolling at 320 px width or at 200% zoom. Content and controls remain operable at 400% zoom.
- If Three.js is used, cap device pixel ratio and avoid active rendering when the scene is off-screen or the tab is hidden.

## 8. Accessibility Requirements

- Semantic header, nav, main, sections, headings, buttons, fieldset/legend for choices, and footer.
- Visible skip link and focus states; logical keyboard order.
- Canvas is `aria-hidden="true"`; equivalent mission context and state are present in HTML.
- Instructions never depend on audio, color, hover, movement, or spatial position alone.
- Audio has play/pause state, transcript, and Indonesian meaning; no autoplay.
- Important status changes use text plus icon/label and a polite live region.
- UI strings and dialogue use correct `lang="id"` or `lang="en"` attributes.
- Allow 30–40% translation expansion without clipping.
- Respect `prefers-reduced-motion` and `prefers-reduced-data` where supported.

## 9. Asset Strategy

Required final assets:

- SVG wordmark and compass/speech symbol.
- One modular low-poly Yogyakarta scene, two simple NPCs, and at most one short gesture animation.
- AVIF/WebP poster of the same composition and descriptive alt text.
- SVG destination pins, route marks, passport stamps, audio/transcript/help icons, topographic pattern, and grain.
- One short English audio line matching the visible transcript.
- Font WOFF2 files and an asset license/attribution record.

Three.js is worthwhile only for the single progressive-enhancement scene. Lazy-load it after the poster is visible or the user starts the demo. Target the compressed model and textures at **≤1.5 MB**. Do not add a globe or decorative 3D elsewhere.

Do not ship AI-generated imagery as the main visual. It may inform an internal moodboard only. Prefer an original low-poly model or a custom isometric SVG/poster for consistency, cultural review, and clear licensing.

## 10. Error and Fallback Behavior

- **JavaScript unavailable:** all marketing content remains readable; a `<noscript>` block presents the complete sample dialogue, three responses, explanatory feedback, and learning outcome.
- **WebGL/model failure or reduced-data preference:** keep the poster and HTML demo; show `Tampilan ringan aktif` without an alarming error.
- **Audio failure:** retain transcript and meaning; show `Audio belum dapat diputar. Kamu tetap bisa melanjutkan melalui transkrip.`
- **Font failure:** fallback fonts preserve hierarchy and do not hide content.
- **Animation/GSAP failure:** page and state changes remain immediate and usable.
- **Language-storage failure:** switch the current page in memory; do not block the control or demo.
- Never replace the whole section with an error. Recovery actions stay next to the affected feature.

## 11. Implementation Boundaries

- Expected implementation files later: `index.html`, one stylesheet, one JavaScript entry, and an `assets/` directory. This specification does not create them.
- Plain HTML/CSS/JavaScript only. Three.js and GSAP are optional; neither may own content, routing, or demo state.
- Use CSS custom properties for tokens and small data objects for ID/EN strings and demo feedback.
- Keep one route (`/`) and hash navigation. No client-side router.
- No modal for the main demo, no autoplay media, no required drag gesture, and no hover-only action.
- Avoid external runtime services. Any CDN dependency must have a local/versioned production plan and documented license.
- Cultural statements, character details, and place representations require review before public claims; characters represent individuals, not national traits.

## 12. Verification Criteria

Implementation is acceptable when:

- All header and CTA links reach valid in-page targets; no placeholder links or dead product routes exist.
- The complete demo works with mouse, touch, and keyboard in both languages, including retry, assisted recovery, completion, and reset.
- Audio never starts without user action; transcript and meaning remain available during audio failure.
- Disabling JavaScript or WebGL still leaves a coherent explanation and equivalent sample interaction.
- Automated accessibility checks report no serious/critical issues; manual checks confirm skip link, focus order, live feedback, labels, reduced motion, and 200–400% zoom.
- Final color pairs meet WCAG 2.2 AA.
- Visual checks pass at 390×844, 768×1024, and 1440×900, plus 320 px width without horizontal overflow.
- Current Chromium, Firefox, and Safari/WebKit support the core flow.
- Representative mobile targets: LCP <2.5 s, CLS <0.1, and INP <200 ms; the poster is the LCP candidate and 3D is lazy-loaded.
- The shipped 3D package is ≤1.5 MB compressed, pauses off-screen, and can be removed without breaking demo logic.
- Every font, model, image, icon, and audio file has source/license documentation.
- Page copy makes no unsupported product availability, proficiency, certification, or user-count claim.

## 13. Specification Review

- No unresolved placeholders or “TBD” decisions remain.
- The embedded demo, bilingual behavior, 3D fallback, and CTA behavior have one consistent definition.
- Scope is limited to the landing page; future product routes and systems are explicitly excluded.
- Validation belongs to the parent session through review of this artifact and later implementation inspection.
