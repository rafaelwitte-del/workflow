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
Gunnar (`gunnar.reinhardt@froach.de`), sondern ein separates Postfach, an
das mehrere Kolleg:innen schicken können.

- Adresse: `<EINGANGS_ADRESSE — noch zu benennen>` — läuft über einen
  **anderen Google-Account als Gunnars eigenen** (`gunnar.reinhardt@froach.de`
  wird explizit nicht dafür verwendet). Muss ein Google-/Gmail-Postfach sein,
  damit der Gmail-Connector greift; andere Mail-Anbieter werden aktuell nicht
  unterstützt. Beim Autorisieren des Gmail-Connectors in den
  Claude-Verbindungseinstellungen im Google-Login-Bildschirm **dieses externe
  Konto** auswählen/eingeben (nicht Gunnars persönliches) — dafür werden die
  Zugangsdaten dieses externen Kontos benötigt.
- Kein Sofort-Trigger bei Mail-Eingang möglich — stattdessen **zeitgesteuerte
  Prüfung 2× täglich, 12:00 und 18:00 Uhr**. Bei jedem Lauf: seit dem letzten
  Lauf neu eingegangene Mails an diese Adresse mit Foto-Anhang sichten.
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

**Freigabe — per E-Mail, privat.**
Nach Erstellung wird der Entwurf **privat per E-Mail an Gunnar** geschickt
(nie als Antwort an den Verteiler/die Absender-Gruppe der Eingangs-Mail).
Erst nach ausdrücklicher Zustimmung per E-Mail-Antwort wird das Ergebnis in
den Ergebnis-Ordner (s. o.) hochgeladen. Ohne Zustimmung: nichts hochladen,
nichts an Dritte weitergeben.

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
professionellen Linie (relax & froach/froachcare). Beide Linien niemals
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
Nach Gunnars Freigabe (siehe Schritt 6) werden die Original-Fotos jedoch
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
   anwenden (arch-förmige Karte bei relax & froach/froachcare, verspielteres
   Layout mit Maskottchen bei froachkids), Anlass/Datum/Ort als Textebene,
   Partner-Logo nur falls in Schritt 3 bestätigt.
3. Als PNG in der Zielauflösung rendern (z. B. Headless-Chromium-Screenshot
   oder das `canvas-design`-Skill als Alternative, wenn ein freieres,
   illustratives Layout gewünscht ist statt eines HTML-Templates).
4. Kurzen Bildtext-/Caption-Vorschlag danebenstellen (deutsch, Ton laut
   Segment), inkl. `#relaxundfroach`-artiger Hashtag-Vorschläge — als Text im
   Chat, nicht ins Bild einbrennen, außer gewünscht.

## 6. Ausgabe — niemals automatisch posten

1. Fertiges Bild aus dem Eingangs-Ordner-Lauf (und optionalen
   Caption-Text-Vorschlag) **privat per E-Mail an Gunnar** schicken — niemals
   an den Verteiler/die Absender-Gruppe zurück. Deutlich kennzeichnen:
   „Entwurf zur Kontrolle — noch nicht gepostet, noch nicht in Drive
   abgelegt."
2. Warten auf Gunnars Zustimmung **als Antwort auf genau diese Mail**.
   Kein Hochladen ohne diese Bestätigung.
3. Nach Zustimmung: Ergebnis-PNG (und ggf. Caption als Textdatei) in den
   Ergebnis-Ordner (siehe 0a) hochladen — sonst nichts in Drive verändern.
4. **Erst nach derselben Zustimmung** außerdem **alle** zu diesem Aktionstag
   erhaltenen Original-Fotos (nicht nur die im Post verwendeten) über
   `DesignSync` (`list_files` → `finalize_plan` → `write_files`) in den zum
   Segment passenden Foto-Unterordner des Design-System-Projekts
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
