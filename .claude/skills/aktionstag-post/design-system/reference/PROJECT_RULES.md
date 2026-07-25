# relax & froach — Projekt-Hinweise (CLAUDE.md)

## Foto-Assets immer als Design-System-Karten registrieren
Wenn der Nutzer neue Fotos hochlädt und ins Projekt einbindet (z. B. in den Ordner
`froachkids fotos/` oder einen anderen Bild-Ordner):

1. Fotos wie gewünscht in den passenden (Unter-)Ordner kopieren — sprechende Dateinamen verwenden.
2. **Immer automatisch** (ohne Rückfrage) eine `@dsCard`-Galerie-Karte in `preview/` anlegen,
   die die neuen Fotos zeigt, damit sie im „Design System"-Tab erscheinen:
   - Erste Zeile nach `<!doctype html>`:
     `<!-- @dsCard group="Brand" name="Fotos · <Anlass>" subtitle="<kurz>" viewport="WxH" -->`
   - `colors_and_type.css` einbinden, Bilder per relativem Pfad, Bildunterschriften in
     `var(--rf-light-grau)`, Uppercase, `letter-spacing:.08em`.
3. Danach `check_design_system` aufrufen und bis „No issues" säubern.

## froachkids-Logo — nie selbst bauen
Das froachkids-Logo ist immer die **Original-Lockup-Datei**: `froach`-Schriftzug (Brand Blue)
+ der mehrfarbige `kids`-Schriftzug — Asset: `assets/logos/froachkids-lockup.png`.

- **Niemals** den `kids`-Schriftzug per CSS/Text/Caveat-Font nachbauen und niemals das
  `kids`-Wortbild ohne den `froach`-Schriftzug davor verwenden.
- Einbau immer über die Bilddatei (`<img src="assets/logos/froachkids-lockup.png">`) bzw.
  über die `Logo`-Komponente mit froachkids-Variante.
- Fehlt die Datei: beim Nutzer nachfragen, **nicht** improvisieren.

## Partner-Logos (Ordner `Partner/`)
Logos von Partnern/Kostenträgern (z. B. Techniker Krankenkasse) liegen im Ordner `Partner/`.

- **Nie ungefragt verwenden.** Diese Logos dürfen NUR eingebaut werden, wenn der Nutzer
  es in der aktuellen Anfrage ausdrücklich verlangt. Niemals proaktiv in Decks, Flyer,
  Seiten o. Ä. einsetzen.
- Beim Hinzufügen eines neuen Partner-Logos: Datei nach `Partner/` kopieren (sprechender
  Name) und automatisch eine `@dsCard`-Karte mit `group="Partner"` in `preview/` anlegen
  (Hinweis „nie ungefragt verwenden" einbauen). Danach `check_design_system` bis „No issues".

Sprache mit diesem Nutzer: **Deutsch**.
