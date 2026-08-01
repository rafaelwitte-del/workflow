---
name: aktionstag-post
description: Erstellt aus hochgeladenen Fotos eines Aktionstages (Kita/Schule oder Pflege/Firma) einen markengerechten Instagram-Post oder eine Story im relax & froach Corporate Design, zur Kontrolle durch den Nutzer. Wird durch eine Chat-Nachricht, einen externen Kanal oder das Hochladen von Fotos in einen beobachteten Ordner ausgelöst.
user-invocable: true
---

# Aktionstag → Instagram-Post

Dieses Skill verwandelt Fotos eines betrieblichen Gesundheitstages, Schul- oder
Kita-Aktionstages in ein fertiges, markengerechtes Instagram-Asset (Post oder
Story) — **ausschließlich zur Kontrolle durch den Nutzer**. Es wird niemals
automatisch veröffentlicht oder gepostet.

## 0. Quelle des Corporate Designs

**Primärquelle — lokal gebündelter Handoff-Snapshot (seit 25.07.2026).**
`DesignSync` verlangt für Lese- **und** Schreibzugriff eine interaktive
Autorisierung (`/design-login` bzw. „Send to Claude Code Web"), die eine
Hintergrund-Session nicht selbst auslösen kann (s. Abschnitt 0a). Damit das
Branding trotzdem ohne diese Autorisierung nutzbar ist, liegt ein Export des
Claude-Design-Projekts „relax & froach Design System"
(projectId `044c8b4b-076a-4543-930c-a3642c12b3fe`) direkt in diesem Repo unter
[`design-system/`](design-system/):

```
design-system/tokens/colors_and_type.css        Farb-/Typo-/Radius-/Schatten-/Spacing-Tokens
design-system/components/Logo.jsx|.d.ts         <Logo> / <LogoMark> / <LogoCircle>
design-system/components/Components.jsx|.d.ts   Icon, TopNav, Hero, SegmentCards, Features, Footer
design-system/assets/logos/                     logo-primary.png, froachkids-lockup.png, hand-*.svg, ampersand-blue.svg
design-system/assets/fonts/                     Montserrat (Variable + Italic), Caveat (Variable)
design-system/reference/                        DESIGN_SYSTEM_README.md, PROJECT_RULES.md, marketing-kit.html
design-system/README.md                         Handoff-Übersicht/Änderungshinweise
```

Bei jedem Lauf zuerst `design-system/README.md` und
`design-system/reference/PROJECT_RULES.md` lesen (aktuelle Marken-/Logo-Regeln,
nicht aus dem Gedächtnis rekonstruieren), dann `design-system/tokens/colors_and_type.css`
für die Tokens. Es gilt ausschließlich der Branding Guide **„New" / „2023"**.

**Lücke — was in diesem Snapshot bewusst fehlt.** Laut
`design-system/README.md` Abschnitt „Assets, die nicht im Paket sind": die
138 froach-Icons, 49 Maskottchen-Posen, 54 Maskottchen-Szenen, Illustrationen,
Hero-Fotos und die Foto-Bibliotheken der Aktionstage (`froachkids fotos/`,
`froach Gesundheitstage/`). Für Farben/Typo/Logos (das Nötigste für Schritt 5)
reicht der Snapshot. Falls ein Post ein Icon oder eine Maskottchen-Pose
braucht: **falls `DesignSync` in der aktuellen Session bereits autorisiert
ist**, gezielt per `get_file` nachladen; sonst beim Nutzer nachfragen bzw. auf
das Icon/die Pose verzichten und das transparent im Entwurf vermerken.

**Snapshot aktuell halten.** Dieser Ordner ist ein statischer Export vom
25.07.2026, kein Live-Spiegel. Ändert sich das Branding im Design-System-Projekt
(neue Tokens, neues Logo etc.), muss der Nutzer einen frischen Export
(Zip-Export aus der Design-System-Oberfläche) bereitstellen, der dann hier
ersetzt wird — sonst arbeitet dieser Skill mit veraltetem Branding weiter,
ohne das zu merken.

**Falls doch live-autorisiert:** Ist `DesignSync` in einer laufenden Session
tatsächlich für das Projekt autorisiert (z. B. weil der Nutzer „Send to Claude
Code Web" ausgelöst hat), ist der Live-Stand über `get_project`/`get_file`
immer verbindlicher als dieser lokale Snapshot — bei Widerspruch die Live-Daten
verwenden und den Snapshot-Ordner bei Gelegenheit aktualisieren.

## 0a. Auslöser, Zugriffsgrenzen und Freigabeweg

**Eingang — externe E-Mail-Adresse, zeitgesteuert geprüft.**
Fotos + Infos (Sponsor, Datum etc.) kommen per normaler E-Mail an eine
**externe** Adresse — ausdrücklich **nicht** das persönliche Konto von
Gunnar (`gunnar.reinhardt@froach.de`), sondern das Postfach von Rafael
(`rafael.witte@froach.de`), an das mehrere Kolleg:innen schicken können.

- Adresse: `rafael.witte@froach.de` — ein **anderer Google-Account als
  Gunnars eigenen** (`gunnar.reinhardt@froach.de` wird explizit nicht dafür
  verwendet). Der Gmail-Connector ist bereits mit diesem Konto verbunden.
- Kein Sofort-Trigger bei Mail-Eingang möglich — stattdessen **zeitgesteuerte
  Prüfung 2× täglich, 12:00 und 18:00 Uhr**. Bei jedem Lauf: seit dem letzten
  Lauf neu eingegangene Mails an diese Adresse sichten.
- **Betreff-Filter — nicht das ganze Postfach scannen (erweitert 25.07.2026).**
  Ursprünglich wurden nur Betreffe mit allen drei Kernbegriffen „Fotos" +
  „Aktion" + „Social Media" gewertet — das war zu eng: reale Einsendungen kamen
  mit dem kürzeren Betreff **„Social Media"** an und wurden dadurch ignoriert.
  Jetzt reicht **einer** der folgenden Begriffe im Betreff (tolerant, kein
  stures 1:1-Match, Groß-/Kleinschreibung egal):
  **„Social Media"** / **„Socialmedia"** / **„SM"** / „Fotos in Aktion" /
  „Fotos Aktion".
  Damit eine so breit gefasste Regel nicht versehentlich die eigenen
  Entwurfs-/Freigabe-Mails im selben Postfach mit erfasst, gilt zusätzlich:
  nur werten, wenn die Mail (a) **mindestens einen Bildanhang** hat **und**
  (b) **nicht** von einer Adresse innerhalb der eigenen Organisation stammt,
  die erkennbar der Skill selbst verwendet (z. B. eigene Entwurfs-Betreffe wie
  „Entwurf Aktionstag …" oder „Freigabe …" — diese werden weiterhin
  ausgeschlossen, unabhängig vom Social-Media-Treffer). E-Mails ohne
  Bildanhang werden ignoriert, auch wenn der Betreff passt — reiner Text ist
  nie eine Fotoeinsendung.
- **Explizit NICHT unterstützt:** die Chat-/Spaces-Funktion innerhalb von
  Gmail (Google Chat). Das ist eine eigene Google-API mit eigenen
  Berechtigungen, kein Bestandteil des Gmail-Connectors, und es existiert
  aktuell kein separater Google-Chat-Connector. Nachrichten, die nur im
  Chat/Spaces-Bereich landen, werden **nicht** erkannt — nur echte E-Mails
  an die oben genannte Adresse.

**Google Drive — strikt auf zwei Unterordner begrenzt.**
Beide liegen unter dem Überordner „**Fotos für Insta**" (auch „Fotos für
Social Media" / kurz **SM** genannt,
[Link](https://drive.google.com/drive/folders/1K0p18K303KVR0dQAp6yMsynXgDP8elmA)).
Zugriff ist **ausschließlich** auf genau diese zwei Unterordner erlaubt:

1. **Eingangs-Ordner** „**Fotos Aktionstage**" (Zwischenablage der per Mail
   eingegangenen Fotos):
   [Link](https://drive.google.com/drive/folders/1d3wvlAhieickno0yLJ1qkQGDiIdPUvcY)
2. **Ergebnis-Ordner** „**Ergebnisse**" (ursprünglich vorgesehen für fertige,
   freigegebene Posts/Stories):
   [Link](https://drive.google.com/drive/folders/1_a2H3UiA6Ex3xS-HAPkQTWPrSutRG_Ec) —
   **seit 24.07.2026 nicht mehr das aktive Ziel für fertige Bilder** (siehe
   Schritt 0a „Freigabe"): `Google_Drive create_file` kann keine Bild-Assets
   entgegennehmen, daher lebt der Entwurf/das Ergebnis stattdessen im
   Design-System-Projekt. Dieser Ordner bleibt nur als Referenz/Altlast
   stehen, bis es einen technischen Weg gibt, dort wirklich Bilder abzulegen.

Beide Unterordner sind identisch in vier Segment-Unterordner gegliedert:
**Schule**, **Kita**, **Pflege**, **Projektmodul** (Ablage/Auslage jeweils
im passenden Segment-Unterordner, siehe Schritt 2 zur Sub-Marken-Zuordnung).

Lose Dateien, die direkt im Überordner „Fotos für Insta" liegen (nicht in
einem der beiden Unterordner bzw. deren Segment-Unterordnern), gehören
**nicht** zu diesem Workflow und werden **ignoriert**.

**Gmail hat keinen Anhang-Download — Drive-Ordner „Fotos Aktionstage" ist
deshalb der verlässliche Foto-Kanal (Stand 01.08.2026).** Der
Gmail-Connector kann Anhänge nur benennen (Dateiname, MIME-Typ), aber die
Bild-Bytes selbst nicht herunterladen — ausführlich geprüft, es gibt kein
`get_attachment`/`download_attachment` o. ä. in dieser Umgebung. Google
Drive dagegen liefert Bild-Bytes zuverlässig (`download_file_content`).
Praktische Konsequenz: Die E-Mail liefert die Pflichtangaben (Text —
Segment, Anlass, Datum, Ort, Sponsor erkennbar aus dem Mailtext), das
tatsächliche Foto kommt separat über den Eingangs-Ordner „Fotos
Aktionstage" (Segment-Unterordner). Beide werden anhand von Segment +
zeitlicher Nähe (E-Mail-Datum ≈ Datei-Upload-Datum) einander zugeordnet.

**Ordner-Überwachung bei jedem geplanten Lauf (ergänzt 01.08.2026, auf
Wunsch von Gunnar: „merke auch, wenn sich was im Ordner ändert").**
Zusätzlich zur E-Mail-Prüfung bei jedem 2×-täglichen Lauf: aktuelle
Dateiliste der vier Segment-Unterordner unter „Fotos Aktionstage" abrufen
und mit der gespeicherten Baseline abgleichen —
[`state/drive-watch-baseline.json`](state/drive-watch-baseline.json)
(`knownFileIds` je Segment). Jede Datei-ID, die dort **nicht** auftaucht,
ist eine neue oder geänderte Foto-Einsendung und wird wie ein frischer
Eingang behandelt (Schritt 1 ff.). Nach der Verarbeitung: die neue
Datei-ID in die Baseline aufnehmen, `lastCheckedAt` aktualisieren und die
Datei committen/pushen — sonst hält der nächste (frische) Lauf dieselbe
Datei fälschlich für neu. Diese Baseline-Datei ist die einzige Form von
Gedächtnis zwischen den Läufen; ohne den Commit „vergisst" der Workflow
jede erkannte Änderung sofort wieder.

Harte Regel: **Kein** Auflisten, Lesen, Schreiben oder Suchen außerhalb
dieser zwei Unterordner (inkl. ihrer vier Segment-Unterordner) — kein
Durchsuchen des restlichen Drives, keine Stichwortsuche über den gesamten
Drive-Index, kein Zugriff auf andere Ordner „nur um kurz nachzuschauen".
Falls eine Aufgabe scheinbar Zugriff außerhalb dieses Rahmens erfordert:
**anhalten und Gunnar fragen**, statt den Rahmen zu erweitern.

Zusätzlich zur reinen Verhaltensregel hier: Beim Autorisieren des
Google-Drive-Connectors, falls ein Ordner-Picker angeboten wird, dort auch
technisch **nur diese zwei Ordner** auswählen/freigeben — nicht "gesamtes
Drive" autorisieren. Verhalten *und* Berechtigung sollten beide eng sein.

**Freigabe — aktueller Weg: direkt im Chat (Stand 25.07.2026).**
Vorgeschichte, kurz: Gmail kann laut eigener Beschreibung nur Entwürfe
anlegen, Threads zusammenfassen und das Postfach durchsuchen — **kein
tatsächliches Versenden**. Google Drive kann von mir aus technisch **keine
Bild-Assets entgegennehmen** (`create_file` verlangt den kompletten Inhalt
inline als Text im Werkzeugaufruf, dafür sind Bilddateien immer zu groß —
kein Übungs-, sondern ein Architekturproblem, ausführlich getestet am
23.–24.07.2026). Das vorgesehene Ziel „Design-System, eigenes Projekt pro
Post" (`DesignSync create_project` + `write_files`) ist seit 24.07.2026
durchgängig blockiert: jeder Zugriff (sogar reines Lesen über die Live-API)
verlangt eine interaktive Autorisierung (`/design-login`), die eine
automatisierte Sitzung/Routine nicht selbst auslösen kann — ein Versuch,
das über „Send to Claude Code Web" zu lösen, hat den Block bislang nicht
aufgehoben.

**Zwischenzeitlich ausprobiert und wieder verworfen: Gmail-Entwurf mit
Bild-Anhang** (`create_draft`). Das Werkzeug sagt weiterhin explizit
„Limitation: Creating drafts with attachments is not supported yet." Ein
Test mit einem winzigen Bild wurde zwar ohne Fehler angenommen, ließ sich
aber nicht zurücklesen, um zu bestätigen, dass der Anhang wirklich ankam —
und selbst wenn: Für ein echtes 1080×1920-Bild bräuchte es denselben
Base64-Textumfang im Werkzeugaufruf wie bei Drive, also dasselbe
Größenproblem. Nicht als verlässlicher Weg übernommen.

**Deshalb aktuell:** Fertiges Bild + Caption werden **direkt hier im
Chat per `SendUserFile` ausgeliefert** — das Werkzeug liest die Datei von
der Festplatte und hat kein Größenproblem, unabhängig davon, wie lang die
Unterhaltung schon ist (automatische Kontext-Zusammenfassung durch das
System ändert daran nichts). Nachteil, den Gunnar bewusst in Kauf nimmt:
Rafael sieht den Entwurf nur, wenn er genau diese Unterhaltung öffnet,
nicht in einem eigenständigen, für ihn jederzeit einsehbaren System.

1. Fertiges Bild + Caption-Textdatei per `SendUserFile` in dieser
   Unterhaltung ausliefern, deutlich gekennzeichnet als „Entwurf zur
   Kontrolle — noch nicht freigegeben".
2. **Freigabe-Signal per Chat-Nachricht:**
   - **„Freigabe"** → eindeutiges Go. Danach Schritt 6 versuchen (Fotos
     ins gemeinsame Design-System übernehmen) — **das bleibt weiterhin
     blockiert**, solange die Design-System-Autorisierung nicht steht;
     in dem Fall transparent melden, dass die Freigabe zwar erfolgt ist,
     die Fotos aber noch nicht automatisch übernommen werden konnten.
   - **„Anpassung" + was genau** → kein Go, in genau diesem Chat
     besprechen und einen neuen Entwurf ausliefern.
   - Nur „Anpassung" ohne Details → aktiv nachfragen, was konkret nicht
     passt, nicht raten.
3. Rafael gibt das Go — nicht Gunnar. Ohne „Freigabe": keine Fotos
   übernehmen, nichts an Dritte weitergeben.
4. **Sobald die Design-System-Autorisierung doch noch geklärt wird:**
   zurück auf den eigentlich vorgesehenen Weg wechseln (eigenes
   Design-Projekt pro Post statt Chat-Auslieferung, siehe Git-Historie
   dieser Datei für die genaue frühere Fassung) — Chat-Auslieferung ist
   ausdrücklich eine Übergangslösung, kein Ersatz auf Dauer.

**Branding-Lesezugriff ohne Live-Autorisierung.** Gunnar hat einen
Zip-Export des Design-System-Projekts bereitgestellt; er liegt lokal unter
[`design-system/`](design-system/) (Tokens, Logo-Assets inkl.
`froachkids-lockup.png`, Fonts, Referenz-Komponenten) — siehe Schritt 0
oben für Details/Lücken. Das ist ein statischer Snapshot vom 25.07.2026,
kein Live-Spiegel, aber von der Autorisierungsblockade oben **nicht**
betroffen, da es einfache Repo-Dateien sind.

## 1. Pflichtangaben abfragen

Wenn nicht bereits mitgeliefert, folgende Angaben erfragen:

- **Format:** Post (Feed, 1080×1350 hochkant oder 1080×1080 quadratisch) oder
  Story (1080×1920)?
- **Segment:** **Schule**, **Kita**, **Pflege** oder **Projektmodul**
  (entspricht dem jeweiligen Segment-Unterordner in Drive, s. o.)? Bestimmt
  die Sub-Marke (siehe Schritt 2).
- **Anlass/Titel:** z. B. „Gesundheitstag", „Bewegungspause", „froachkids
  Aktionstag".
- **Datum** und **Ort/Einrichtung** (Name der Kita/Schule/Firma — sofern der
  Nutzer das öffentlich nennen will, siehe Datenschutz-Hinweis unten).
- **Kostenträger/Sponsor:** nur falls der Nutzer einen nennt — siehe Schritt 3.
- **Fotos** (Upload oder Ordnerpfad).
- Optional: 1–2 Sätze, was konkret gemacht wurde (fürs Wording).

Frage aktiv nach, was fehlt — nicht raten, insbesondere nicht bei Datum,
Anlass oder Segment.

## 2. Segment → Sub-Marke

Vier Drive-Segment-Ordner, aber nur **zwei** Design-Linien — Schule und Kita
gehören klar zusammen (froachkids), Pflege und Projektmodul ebenso klar zur
professionellen Linie (relax & froach). Beide Linien niemals
mischen, auch nicht bei Mehrfach-Anlässen.

| Segment (Drive-Unterordner) | Sub-Marke | Farbwelt / Ton | Bildsprache |
|---|---|---|---|
| **Kita, Schule** | **froachkids** | Bunte Buchstabenfarben (Capri/Green/Mustard/Bittersweet), verspielter, wärmerer Ton | Maskottchen „Froach" (Posen/Szenen), Illustration `colorful-hands.png`, Fotos aus `froachkids fotos/` |
| **Pflege, Projektmodul** | **relax & froach** | Brand Blue `#044894` + froach Green `#94CE0E`, sachlich-professioneller Ton | Editorial Fotografie, arch-förmige Foto-Karten mit Navy-Overlay (`--rf-photo-overlay`), kein Maskottchen in formellen Kontexten |

Der `froach`-Wortstamm bleibt immer Brand Blue; nur Tagline-Farbe/-Wort und
Bildsprache wechseln. **Kein „froachcare"-Logo/-Bildmarke verwenden** — im
Design-System existiert zwar ein `preview/logo-froachcare-variants.html`,
das wird für diesen Workflow bewusst **nicht** eingesetzt; Pflege und
Projektmodul laufen unter der normalen **relax & froach**-Wortmarke, ohne
eigenständiges Care-Logo. Nie froachkids-Elemente mit der relax &
froach-Linie mischen. Bei Unsicherheit, ob ein Anlass „Projektmodul" oder
„Pflege" ist: beide liegen auf derselben Design-Linie, daher unkritisch —
bei Unsicherheit zwischen Kita/Schule und Pflege/Projektmodul dagegen
**immer nachfragen**, da hier die Sub-Marke wechselt.

## 3. Partner-/Kostenträger-Logo — nur auf ausdrücklichen Wunsch

**Harte Regel aus dem Design-System (CLAUDE.md dort):** Partner-Logos (AOK
Nordost, Techniker Krankenkasse, Vivida BKK, Innovationskasse, ggf. weitere in
`Partner/`) dürfen **niemals proaktiv** eingebaut werden — auch nicht, wenn
der Nutzer nur "Sponsor XY" nennt. Erst einbauen, wenn der Nutzer in der
aktuellen Anfrage ausdrücklich sagt, dass das Logo aufs Bild soll. Im Zweifel
nachfragen: „Soll das Logo von [Kostenträger] mit aufs Bild?"

**Ausnahme — Logo-Datei liegt der Eingangsmail bei.** Ist der E-Mail mit den
Aktionstag-Fotos eine Partner-/Kostenträger-Logo-Datei als Anhang
beigefügt, gilt das als der geforderte ausdrückliche Wunsch — das Logo darf
dann ohne zusätzliche Rückfrage aufs Bild. In der Entwurfs-Mail an Rafael
trotzdem kurz vermerken, dass ein beigefügtes Logo verwendet wurde (z. B.
„Logo von [Partner] aus der Eingangsmail übernommen"), damit er das in
seiner Freigabe gegenprüfen kann.

**Neue/unbekannte Partner-Logos ins Design-System übernehmen.** Ist der
Partner noch nicht im `Partner/`-Ordner des Design-System-Projekts
(`044c8b4b-076a-4543-930c-a3642c12b3fe`) vorhanden, das mitgeschickte
Logo dort per `DesignSync` (`list_files` → `finalize_plan` → `write_files`,
Pfad `Partner/<Partnername>.png` bzw. passendes Format) ablegen — das kann,
anders als bei Fotos mit Personen, **sofort** passieren und muss nicht auf
Rafaels Freigabe warten, da ein Firmenlogo keine personenbezogenen Daten
enthält.

**Hintergrund für den Nutzer (§20 SGB V):** Die meisten dieser Aktionstage
dürften im Rahmen der **primären Prävention und betrieblichen
Gesundheitsförderung nach § 20 SGB V** (Leistungen der gesetzlichen
Krankenversicherung zur Verhütung und Verminderung von Krankheitsrisiken)
von den genannten Krankenkassen mitfinanziert oder zertifiziert sein — das
ist vermutlich der Grund, warum ein „Sponsor" genannt wird. Das ändert nichts
an der Logo-Regel oben, ist aber für die Bildunterschrift/den Text relevant
(z. B. „gefördert im Rahmen von § 20 SGB V").

## 4. Datenschutz-Check (verpflichtend, vor Erstellung)

Personenbezogene Daten werden **in diesem Repo nicht gespeichert** — weder
Namen noch andere identifizierende Angaben landen in Dateien dieses Repos.
Nach Rafaels Freigabe (siehe Schritt 6) werden die Original-Fotos jedoch
dauerhaft in der Foto-Bibliothek des Design-System-Projekts abgelegt —
deshalb ist die Einwilligung **vor** dieser Freigabe zwingend zu klären,
nicht optional.

- **Kita/Schule (Kinder):** Vor Veröffentlichung erkennbarer Kindergesichter
  muss die Einwilligung der Erziehungsberechtigten vorliegen (Recht am
  eigenen Bild, § 22 f. KunstUrhG; DSGVO Art. 6 Abs. 1, ggf. Art. 8 bei
  Einwilligung durch Kinder/Jugendliche). Nutzer aktiv fragen: „Liegen
  Einwilligungen der Eltern für die gezeigten Kinder vor?" Falls nein oder
  unklar: Fotos ohne erkennbare Gesichter vorschlagen (Rückenansicht,
  Ausschnitt, Distanz, oder Maskottchen/Illustration statt Kinderfotos).
  **Zusätzlich, unabhängig vom Einwilligungsstand:** Jedes erkennbare
  Kindergesicht in dem final erzeugten Post/Story-Bild wird **immer
  verpixelt/unkenntlich gemacht** (siehe Schritt 5) — die Einwilligung
  entscheidet also nur, ob ein Foto mit Kindern überhaupt genutzt wird,
  nicht darüber, ob Gesichter scharf gezeigt werden.
- **Pflege/Firmen (Erwachsene):** Einwilligung der abgebildeten Personen
  (Mitarbeitende, Bewohner:innen/Pflegebedürftige) erfragen — bei
  Pflegeeinrichtungen besondere Sensibilität, da ggf. gesundheitsbezogene
  Situationen erkennbar sind (Art. 9 DSGVO, besondere Kategorien
  personenbezogener Daten).
- In Bildtext/Caption grundsätzlich **keine Klarnamen** von abgebildeten
  Personen, außer der Nutzer bestätigt ausdrücklich eine vorliegende
  Einwilligung genau dafür.
- Namen von Einrichtungen (Kita/Schule/Firma) nur übernehmen, wenn der
  Nutzer sie für die Veröffentlichung freigibt.

## 5. Bild erstellen

1. Design-Tokens aus `colors_and_type.css` und die passenden Assets (Schritt
   0/2) per `DesignSync get_file` laden bzw. als lokale Datei im Scratchpad
   ablegen.
2. Statische HTML-Datei in exakter Zielgröße bauen (1080×1350 / 1080×1080 /
   1080×1920), Foto(s) des Nutzers einbinden, Branding gemäß Segment
   anwenden (arch-förmige Karte bei relax & froach, verspielteres Layout
   mit Maskottchen bei froachkids), Anlass/Datum/Ort als Textebene,
   Partner-Logo nur falls in Schritt 3 bestätigt.
   **Bei Kita/Schule-Fotos:** jedes erkennbare Kindergesicht vor dem
   Zusammenbau verpixeln/weichzeichnen (kräftige Pixelierung, kein leichter
   Weichzeichner) — unabhängig davon, ob eine Einwilligung vorliegt (siehe
   Schritt 4). Bei Unsicherheit, ob eine Fläche ein Gesicht ist: im Zweifel
   verpixeln statt riskieren.
3. Als PNG in der Zielauflösung rendern (z. B. Headless-Chromium-Screenshot
   oder das `canvas-design`-Skill als Alternative, wenn ein freieres,
   illustratives Layout gewünscht ist statt eines HTML-Templates).
4. **Immer** einen kurzen Bildtext-/Caption-Vorschlag danebenstellen (deutsch,
   Ton laut Segment), inkl. `#relaxundfroach`-artiger Hashtag-Vorschläge — als
   Text im Chat/in der Entwurfs-Mail, nicht ins Bild einbrennen, außer
   gewünscht. Das ist fester Bestandteil jedes Laufs, kein optionaler Zusatz.

## 6. Ausgabe — niemals automatisch posten

1. Fertiges Bild **zusammen mit dem Caption-Text-Vorschlag** (siehe Schritt
   5.4, immer beigefügt) als **Gmail-Entwurf** im Postfach
   `rafael.witte@froach.de` ablegen (`Gmail create_draft`, Bild als Anhang,
   Betreff „Entwurf Aktionstag <Segment> <Datum> <Kurztitel>", Caption im
   Mailtext — siehe Schritt 0a „Ausgabeweg"). Das ist bereits autorisiert und
   braucht keine Design-System-Schreibrechte.
2. Warten auf Rafaels **„Freigabe"** per Chat-Nachricht (siehe Schritt 0a) —
   diese betrifft nur noch Schritt 6.3 (Foto-Archivierung), nicht den
   Gmail-Entwurf selbst, der bereits in Schritt 1 fertig abgelegt ist.
3. **Nach „Freigabe" — immer, ausnahmslos, beide Kategorien:**
   - **Das/die eingesendete(n) Foto(s)** dieses Aktionstages (nicht nur das
     im Post verwendete) UND
   - **jedes vom Partner mitgeschickte Foto** (nicht nur ein Logo — falls
     der Partner zusätzlich eigenes Bildmaterial schickt, auch das)

   über `DesignSync` (`list_files` → `finalize_plan` → `write_files` mit
   `localPath`) in den zum Segment passenden Foto-Unterordner des
   Design-System-Projekts (`044c8b4b-076a-4543-930c-a3642c12b3fe`) ablegen:
   - Schule → `froachkids fotos/froachkids Fotos Schulaktionstage/`
   - Kita → `froachkids fotos/froachkids Kitaaktionstage/`
   - Pflege, Projektmodul → `froach Gesundheitstage/`

   Dateinamen sprechend, aber ohne Klarnamen abgebildeter Personen benennen
   (Einrichtung/Anlass/Kurzbeschreibung, analog zu bestehenden Dateien dort).
   Ohne „Freigabe": **keine** Fotos ins Design-System übernehmen — dieselbe
   Datenschutz-Logik wie beim Ergebnis-Bild gilt hier ebenso, weil die
   Foto-Bibliothek dauerhaft und projektübergreifend sichtbar ist.
4. Eine tatsächliche Instagram-Veröffentlichung ist **nicht** Teil dieses
   Skills — der Gmail-Entwurf (Schritt 1) ist die eigentliche Ausgabe; die
   Foto-Archivierung (Schritt 3) ist ein nachgelagerter, von der
   Design-System-Autorisierung abhängiger Zusatzschritt.

## Sprache

Mit diesem Nutzer immer auf Deutsch kommunizieren.
