# Aktionstag-Post-Workflow (relax & froach)

Automatisiert die Erstellung von Instagram-Posts/-Stories aus Fotos eurer
Aktionstage (Kita, Schule, Pflege, Firmen) im relax & froach Corporate Design —
zur Kontrolle, nicht zur automatischen Veröffentlichung.

## Inhaltsverzeichnis

1. [Wie der Workflow funktioniert](#1-wie-der-workflow-funktioniert)
2. [Auslöser (Trigger) — aktueller Stand](#2-ausl%C3%B6ser-trigger--aktueller-stand)
3. [Was du mitschicken solltest](#3-was-du-mitschicken-solltest)
4. [Rechtliches / Datenschutz](#4-rechtliches--datenschutz)
5. [Offene Punkte](#5-offene-punkte)
6. [Konten & Connector-Autorisierung](#konten--connector-autorisierung-e-mail-über-anderes-konto)
7. [Google Chat als Auslöser — Ergebnis der Prüfung](#google-chat-als-auslöser--ergebnis-der-prüfung)
8. [Quellen](#6-quellen)

## 1. Wie der Workflow funktioniert

```
Externe E-Mail-Adresse (nicht Gunnars Konto)
   — Fotos + Sponsor/Datum/Infos im Mailtext —
        │
        ▼   (zeitgesteuerte Prüfung: 12:00 & 18:00 Uhr, kein Sofort-Trigger)
Skill „aktionstag-post" (.claude/skills/aktionstag-post/SKILL.md)
        │  1. Foto(s) in Drive-Eingangs-Ordner ablegen (nur dieser eine Ordner)
        │  2. Corporate Design live aus dem Claude-Design-Projekt
        │     „relax & froach Design System" lesen
        │  3. Entwurf bauen: Instagram-Post oder -Story (PNG) + Caption
        ▼
Entwurf in einem NEUEN, eigenen Design-Projekt „Aktionstag <Segment>
<Datum> ..." — Rafael kann dort direkt weiterarbeiten
        │
        ▼   (erst nach Rafaels „Freigabe" per Chat-Nachricht)
Original-Foto(s) des Aktionstages UND jedes vom Partner mitgeschickte Foto
werden dauerhaft in die Foto-Bibliothek des GEMEINSAMEN Design-System-
Projekts übernommen (der Post selbst bleibt im neuen Einzelprojekt)
```

**Hinweis zum Freigabeweg (Stand 24.07.2026):** Der Gmail-Connector kann
laut eigener Beschreibung nur Entwürfe anlegen, Threads zusammenfassen und
das Postfach durchsuchen — **kein tatsächliches Versenden**. Google Drive
wiederum kann von mir aus **keine Bild-Assets entgegennehmen** — dazu unten
mehr. Deshalb läuft alles über das **Design-System-Projekt**: Der Entwurf
wird dort abgelegt, Rafael sieht ihn direkt in der Design-System-Ansicht
und gibt sein Go **per Chat-Nachricht mit dem Wort „Freigabe"** (nicht per
Kommentar, da das Design-System-Werkzeug keine Kommentare ausliest).

**⚠ Zwei nacheinander entdeckte Blockaden (23.–24.07.2026, am 24.07. erneut
bestätigt):**
1. **Google Drive:** `create_file` verlangt den Dateiinhalt komplett inline
   im Werkzeugaufruf (kein `localPath` wie bei `DesignSync`), keinen
   Datei-Pfad-Parameter und keinen Chunk-/Resumable-Upload — Bild-Daten sind
   dafür immer zu groß. Google Drive scheidet als Ablageort für fertige
   Bilder daher **endgültig** aus.
2. **Design-System-Schreibzugriff:** `DesignSync write_files`/`create_project`
   verlangen eine interaktive Autorisierung (`/design-login`), die eine
   Hintergrund-Sitzung nicht selbst auslösen kann. Rafael/Gunnar muss
   einmalig über die Design-System-Oberfläche auf claude.ai eine Funktion
   wie „Send to Claude Code Web" nutzen, um einer Sitzung Schreibzugriff zu
   geben — bis dahin bleibt auch dieser Weg blockiert.
3. **Claude Cowork:** ebenfalls getestet, löst das Problem nicht — gleiche
   Upload-Einschränkung wie in Claude Code.

**Update 25.07.2026 — Leseseite entschärft, Schreibseite weiterhin offen.**
Gunnar hat einen Zip-Export des Design-System-Projekts bereitgestellt (statt
der blockierten interaktiven Autorisierung). Der Export liegt jetzt lokal
unter [`.claude/skills/aktionstag-post/design-system/`](.claude/skills/aktionstag-post/design-system/)
(Tokens, Logo-Assets inkl. `froachkids-lockup.png`, Fonts,
Referenz-Komponenten). Damit kann der Skill **Schritt 0** (Branding lesen)
jetzt ohne Live-`DesignSync`-Autorisierung erledigen — das war zuvor nur
lesend möglich, wenn eine Session zufällig schon Zugriff hatte.

Das ändert **nichts** an Blockade 2 oben: Neue Design-Projekte pro Post
anlegen (Schritt 0a.1) und freigegebene Original-Fotos in die gemeinsame
Foto-Bibliothek zurückschreiben (Schritt 6) sind **Schreib**-Operationen und
bleiben ohne „Send to Claude Code Web"-Autorisierung blockiert. Der Zip-Export
ist außerdem ein **statischer Snapshot vom 25.07.2026** — kein Live-Spiegel;
bei Branding-Änderungen muss Gunnar einen neuen Export nachliefern (Details
und Lücken-Hinweise in `design-system/README.md` und Abschnitt „0" des
Skills).

**Wichtige Klarstellung (24.07.2026):** Der fertige Post/die Story landet
**nicht** im gemeinsamen Design-System-Projekt „relax & froach Design
System" — das bleibt die geteilte Marken-Bibliothek. Stattdessen legt
`DesignSync create_project` für **jeden Aktionstag-Post ein eigenes, neues
Design-Projekt** an, das Rafael dort direkt weiterbearbeiten kann. Nur die
Original-Fotos (Einsendung + alles vom Partner) wandern nach „Freigabe" in
die Foto-Bibliothek des gemeinsamen Design-System-Projekts.

Das eigentliche Corporate Design (Farben, Logos, Maskottchen „Froach",
Partner-Logos, Fotos) liegt **nicht** in diesem Repo, sondern bleibt
zentral im Claude-Design-Projekt *„relax & froach Design System"* — das
Skill liest es bei jedem Lauf aktuell aus, statt es zu duplizieren.

## 2. Auslöser (Trigger) — aktueller Stand

Festgelegt: Eingang über eine **externe E-Mail-Adresse** (`rafael.witte@froach.de`,
nicht Gunnars eigenes Konto), geprüft **2× täglich um 12:00 und 18:00 Uhr**,
nur E-Mails mit passendem Betreff-Muster (s. u.). Freigabe läuft **per
Chat-Nachricht „Freigabe" von Rafael**, danach Ablage **im
Design-System-Projekt** (nicht mehr in Google Drive — s. o.).

| Baustein | Status | Was noch nötig ist |
|---|---|---|
| **Chat-Nachricht in einer Claude-Code-Session** | ✅ funktioniert direkt | Nichts — Fotos + Infos hier reinschreiben, Skill wird automatisch erkannt. |
| **E-Mail-Eingang (externe Adresse)** | ✅ Gmail-Connector aktiv, verbunden mit `rafael.witte@froach.de` (externes Konto, getrennt von Gunnars eigenem); Routine mit Cron `0 10,16 * * *` (UTC) = 12:00/18:00 Uhr MESZ eingerichtet | Nur Betreffe mit dem Muster „Fotos in Aktion für Social Media" (tolerant) werden als Einsendung gewertet, alles andere im Postfach wird ignoriert. |
| **Google Chat / Spaces** | ⛔ nicht möglich | Kein Connector vorhanden, eigene Google-API — bewusst **nicht** Teil dieses Workflows (s. Diskussion). |
| **Google Drive** | ⛔ als Ablageort für fertige Bilder ausgeschieden | `create_file` kann keine Bild-Assets entgegennehmen (s. o.) — Drive wird für diesen Workflow nicht mehr aktiv genutzt. |
| **Design-System-Projekt (Ablage + Freigabe)** | 🟡 Lesen funktioniert, Schreiben blockiert | Rafael/Gunnar muss einmalig „Send to Claude Code Web" aus der Design-System-Oberfläche auslösen, um Schreibzugriff zu autorisieren. |
| **Slack / Teams** | ⛔ verworfen zugunsten E-Mail | — |
| **Claude Cowork** | ⛔ getestet, löst das Problem nicht | Gleiches Upload-Problem wie bei Claude Code (Stand 24.07.2026). |

Diese Trigger-Einrichtung ist eine **Produkt-Konfiguration** (siehe
[code.claude.com/docs/en/claude-code-on-the-web](https://code.claude.com/docs/en/claude-code-on-the-web)),
kein Code, den ich in diesem Repo schreibe — deshalb kann ich sie nicht
„committen". Die Verhaltensregeln (Zugriffsgrenzen, Freigabe-Stichwort,
kein Auto-Post) stehen bereits fest im Skill
(`.claude/skills/aktionstag-post/SKILL.md`, Abschnitt „0a").

## 3. Was du mitschicken solltest

- Format: **Post** oder **Story**
- Segment: **Schule**, **Kita**, **Pflege** oder **Projektmodul** (Schule/Kita
  = froachkids-Design, Pflege/Projektmodul = relax & froach-Design, **ohne**
  eigenes „froachcare"-Logo)
- Anlass/Titel, Datum, Ort/Einrichtung
- Sponsor/Kostenträger — **nur nennen, wenn dessen Logo aufs Bild soll**
  (siehe Abschnitt 3 im Skill: Partner-Logos werden sonst nie automatisch
  eingebaut). Liegt der Mail direkt eine Partner-Logo-Datei bei, gilt das
  bereits als die nötige Freigabe fürs Bild; neue Partner-Logos werden dabei
  zusätzlich dauerhaft im Design-System-Projekt abgelegt.
- Die Fotos selbst
- Optional: 1–2 Sätze, was beim Aktionstag gemacht wurde

Ein kurzer Caption-Vorschlag wird von mir **immer** mitgeliefert, unabhängig
davon, was du mitschickst — das ist fester Bestandteil jedes Entwurfs.

Details und der volle Ablauf stehen in
[`.claude/skills/aktionstag-post/SKILL.md`](.claude/skills/aktionstag-post/SKILL.md).

## 4. Rechtliches / Datenschutz

- Der Workflow speichert **keine personenbezogenen Daten in diesem Repo**.
  Nach Rafaels Freigabe werden Original-Fotos jedoch dauerhaft in der
  Foto-Bibliothek des Design-System-Projekts abgelegt — **sowohl** das/die
  eingesendete(n) Foto(s) **als auch** jedes vom Partner mitgeschickte Foto
  (nicht nur die im Post verwendeten) — deshalb ist die Einwilligung vor
  dieser Freigabe zwingend zu klären, nicht optional.
- Bei Fotos von **Kindern** (Kita/Schule) wird vor Erstellung nach
  Einwilligung der Erziehungsberechtigten gefragt (Recht am eigenen Bild,
  §§ 22 f. KunstUrhG; DSGVO Art. 6, ggf. Art. 8).
- Bei Fotos aus **Pflegeeinrichtungen** wird zusätzlich auf besondere
  Sensibilität hingewiesen (Art. 9 DSGVO — besondere Kategorien
  personenbezogener Daten), da im Kontext ggf. Gesundheitsbezüge erkennbar
  sind.
- Die meisten dieser Aktionstage dürften im Rahmen der **primären
  Prävention und betrieblichen Gesundheitsförderung nach § 20 SGB V**
  (Leistungen der Krankenkassen zur Verhütung und Verminderung von
  Krankheitsrisiken) stattfinden — daher vermutlich auch die Kostenträger
  als „Sponsoren". Das ist der Hintergrund, ändert aber nichts an der
  Logo-Zurückhaltungsregel.

## 5. Offene Punkte

Layout-Beispiele (Post 4:5 + Story, ohne Fotos) sind erstellt und dir per
Chat zugeschickt. Die 2×-tägliche Mail-Prüfung (Routine, Cron
`0 10,16 * * *` UTC = 12:00/18:00 Uhr MESZ) ist eingerichtet — offen ist
noch:

1. **Wichtigster offener Punkt (nur noch Schreibseite):** Rafael/Gunnar muss
   einmalig „Send to Claude Code Web" aus der Design-System-Oberfläche auf
   claude.ai auslösen, damit ich Schreibzugriff auf das Design-System
   bekomme — ohne das kann weder ein neues Einzelprojekt für einen Post
   angelegt noch etwas in die gemeinsame Foto-Bibliothek geschrieben werden
   (siehe Abschnitt 1). Die Leseseite (Branding/Tokens/Logos) ist seit
   25.07.2026 durch den lokalen Zip-Snapshot in
   `.claude/skills/aktionstag-post/design-system/` entschärft (s. o.) — bleibt
   aber ein statischer Stand, kein Ersatz für die Schreib-Autorisierung.
   Google Drive ist dagegen endgültig raus (s. o.), da hilft auch keine
   erneute Prüfung mehr.
2. **Winterzeit-Umstellung (Sonntag, 25.10.2026, 3:00 → 2:00 Uhr):** Der
   Cron `0 10,16 * * *` (UTC) läuft ab diesem Zeitpunkt real zu 11:00/17:00
   Uhr MEZ statt 12:00/18:00 Uhr — die UTC-Zeit bleibt gleich, nur die
   lokale Uhrzeit verschiebt sich um eine Stunde nach vorn. Rechtzeitig vor
   dem 25.10.2026 per `update_trigger` auf `0 11,17 * * *` (UTC) anpassen.
   Empfehlung: Kalendererinnerung für den 24.10.2026 setzen — bisher noch
   nicht umgesetzt.

### Ordnerstruktur — Google Drive (nicht mehr aktiv genutzt)

Überordner „**Fotos für Insta**" (auch „Fotos für Social Media" / kurz
**SM**),
[Link](https://drive.google.com/drive/folders/1K0p18K303KVR0dQAp6yMsynXgDP8elmA),
mit den ursprünglich vorgesehenen Unterordnern „Fotos Aktionstage" (Eingang)
und „Ergebnisse" (Ausgabe). Seit 24.07.2026 ist Drive für die Ausgabe **kein
aktives Ziel mehr** (s. Abschnitt 1) — der Ordner bleibt vorerst nur als
Altlast/Referenz bestehen.

### Ablage — Design-System (aktueller Weg)

**Post/Story selbst:** eigenes, neues Design-Projekt pro Aktionstag
(`DesignSync create_project`, Name z. B. „Aktionstag <Segment> <Datum>
<Kurztitel>") — getrennt von der gemeinsamen Marken-Bibliothek, damit
Rafael dort direkt weiterarbeiten kann, ohne die Bibliothek zu verändern.

**Fotos:** Nach Rafaels „Freigabe" (per Chat, nicht per Kommentar) werden
das/die eingesendete(n) Foto(s) **und** jedes vom Partner mitgeschickte
Foto in die Foto-Bibliothek des **gemeinsamen** Claude-Design-Projekts
„relax & froach Design System" (`044c8b4b-076a-4543-930c-a3642c12b3fe`)
übernommen — vier Segmente (**Schule**, **Kita**, **Pflege**,
**Projektmodul**), aber nur zwei Design-Linien: Schule/Kita = **froachkids**,
Pflege/Projektmodul = **relax & froach** — bewusst **ohne** eigenes
„froachcare"-Logo (Details siehe SKILL.md Schritt 2).

## Konten & Connector-Autorisierung (E-Mail über anderes Konto)

Du wolltest wissen, wie das mit dem externen Konto (nicht
`gunnar.reinhardt@froach.de`) technisch funktioniert:

- Der Gmail-Connector in Claude ist an irgendein Google-Konto gebunden,
  nicht zwingend an dein Claude-Login. Beim Autorisieren öffnet sich ein
  normaler Google-Login-Bildschirm — dort meldest du dich **mit dem
  externen Konto** an (nicht mit deinem persönlichen), sofern du dessen
  Zugangsdaten hast bzw. darauf zugreifen kannst. Danach liest der
  Connector genau dieses externe Postfach.
- Alternative, falls ihr das externe Postfach nicht direkt anmelden wollt:
  Google-Workspace-Postfachzugriff/Delegation auf ein Konto einrichten,
  das der Connector schon nutzt — technisch aufwendiger und nur innerhalb
  derselben Google-Workspace-Domain möglich.
- Praktisch einfachster Weg: externes Konto direkt beim Connector-Login
  verwenden.

## Google Chat als Auslöser — Ergebnis der Prüfung

Nicht möglich mit den aktuell installierten Connectoren (Gmail, Google
Drive, Google Calendar, Canva) — kein Google-Chat/Spaces-Connector
vorhanden. Die Registry-Suche nach zusätzlichen Connectoren ist in den
Claude-Einstellungen aktuell deaktiviert („Connector-Vorschläge"); du
kannst das selbst aktivieren oder im Connector-Verzeichnis auf claude.ai
nachsehen — nach aktuellem Stand gehört Google Chat/Spaces aber nicht zu
den gängigen verfügbaren Connectoren.

## 6. Quellen

- § 20 SGB V (Primäre Prävention und Gesundheitsförderung) — [gesetze-im-internet.de/sgb_5/__20.html](https://www.gesetze-im-internet.de/sgb_5/__20.html)
- §§ 22 f. Kunsturhebergesetz (KunstUrhG) — Recht am eigenen Bild
- Verordnung (EU) 2016/679 (DSGVO), insb. Art. 6, Art. 8, Art. 9
- Claude-Design-Projekt „relax & froach Design System" (projectId
  `044c8b4b-076a-4543-930c-a3642c12b3fe`), README.md, CLAUDE.md, SKILL.md
  darin
- [code.claude.com/docs/en/claude-code-on-the-web](https://code.claude.com/docs/en/claude-code-on-the-web) — Trigger/Connector-Konfiguration
