# Handoff: relax &amp; froach Design System

## Überblick
Dieses Paket enthält das komplette Design System von **relax & froach Gesundheitsmanagement**
(inkl. Sub-Brand **froachkids**): Design-Tokens, Typografie, Logo-Assets, Fonts und die
React-Referenzkomponenten des Marketing-Kits.

Ziel: Ein Entwickler bzw. Claude Code kann damit Oberflächen im Marken-Look bauen, ohne den
Figma-/Branding-Guide zu kennen.

## Über die Design-Dateien
Die HTML-/JSX-Dateien in diesem Bundle sind **Design-Referenzen**, kein Produktionscode zum
1:1-Kopieren. Sie zeigen Look & Verhalten. Die Aufgabe ist, diese Vorlagen in der bestehenden
Umgebung des Ziel-Repos (React, Vue, Next, SwiftUI …) mit dessen etablierten Patterns
nachzubauen. Existiert noch keine Umgebung, das für das Projekt passendste Framework wählen.

**Verbindlich ist `tokens/colors_and_type.css`** — diese Datei kann direkt übernommen werden
(oder in die Token-Struktur des Zielprojekts übersetzt werden: Tailwind-Theme, CSS-Variablen,
Style-Dictionary o. ä.). Werte nicht neu erfinden.

## Fidelity
**High-fidelity.** Farben, Typo-Skala, Radien, Schatten und Abstände sind final und exakt so zu
übernehmen. Die Komponenten im Marketing-Kit sind Layout-/Look-Referenz, nicht Architekturvorgabe.

## Inhalt des Pakets

```
tokens/colors_and_type.css       Alle Design-Tokens (Farben, Typo, Radien, Schatten, Spacing, Motion)
components/Logo.jsx|.d.ts        <Logo> / <LogoMark> / <LogoCircle>
components/Components.jsx|.d.ts  Marketing-Kit: Icon, TopNav, Hero, SegmentCards, Features, Footer
assets/logos/                    Logo-Dateien (PNG/SVG)
assets/fonts/                    Montserrat (Variable + Italic), Caveat (Variable)
reference/marketing-kit.html     Gerendertes Beispiel-Layout des Marketing-Kits
reference/DESIGN_SYSTEM_README.md  Ausführliche Dokumentation des Systems
reference/PROJECT_RULES.md       Verbindliche Marken-/Asset-Regeln (Logos, Partner-Logos, Fotos)
```

## Design-Tokens (Auszug — vollständig in `tokens/colors_and_type.css`)

### Farben
| Token | Hex | Einsatz |
|---|---|---|
| `--rf-brand-blue` | `#044894` | Hauptfarbe, Logo |
| `--rf-dark-blue` | `#053570` | große dunkle Flächen |
| `--rf-heavy-blue` | `#001E41` | Fließtext auf hell, tiefste Fläche |
| `--rf-blue-3` | `#004A84` | alternatives Primär |
| `--rf-relax-blue` | `#0275F2` | helle Akzente, Link-Hover |
| `--rf-capri-blue` | `#43B3EF` | Links, helle Flächen |
| `--rf-iced-blue` | `#A3DFFF` | Highlights |
| `--rf-iced-blue-50` | `#E9F5FF` | Hintergründe |
| `--rf-iced-blue-25` | `#F6FBFF` | dezente Flächen |
| `--rf-froach-green` | `#94CE0E` | Marken-Akzent, Blatt im Logo |
| `--rf-light-green` | `#BCF240` | nur RGB, nie CMYK |
| `--rf-bittersweet` | `#FF735A` | Fehler, Zahlen-Callouts |
| `--rf-soft-bittersweet` | `#FFC3B8` | warme Flächen |
| `--rf-mustard` | `#FAD26B` | Highlights |
| `--rf-dark-grey` | `#213E79` | Sekundärtext |
| `--rf-light-grau` | `#9DB6D2` | Meta/Tertiärtext |

Semantische Tokens (`--rf-surface*`, `--rf-fg*`, `--rf-link*`, `--rf-error/warning/success/info`)
bauen darauf auf — im Code immer die **semantischen** Tokens verwenden.

### Typografie
- Sans: `Montserrat` (`--rf-font-sans`) — Light für Fließtext, SemiBold für Betonung, Bold für Display
- Script: `Caveat` (`--rf-font-script`) — nur für handschriftliche Notizen/Akzente
- Skala: Display 72 / H1 48 / H2 36 / H3 24 / Lead 22 / Body 18 / Body-sm 16 / Caption 14 / Micro 12
- Line-Heights: tight 1.1 · display 1.15 · snug 1.3 · body 1.4 · relaxed 1.6
- Links: SemiBold + Unterstreichung, Farbe `--rf-link` (Capri Blue), Hover `--rf-relax-blue`

### Radien / Schatten / Motion
- Radien: 4 / 8 / 13 / 17 / pill 999px, plus `--rf-radius-arch` für die Segment-Bögen
- Schatten: `--rf-shadow-sm|md|lg|badge|inset`
- Motion: weiche Fades, `--rf-ease-out` — kein Bounce

## Logo-Regeln (verbindlich)
- **Wortmarke nie nachbauen** — immer die Bilddateien aus `assets/logos/` verwenden.
- Master-Lockup: `logo-primary.png` (Pfote + „relax & froach" + Tagline).
- **froachkids**: ausschließlich `froachkids-lockup.png` — `froach` in Brand Blue plus den
  mehrfarbigen `kids`-Schriftzug. Nie den `kids`-Schriftzug per Font/CSS nachbauen, nie `kids`
  ohne `froach` davor. Auf farbigem Grund im weißen Feld platzieren, nicht einfarbig invertieren.
  *Hinweis: die Datei ist eine Bildmontage, scharf bis ca. 560 px Breite — für Print den
  Vektorexport aus dem Branding-File anfordern.*
- Icon-Marke: `hand-blue.svg` / `hand-white.svg` / `hand-canonical.svg` (currentColor-tauglich).
- Partner-/Kostenträger-Logos (z. B. Krankenkassen) sind **nicht** Teil dieses Pakets und dürfen
  nie ungefragt eingesetzt werden.

## Komponenten
`components/Components.jsx` enthält die Referenzimplementierungen (React, Tokens per CSS-Variablen):

| Komponente | Zweck |
|---|---|
| `Icon` | Icon-Renderer für das froach-Icon-Set |
| `TopNav` | Kopfnavigation mit Logo, Links, CTA |
| `Hero` | Foto-Hero mit Overlay-Gradient (`--rf-photo-overlay`) und Headline |
| `SegmentCards` | Karten-Raster für Zielgruppen/Segmente (Bogen-Radius) |
| `Features` | Feature-Liste mit Icons |
| `Footer` | Fußbereich auf dunkler Fläche |

Props sind in den `.d.ts`-Dateien typisiert. `reference/marketing-kit.html` zeigt sie im Zusammenspiel.

## Fonts einbinden
Montserrat und Caveat liegen als Variable Fonts bei (OFL-Lizenz). Entweder lokal per `@font-face`
einbinden oder über Google Fonts laden — Fallback-Stacks stehen in den Token-Variablen.

## Assets, die nicht im Paket sind
Aus Größengründen nicht enthalten, im Design-System-Projekt aber vorhanden und bei Bedarf
nachlieferbar: 138 froach-Icons, 49 Maskottchen-Posen, 54 Maskottchen-Szenen, Illustrationen,
Hero-Fotos und die Foto-Bibliotheken der Aktionstage.
