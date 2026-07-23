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

Das Branding liegt **nicht** in diesem Repo, sondern im Claude-Design-Projekt
„relax & froach Design System" (projectId `044c8b4b-076a-4543-930c-a3642c12b3fe`).
Bei jedem Lauf über das `DesignSync`-Tool aktuell einlesen (nicht aus dem
Gedächtnis rekonstruieren, das Projekt kann sich ändern):

1. `get_project` → prüfen, dass es weiterhin `type: PROJECT_TYPE_DESIGN_SYSTEM` ist.
2. `get_file README.md` und `get_file CLAUDE.md` → aktuelle Markenregeln lesen.
3. `get_file colors_and_type.css` → Farb-/Typografie-Tokens.
4. Je nach Segment (siehe Schritt 2) die passenden Logo-/Foto-/Illustrations-
   Dateien aus `assets/` bzw. den Fotoordnern per `get_file` ziehen.

Es gilt ausschließlich der Branding Guide **„New" / „2023"** (siehe README des
Design-Systems). Ältere Guides ignorieren.

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
- **Betreff-Filter — nicht das ganze Postfach scannen.** Nur E-Mails
  berücksichtigen, deren Betreff (tolerant, kein stures 1:1-Match) etwas wie
  „**Fotos in Aktion für Social Media**" enthält — Wortlaut kann leicht
  variieren (z. B. „Fotos Aktion Socialmedia", „Fotos SM"), Kernbegriffe sind
  **„Fotos"** + **„Aktion"** + **„Social Media"/"Socialmedia"/"SM"**. E-Mails
  ohne dieses Muster im Betreff werden ignoriert, auch wenn sie
  Foto-Anhänge haben. Das gilt auch, weil dasselbe Postfach zusätzlich die
  Entwurfs-/Freigabe-Mails (s. u.) empfängt — die Betreff-Filterung trennt
  eingehende Fotoeinsendungen zuverlässig von diesem eigenen Mailverkehr.
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
2. **Ergebnis-Ordner** „**Ergebnisse**" (fertige, freigegebene Posts/Stories):
   [Link](https://drive.google.com/drive/folders/1_a2H3UiA6Ex3xS-HAPkQTWPrSutRG_Ec)

Beide Unterordner sind identisch in vier Segment-Unterordner gegliedert:
**Schule**, **Kita**, **Pflege**, **Projektmodul** (Ablage/Auslage jeweils
im passenden Segment-Unterordner, siehe Schritt 2 zur Sub-Marken-Zuordnung).

Lose Dateien, die direkt im Überordner „Fotos für Insta" liegen (nicht in
einem der beiden Unterordner bzw. deren Segment-Unterordnern), gehören
**nicht** zu diesem Workflow und werden **ignoriert**.

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

**Freigabe — per Drive-Kommentar, durch Rafael.** (Kommentar-Mechanismus
getestet und bestätigt funktionsfähig am 23.07.2026 — das **Hochladen des
fertigen Bildes selbst ist aktuell technisch blockiert**, siehe Kasten
unten.)
Der Gmail-Connector kann laut eigener Beschreibung nur Entwürfe anlegen,
Threads zusammenfassen und das Postfach durchsuchen — **kein tatsächliches
Versenden**. Die Freigabe läuft deshalb nicht per E-Mail, sondern über
Google Drive:

**⚠ Bekannte Blockade (Test vom 23.07.2026):** `Google_Drive create_file`
verlangt den kompletten Dateiinhalt inline als Base64-Text im Werkzeugaufruf
— es gibt (anders als bei `DesignSync write_files`) **keinen `localPath`-
Parameter**, der direkt von der Festplatte liest. Bild-Base64 lässt sich
extrem ineffizient tokenisieren: Schon eine stark komprimierte ~140-KB-JPEG-
Version eines 1080×1920-Entwurfs ließ sich nicht mehr vollständig zurück in
den Kontext lesen. **Ergebnis: Ich kann aktuell keine fertigen Bild-Assets
selbst nach Google Drive hochladen.** Workaround, bis es einen
`localPath`-fähigen Weg gibt: Ich liefere Bild + Caption direkt im Chat
(`SendUserFile`) aus; Rafael oder Gunnar legt die Datei manuell in den
Staging-Unterordner. Ab dann funktionieren `copy_file` (Kopieren
innerhalb von Drive) und `read_file_content`/Kommentare wieder normal,
weil dabei kein neuer Binärinhalt durch meinen Kontext muss.

1. Fertiges Bild + Caption-Textdatei in einen Staging-Unterordner
   `Ergebnisse/_Entwurf zur Freigabe/<Segment>-<Datum>-<Kurztitel>/` legen
   (liegt innerhalb des bereits erlaubten Ergebnis-Ordners, kein neuer
   Top-Level-Ordner). **Solange die Upload-Blockade oben besteht:** Ordner
   selbst per `create_file` (Ordner brauchen keinen Inhalt) anlegen, Bild +
   Caption aber per `SendUserFile` ausliefern und Rafael/Gunnar bitten, sie
   von Hand in genau diesen Unterordner zu legen.
2. Rafael öffnet die PNG-Datei in Drive (Doppelklick → Vorschau →
   Sprechblasen-Symbol „Kommentar hinzufügen") und kommentiert mit einem
   von zwei festen Stichworten:
   - **„FREIGABE"** (Groß-/Kleinschreibung egal) → eindeutiges Go. Die Datei
     (PNG + Caption) per `copy_file` zusätzlich in den passenden
     Segment-Unterordner von „Ergebnisse" kopieren, danach **alle**
     Original-Fotos dieses Aktionstages ins Design-System übernehmen (siehe
     Schritt 6). Das Original im Staging-Unterordner bleibt technisch
     liegen — `Google_Drive` hat kein Lösch-/Verschiebe-Werkzeug, nur
     `copy_file`. Das ist reine Ablage-Unordnung (kein Datenschutzproblem)
     und muss von Zeit zu Zeit von Hand aufgeräumt werden.
   - **„Anpassung"** (irgendwo im Kommentartext) → **kein** Go. Stattdessen
     in dieser laufenden Claude-Code-Sitzung (an die die Prüf-Routine
     gebunden ist) mit vollem Kontext melden (Aktionstag, bisheriger
     Entwurf, Rafaels Kommentartext), damit die Änderung interaktiv
     besprochen werden kann — bei bloßem „Anpassung" ohne Details aktiv
     nachfragen, was konkret nicht passt.
   - Jeder andere Kommentartext (weder „FREIGABE" noch „Anpassung"): **nicht**
     automatisch finalisieren, im Zweifel wie „Anpassung" behandeln und
     nachfragen.
3. Ich lese die Kommentare über `read_file_content` (Parameter
   `includeComments`) aus — kein automatischer Push, das Auslesen passiert
   bei jedem Postfach-/Freigabe-Check der Routine.
4. Rafael gibt das Go — nicht Gunnar. Ohne „FREIGABE"-Kommentar: nichts in
   den finalen Ergebnis-Unterordner kopieren, nichts ins Design-System
   übernehmen, nichts an Dritte weitergeben.

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
dauerhaft an zwei Stellen außerhalb des Repos abgelegt (Drive-Ordner
„Ergebnisse" und Design-System-Fotobibliothek) — deshalb ist die
Einwilligung **vor** dieser Freigabe zwingend zu klären, nicht optional.

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

1. Fertiges Bild aus dem Eingangs-Ordner-Lauf **zusammen mit dem
   Caption-Text-Vorschlag** (siehe Schritt 5.4, immer beigefügt) in den
   Staging-Unterordner `Ergebnisse/_Entwurf zur Freigabe/<Segment>-<Datum>-
   <Kurztitel>/` legen (siehe Schritt 0a). Deutlich kennzeichnen: „Entwurf
   zur Kontrolle — noch nicht final abgelegt, noch nicht ins
   Design-System übernommen."
2. Warten auf Rafaels Kommentar **„FREIGABE"** auf genau dieser Datei (siehe
   Schritt 0a zum genauen Ablauf/Stichwörtern). Kein Finalisieren ohne
   diesen Kommentar.
3. Nach „FREIGABE": Ergebnis-PNG (und Caption als Textdatei) per `copy_file`
   zusätzlich in den passenden Segment-Unterordner von „Ergebnisse"
   ablegen — sonst nichts in Drive verändern.
4. **Erst nach demselben „FREIGABE"-Kommentar** außerdem **alle** zu diesem
   Aktionstag erhaltenen Original-Fotos (nicht nur die im Post verwendeten)
   über `DesignSync` (`list_files` → `finalize_plan` → `write_files`) in den
   zum Segment passenden Foto-Unterordner des Design-System-Projekts
   (`044c8b4b-076a-4543-930c-a3642c12b3fe`) ablegen:
   - Schule → `froachkids fotos/froachkids Fotos Schulaktionstage/`
   - Kita → `froachkids fotos/froachkids Kitaaktionstage/`
   - Pflege, Projektmodul → `froach Gesundheitstage/`

   Dateinamen sprechend, aber ohne Klarnamen abgebildeter Personen benennen
   (Einrichtung/Anlass/Kurzbeschreibung, analog zu bestehenden Dateien dort).
   Ohne Zustimmung: **keine** Fotos ins Design-System übernehmen — dieselbe
   Datenschutz-Logik wie beim Ergebnis-Ordner gilt hier ebenso, weil die
   Foto-Bibliothek dauerhaft und projektübergreifend sichtbar ist.
5. Eine tatsächliche Instagram-Veröffentlichung ist **nicht** Teil dieses
   Skills — das Hochladen in den Ergebnis-Ordner und ins Design-System sind
   die letzten Schritte.

## Sprache

Mit diesem Nutzer immer auf Deutsch kommunizieren.
