# relax & froach Design System

Design system for **relax & froach Gesundheitsmanagement** — a German corporate-health-management company. Their product mix includes workplace wellbeing programs, movement & relaxation content, stress-management services, and related apps/websites targeting three segments: **Schulen** (schools), **Organisation** (organizations / corporate), and **Pflege** (care / seniors).

Website: [www.froach.de](https://www.froach.de)

> **Hinweis für Agents:** Nutze ausschließlich den **Branding Guide „New" / „2023"**. Ältere Guides (2020-2022, First-Sketch) sind im Projekt erhalten, aber **nicht** als Referenz verwenden.

---

## What's in this folder

| File / folder | What it is |
|---|---|
| `colors_and_type.css` | All design tokens — colors, type scale, radii, shadows, spacing, motion. Import this in any HTML file. |
| `assets/logos/` | Logo PNG, hand-symbol SVGs (with green leaf), ampersand SVG, Logo.jsx React component. |
| `assets/images/` | Brand photography references, hero backgrounds, visual references from the 2023 Branding Guide. |
| `assets/mascot/` | **Froach 3D-Maskottchen** — 54 Szenen (mit Requisiten) in `scenes/`, 49 freigestellte Posen in `poses/`. |
| `assets/illustrations/` | Sub-brand illustrations: `colorful-hands.png` (froachkids hero), `grass-path-watering.png` (growth/care motif). |
| `assets/icons/` | 138 froach icons in `froach/` subfolder. |
| `preview/` | Small HTML cards rendered in the Design System tab. |
| `ui_kits/` | High-fidelity UI recreations (marketing site / app). |
| `_ds_bundle.js` | Compiled bundle of the exported React components (auto-generated — never edit by hand). |

## Exported React components

The design system ships **10 React components**, compiled into `_ds_bundle.js` and exposed on `window.RelaxFroachDesignSystem_044c8b`. Load the bundle (React must be a global first), then destructure:

```html
<script src=".../_ds_bundle.js"></script>
<script type="text/babel">
  const { Logo, TopNav, Hero } = window.RelaxFroachDesignSystem_044c8b;
</script>
```

| Component | Source | Notes |
|---|---|---|
| `Logo`, `LogoMark`, `LogoCircle` | `assets/logos/Logo.jsx` | Wordmark / hand-mark / circle badge. Pass `assetPath` so the PNG/SVG paths resolve relative to your page. |
| `Icon` | `ui_kits/marketing/Components.jsx` | Mask-tinted froach icon by `name`. |
| `TopNav`, `Hero`, `SegmentCards`, `Features`, `Footer` | `ui_kits/marketing/Components.jsx` | Marketing-site sections. |
| `Components` | `ui_kits/marketing/Components.jsx` | The full above-the-fold marketing page composed from the sections above. |
| `SKILL.md` | Agent-skill manifest so this can be used standalone. |

## Sources used

- **Branding Guide.fig** — page `/Branding-Guide-New` — **primary source** for all tokens and rules. Title page, color palette, logo usage, safety space, typography, photography treatment.
- **Branding Colors.fig** — *not accessible in this environment*; palette values were taken from Branding Guide New which contains the same hex codes.
- **Logos and communication.fig** — source for hand symbol with green leaf, sub-brand lockups, and Imalogo. Hand SVGs extracted with both paths (hand + leaf) into `assets/logos/`.
- **Icons Library.fig** — outlined froach icon set (138 icons across Action / BasicApp / Body / Com / Misc / Sign categories), all copied into `assets/icons/froach/`. See ICONOGRAPHY section.

---

## BRAND CONTEXT

**What the company does.** relax & froach design Gesundheitsmanagement-Programme ("health management programs") for three contexts: schools (Bewegungs- und Entspannungspausen during lessons), organizations (conscious pauses inside working hours to support a healthy culture), and care/elderly (age-specific movement, cognition, and coordination training). The "relax" half signals pause, calm, and stress relief; the "froach" half is a coined, playful mark with a green-lime spark on the hand symbol.

**Tone.** German-language, warm and professional, matter-of-fact. Not corporate-boilerplate, not YOLO-startup. Headlines state the benefit plainly ("*Wachstum durch weitere Zielgruppen*"); body copy is specific and clinical-adjacent without being cold. Handwritten Caveat-style accents ("*Erfolgreich am Markt*", "*Pilotierung mit GKV erfolgreich abgeschlossen*") add a human, crafted layer over otherwise clean typography.

**Visual DNA.**
- Stylized blue hand (5 rounded lobes) with a lime-green leaf/dot on the thumb
- Deep navy as primary surface, bright lime green as the spark
- **Arch-shaped** photo cards (rainbow / bell curve) with dark-blue overlays — the single most distinctive compositional motif
- Montserrat everywhere for UI type; Caveat for handwritten accents
- Clean whitespace, never cluttered

---

## CONTENT FUNDAMENTALS

**Language.** German (Du/Sie depends on context — corporate decks use formal Sie, in-app wellbeing prompts can go Du). Always typographically correct German: „Anführungszeichen", en-dashes –, correct umlauts.

**Voice.** Professional-warm. Three moves show up a lot:

1. **Benefit-first headlines.** "Wachstum durch weitere Zielgruppen." "Mit froach als lebenslangem Begleiter." Nominal-style, confident, no hedging.
2. **Segment-as-label.** Single-word category labels own the color: Schulen (mustard-yellow), Organisation (bittersweet coral), Pflege (froach-green). The category IS the section header.
3. **Handwritten proof.** Status/credibility notes appear in Caveat script at the bottom of cards: "*Pilotierung mit GKV erfolgreich abgeschlossen*". Gives warmth and "signed by a human" energy.

**Casing.** Sentence case in running copy. `GESUNDHEITSMANAGEMENT` in the logo lockup is **tracked all-caps Montserrat Medium**. Tiny ALL-CAPS labels in UI (tracked +0.04em).

**Emoji.** Not used in brand materials. Don't introduce them. Use Lucide icons or the hand mark instead.

**Numbers/data.** The **Bittersweet** coral (`#FF735A`) is the designated color for numeric callouts and negatives. Don't use Light Green (`#BCF240`) in print / CMYK material; it doesn't hold up.

**Examples (from the Branding Guide):**
- Display: "relax & froach — Gesundheitsmanagement für jede Lebensphase."
- Section: "Wachstum durch weitere Zielgruppen"
- Lead: "Mit froach als lebenslangem Begleiter weitere wachsende Marktsegmente bespielen"
- Script accent: "Erfolgreich am Markt" / "Pilotierung mit GKV erfolgreich abgeschlossen"
- Segment labels: "Schulen" · "Organisation" · "Pflege"

---

## VISUAL FOUNDATIONS

### Colors
The palette is organized into three temperature bands, all blue-weighted:

- **Primary blues** — `#044894` Brand Blue (logo), `#053570` Dark Blue, `#001E41` Heavy Blue (deepest, for text on light & deep surfaces)
- **Relax blues** — `#0275F2` Relax Blue, `#43B3EF` Capri Blue (**links**, semibold+underline), `#A3DFFF` Iced Blue, `#E9F5FF` Iced Blue 50, `#F6FBFF` Iced Blue 25
- **Greens** — `#94CE0E` froach Green (the accent), `#BCF240` Light Green (RGB/screen only)
- **Warms** — `#FF735A` Bittersweet (errors, numeric callouts), `#FFC3B8` Soft Bittersweet, `#FAD26B` Mustard (highlights)
- **Neutrals** — `#FFFFFF` White, `#213E79` Dark Grey (it's actually blue-tinted), `#9DB6D2` Light Grau

**Rules:** Light Green never in CMYK. Links in Capri Blue, SemiBold, underlined.

### Typography
- **Montserrat** (300 / 400 / 500 / 600 / 700) — the workhorse, for display through micro
- **Caveat** — handwritten accents only, never for body copy
- The **wordmark** itself is a custom typeface (rounded terminals on the `r` and `a`). We don't ship it; use the logo PNG for the wordmark, not typeset text.

Montserrat **Light (300)** is heavier than you'd expect — pair it with Bold/SemiBold for contrast. Body copy is usually 16-18px.

### Layout & composition
- **Arch/rainbow cards.** Photo + dark-blue gradient overlay + rounded top (radius `50% 50% 0 0 / 30% 30% 0 0`). This is THE signature shape for segment callouts.
- **Generous whitespace.** Cards breathe.
- Grids of three (Schulen / Organisation / Pflege is the canonical triplet).
- Large left margins on hero pages (~85-130px at 1000px-wide design).

### Backgrounds
- **Deep-blue photo overlays**: `linear-gradient(rgba(0,57,124,0.8) 0%, rgba(0,30,65,0.8) 100%)` over editorial photography. Very consistent.
- **Iced-blue tinted flats** (`#F6FBFF`, `#E9F5FF`) for light app/doc surfaces.
- Solid `#053570` Dark Blue for slides and sections that want to punch.
- No gradients outside photo overlays. No noise/grain. No dotted/pattern backgrounds.

### Animation
Gentle. **Fades** and **soft eases** (`cubic-bezier(0.22, 0.61, 0.36, 1)`), 250ms default. No bounces, no parallax, no rubber-banding. Think "calm breathing" over "excited pop".

### Hover & press
- Hover: ~85% opacity OR one step darker (e.g. Brand Blue → Dark Blue).
- Press: slight scale `0.98` + color deepens.
- Links on hover: Capri Blue → Relax Blue.

### Borders, shadows, radii
- Radii: 4/8/**13**/17/pill. The 13px radius is used on the hero cards in the Branding Guide.
- Shadows are low-contrast, blue-tinted: `0 4px 17px rgba(1,51,78,0.10)`.
- Inner shadows: none typically. Use a 1px inset stroke at 8% brand blue for card edges if needed.
- **Protection gradients**: the logo on imagery gets a soft dark-blue overlay behind it (the photo-overlay linear gradient) rather than a capsule.

### Transparency & blur
- Transparency used primarily in the photo overlay gradient. Occasional `rgba(255,255,255,0.08)` chips on dark surfaces for secondary content. **No frosted-glass blur / backdrop-filter** in the guide.

### Imagery
- Warm, human, **candid-but-staged** editorial photography. People of all ages, often in working / school / care environments.
- Cool color grading (slightly blue-shifted), gentle contrast, never punchy-saturated.
- Always sits under the navy overlay in branded contexts. Un-overlaid imagery is OK inside inline content cards.

### Cards
- White background, 13px radius, soft blue-tinted shadow.
- Alternative: arch card with photo + overlay, segment-colored headline, white body.
- No colored left-border stripe patterns. No emoji cards.

---

## ICONOGRAPHY

**What we have.**
- The **hand symbol with green leaf** is the proprietary brand icon. Three SVG variants in `assets/logos/`:
  - `hand-blue.svg` — Brand Blue hand + froach Green leaf (on light backgrounds)
  - `hand-white.svg` — White hand + froach Green leaf (on dark/colored backgrounds)
  - `hand-canonical.svg` — currentColor hand + froach Green leaf (for CSS tinting)
  - The leaf is always `#94CE0E` froach Green in all variants.
- The **full froach Icons Library** is in `assets/icons/froach/` — **138 icons** across six categories:
  - **Action** (13) — cloud, delete (regular + bold), export, frame, fullscreen, reduce-screen, hd-video, link, review-zoom, warning-detail, zoom-in, zoom-out
  - **Basic App** (26) — app, app-play, bell, calendar, dynamic, eduhub, focus, goal, gun-sight, headset, home, incognito, location-pin, lock, logout, people, person, person-shield, phone, security-shield, settings, statistics, user-security, user-settings, volume, volume-bold
  - **Body & Movement** (25) — accident-stairs, active, arm-kid, back, backpain, balance, brain, brain-thinking (+kid), breath, child, eye, foot, guts, heartbeat, jump, leg, lying, meditation, neck, neck-shoulder, standing-strong, stretch, walk, wheelchair
  - **Faces** (5) — happy, smile, poker, sad, angry (mood scale)
  - **Communication** (24) — at-email, book, certificate, conversation, devices, doc-security, document, email, email-notification, email-reminder, file, file-check, file-security, folder, idea-chat, love-chat, newsletter, notes, pc, printer, resume, resume-security, smartphone-check, smile-chat
  - **Misc** (27) — balance, bright-star, calm, chair, coffee, cooperation, daycare, direction, drink-glass, education, energy, environment, ergonomic, fire, flag, heart, investor, koerperreise, payment-card, relaxation, shop, sponsor, sunrise, water, wind, world, world-question
  - **Sign & Navigation** (23) — check (filled + outlined), exit (+outlined), arrows (left/right/forward/rewind, short, double), pause, play (+outlined), play-queue, question, replay, update, update-warning, warning (regular, bold, outlined)
- All icons are **160×160** canvases. Strokes are normalized to `currentColor` — set `color:` on the parent to tint them, or use the `mask:` technique below for guaranteed color control.
- A few icons (e.g. `check.svg`) ship as multi-color compositions (Capri-blue circle + white check). Use `mask:` to recolor as a monochrome shape, or `<img>` to keep the original colors.

**Usage rules.**
- Outlined, not filled. 2px stroke at default sizes (16–24px). Color: `currentColor`, defaulting to Heavy Blue on light, White on dark.
- froach Green may tint icons only when used as an active state / selected indicator.
- **No emoji anywhere.** The design system treats emoji as off-brand.
- **Unicode arrows/chevrons** — OK in dense UI (›, →, ↗) but prefer Lucide where space allows.

**Using froach icons:**

The cleanest approach is `mask:` — works for any number of paths and gives full color control:
```css
.icon-heart {
  width: 24px; height: 24px;
  background: var(--rf-brand-blue);
  -webkit-mask: url(assets/icons/froach/heart.svg) center/contain no-repeat;
          mask: url(assets/icons/froach/heart.svg) center/contain no-repeat;
}
```

Or as inline `<img>` with the icon's own colors (use this when you want to keep multi-color icons like `check.svg` intact):
```html
<img src="assets/icons/froach/heart.svg" style="width:24px;height:24px" />
```

For React/JSX, inline the SVG — `currentColor` then follows the parent's `color:` automatically.

**Lucide as a fallback.** Only use Lucide if a needed concept isn't covered by the 138-icon set above; the froach library is now broad enough that this should be rare.

---

## MASCOT — "Froach"

The **Froach** is the proprietary 3D character mascot — a friendly green frog in a white tank-top and blue shorts. Used across decks, schul/kita materials, and exercise prompts. Two complementary sets live in `assets/mascot/`:

| Set | Folder | Count | Use for |
|---|---|---|---|
| **Poses** (freigestellt) | `assets/mascot/poses/` | 49 | Übungs-Karten, App-Onboarding, Schul-Materialien — mascot alone on transparent background |
| **Scenes** (mit Requisiten) | `assets/mascot/scenes/` | 54 | Master-Folien, Erklär-Slides — mascot in context (Schreibtisch, Stuhl, Ergonomie-Setting) |

**Naming.** Files are numbered after the original PowerPoint export (`pose-04.png` … `pose-63.png`, `scene-04.png` … `scene-63.png`). Numbers don't form a continuous range — some indices are skipped where the source deck had non-mascot images at that position. Many pose↔scene numbers share a pose (the scene version adds props); a few scene numbers are intentional duplicates from the source deck. Pick by visual content, not by number.

**Usage rules.**
- Mascot images are PNG with transparent background. **Never place on a dark navy field** — the green-on-blue contrast fights the brand palette. Use white, iced-blue (`#F6FBFF` / `#E9F5FF`), or mustard surfaces.
- The mascot is the **froachkids / care-with-kids** voice; in formal corporate decks (Organisation-Segment) prefer photography over the mascot.
- Don't recolor, mirror, or distort. Keep aspect ratio. The mascot has a "front-facing" canonical pose (`pose-04`) — use that for primary identity.
- Pair with **Caveat** handwritten accents for the warmest, kid-friendly tone.

## ILLUSTRATIONS — froachkids motifs

Two illustration assets live in `assets/illustrations/` for the **froachkids** sub-brand (Schulen, Kita). Cartoon-flat style — distinct from the editorial photography of the main brand.

| File | Motif | Use |
|---|---|---|
| `colorful-hands.png` | Hochgehaltene bunte Kinderhände in Marken-Farbtönen | Hero-Bilder Schul-Programme, Teilnahme-CTAs, Eltern-Kommunikation |
| `grass-path-watering.png` | Gewundener Grasweg, von Gießkanne bewässert — Symbol für Wachstum & Förderung | Preis-/Pakete-Seiten, „Wie es weitergeht"-Slides, Entwicklungs-Story |

**Usage rules.**
- froachkids-Kontext only. Don't mix with the formal Organisation/Pflege decks.
- Keep generous whitespace around them; both have soft edges that need air.
- The hands illustration already carries the full kids-palette (Capri / Green / Mustard / Bittersweet) — don't add competing colored backgrounds. White or `#F6FBFF` work best.

---

## Sub-brand system (from Logos and communication.fig)

There are **three sibling brands** sharing the `froach` wordmark and the leaf-in-"o" mark:

| Brand | Used for | Tagline color |
|---|---|---|
| **relax & froach** | Master / Gesundheitsmanagement | n/a — full lockup with paw-mark + “Gesundheitsmanagement” descriptor |
| **froachkids** | Schulen, Kinder, jüngere Zielgruppen | each letter a different brand color: Capri / Green / Mustard / Bittersweet |
| **froachcare** | Pflege, Care, Health-Pros | one solid color from a sanctioned set of 4 |

The `froach` stem is **always** Brand Blue (`#044894`). Only the tagline word and tagline color change.

### froachcare — 4 sanctioned dye variants

| Variant | Tagline color | Use |
|---|---|---|
| Dyed Green (default) | `#94CE0E` froach Green | Default — the canonical care lockup |
| Dyed Blue | `#43B3EF` Capri Blue | Light-touch, pediatric, soft contexts |
| Relax Blue | `#0275F2` Relax Blue | Digital, bright, screen-first |
| Mono | `#044894` Brand Blue | Mono printing, embossing, single-color contexts |

### Imalogo (image-mark) vs Wordmark

Two distinct marks live in the brand:

- **Imalogo** — circular blue badge with white frog-paw silhouette + green leaf. Use for app icons, social profile pictures, favicons, anywhere round/badge-like.
- **Wordmark** — “froach” in custom letterforms with a small leaf glyph inside the “o”. Use in master lockups and sub-brand lockups.

Don't substitute one for the other. They are not interchangeable.

---

## Known gaps / flags for the user

- The **relax & froach wordmark is a custom typeface** we do not have the font file for. Per-letter SVGs could not be cleanly extracted from the .fig (the binary deduplicates path data across the 7 letter-paths). Use the canonical PNG (`assets/logos/logo-primary.png`) or the official SVG export from Figma for any customer-facing surface. The “approximated” bold-sans rendering in `preview/logo-subbrands.html` and `preview/logo-froachcare-variants.html` is for design-system preview only.
- The **kids tagline** (each letter a different color) similarly relies on per-character text styling that the Figma extraction does not resolve fully. The screenshot is the source of truth for letter colors.
- **Icons Library.fig** — only the icon-set we needed for the Marketing UI kit was pulled. Additional icons (App-UI specific) likely live in deeper sub-pages.

---

## Index / manifest

- `README.md` — this file
- `colors_and_type.css` — design tokens + semantic element styles
- `SKILL.md` — agent-skill manifest
- `assets/logos/` — Logo.jsx (+ Logo.d.ts), PNG, SVGs
- `assets/images/` — photography and reference crops
- `preview/` — Design System tab cards
- `ui_kits/` — (WIP) UI recreations per product
