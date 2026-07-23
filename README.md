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
        │  3. Entwurf bauen: Instagram-Post oder -Story (PNG)
        ▼
Private E-Mail an Rafael mit Entwurf — NIE Antwort an den Verteiler
        │
        ▼   (erst nach Rafaels Zustimmung per Mail-Antwort)
Ergebnis-PNG in Drive-Ergebnis-Ordner hochladen (nur dieser eine Ordner)
        +  alle Original-Fotos des Aktionstages zusätzlich in die passende
           Foto-Unterordner des Design-System-Projekts übernehmen
```

Das eigentliche Corporate Design (Farben, Logos, Maskottchen „Froach",
Partner-Logos, Fotos) liegt **nicht** in diesem Repo, sondern bleibt
zentral im Claude-Design-Projekt *„relax & froach Design System"* — das
Skill liest es bei jedem Lauf aktuell aus, statt es zu duplizieren.

## 2. Auslöser (Trigger) — aktueller Stand

Festgelegt: Eingang über eine **externe E-Mail-Adresse** (`rafael.witte@froach.de`,
nicht Gunnars eigenes Konto), geprüft **2× täglich um 12:00 und 18:00 Uhr**,
nur E-Mails mit passendem Betreff-Muster (s. u.). Freigabe läuft **per
E-Mail-Antwort von Rafael** (an dieselbe Adresse geschickt), danach Ablage in
Google Drive — **strikt begrenzt auf genau zwei Unterordner** (Eingang,
Ergebnis), sonst nichts im Drive.

| Baustein | Status | Was noch nötig ist |
|---|---|---|
| **Chat-Nachricht in einer Claude-Code-Session** | ✅ funktioniert direkt | Nichts — Fotos + Infos hier reinschreiben, Skill wird automatisch erkannt. |
| **E-Mail-Eingang (externe Adresse)** | ✅ Gmail-Connector aktiv, verbunden mit `rafael.witte@froach.de` (externes Konto, getrennt von Gunnars eigenem); Routine mit Cron `0 10,16 * * *` (UTC) = 12:00/18:00 Uhr MESZ eingerichtet | Nur Betreffe mit dem Muster „Fotos in Aktion für Social Media" (tolerant) werden als Einsendung gewertet, alles andere im Postfach wird ignoriert. |
| **Google Chat / Spaces** | ⛔ nicht möglich | Kein Connector vorhanden, eigene Google-API — bewusst **nicht** Teil dieses Workflows (s. Diskussion). |
| **Google Drive (2 Unterordner)** | ✅ Connector aktiv, Ordner verifiziert | Nichts weiter — siehe Ordnerstruktur unten. |
| **Slack / Teams** | ⛔ verworfen zugunsten E-Mail | — |

Diese Trigger-Einrichtung ist eine **Produkt-Konfiguration** (siehe
[code.claude.com/docs/en/claude-code-on-the-web](https://code.claude.com/docs/en/claude-code-on-the-web)),
kein Code, den ich in diesem Repo schreibe — deshalb kann ich sie nicht
„committen". Die Verhaltensregeln (Zwei-Ordner-Grenze, private
E-Mail-Freigabe, kein Auto-Post) stehen bereits fest im Skill
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
  Nach Rafaels Freigabe werden Original-Fotos jedoch dauerhaft an zwei
  Stellen außerhalb des Repos abgelegt: dem Drive-Ordner „Ergebnisse" und
  der Foto-Bibliothek des Design-System-Projekts (**alle** eingegangenen
  Fotos des Aktionstages, nicht nur die im Post verwendeten) — deshalb ist
  die Einwilligung vor dieser Freigabe zwingend zu klären, nicht optional.
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
Chat zugeschickt. Connectoren, Ordnerstruktur und die 2×-tägliche
Mail-Prüfung (Routine, Cron `0 10,16 * * *` UTC = 12:00/18:00 Uhr MESZ) sind
eingerichtet — offen ist noch:

1. Bei der Umstellung auf Winterzeit (Ende Oktober) verschiebt sich die
   tatsächliche Laufzeit der Routine um eine Stunde (11:00/17:00 Uhr) — Cron
   dann per `update_trigger` auf `0 11,17 * * *` nachjustieren.

### Ordnerstruktur (verifiziert)

Überordner „**Fotos für Insta**" (auch „Fotos für Social Media" / kurz
**SM**),
[Link](https://drive.google.com/drive/folders/1K0p18K303KVR0dQAp6yMsynXgDP8elmA),
enthält genau zwei relevante Unterordner — lose Dateien direkt im
Überordner gehören nicht zum Workflow und werden ignoriert:

- **Fotos Aktionstage** (Eingang) —
  [Link](https://drive.google.com/drive/folders/1d3wvlAhieickno0yLJ1qkQGDiIdPUvcY)
- **Ergebnisse** (Ausgabe) —
  [Link](https://drive.google.com/drive/folders/1_a2H3UiA6Ex3xS-HAPkQTWPrSutRG_Ec)

Beide gliedern sich identisch in vier Segment-Unterordner: **Schule**,
**Kita**, **Pflege**, **Projektmodul**. Design-seitig gibt es aber nur zwei
Linien — Schule/Kita laufen unter **froachkids**, Pflege/Projektmodul unter
**relax & froach** — bewusst **ohne** eigenes „froachcare"-Logo (Details
siehe SKILL.md Schritt 2).

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
