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
Private E-Mail an Gunnar mit Entwurf — NIE Antwort an den Verteiler
        │
        ▼   (erst nach Zustimmung per Mail-Antwort)
Ergebnis-PNG in Drive-Ergebnis-Ordner hochladen (nur dieser eine Ordner)
```

Das eigentliche Corporate Design (Farben, Logos, Maskottchen „Froach",
Partner-Logos, Fotos) liegt **nicht** in diesem Repo, sondern bleibt
zentral im Claude-Design-Projekt *„relax & froach Design System"* — das
Skill liest es bei jedem Lauf aktuell aus, statt es zu duplizieren.

## 2. Auslöser (Trigger) — aktueller Stand

Festgelegt: Eingang über eine **externe E-Mail-Adresse** (nicht Gunnars
eigenes Konto), geprüft **2× täglich um 12:00 und 18:00 Uhr**. Freigabe läuft
**per E-Mail-Antwort**, danach Ablage in Google Drive — **strikt begrenzt auf
genau zwei Ordner** (Eingang, Ergebnis), sonst nichts im Drive.

| Baustein | Status | Was noch nötig ist |
|---|---|---|
| **Chat-Nachricht in einer Claude-Code-Session** | ✅ funktioniert direkt | Nichts — Fotos + Infos hier reinschreiben, Skill wird automatisch erkannt. |
| **E-Mail-Eingang (externe Adresse)** | 🟡 Gmail-Connector im Account vorhanden, aber für diesen Chat nicht aktiviert; externe Adresse noch nicht benannt | 1) Externe Adresse festlegen (muss ein Gmail-/Google-Workspace-Postfach sein), 2) Gmail-Connector für diese Adresse autorisieren, 3) Routine mit Cron `0 12,18 * * *` einrichten. |
| **Google Chat / Spaces** | ⛔ nicht möglich | Kein Connector vorhanden, eigene Google-API — bewusst **nicht** Teil dieses Workflows (s. Diskussion). |
| **Google Drive (2 Ordner)** | 🟡 Connector vorhanden, nicht aktiviert; Ordner-IDs noch nicht benannt | Eingangs- und Ergebnis-Ordner benennen/verlinken, Connector idealerweise per Ordner-Picker nur auf diese zwei Ordner autorisieren. |
| **Slack / Teams** | ⛔ verworfen zugunsten E-Mail | — |

Diese Trigger-Einrichtung ist eine **Produkt-Konfiguration** (siehe
[code.claude.com/docs/en/claude-code-on-the-web](https://code.claude.com/docs/en/claude-code-on-the-web)),
kein Code, den ich in diesem Repo schreibe — deshalb kann ich sie nicht
„committen". Die Verhaltensregeln (Zwei-Ordner-Grenze, private
E-Mail-Freigabe, kein Auto-Post) stehen bereits fest im Skill
(`.claude/skills/aktionstag-post/SKILL.md`, Abschnitt „0a").

## 3. Was du mitschicken solltest

- Format: **Post** oder **Story**
- Segment: **Kita/Schule** oder **Pflege/Firma**
- Anlass/Titel, Datum, Ort/Einrichtung
- Sponsor/Kostenträger — **nur nennen, wenn dessen Logo aufs Bild soll**
  (siehe Abschnitt 4 im Skill: Partner-Logos werden sonst nie automatisch
  eingebaut)
- Die Fotos selbst
- Optional: 1–2 Sätze, was beim Aktionstag gemacht wurde

Details und der volle Ablauf stehen in
[`.claude/skills/aktionstag-post/SKILL.md`](.claude/skills/aktionstag-post/SKILL.md).

## 4. Rechtliches / Datenschutz

- Der Workflow speichert **keine personenbezogenen Daten** dauerhaft in
  diesem Repo.
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
Chat zugeschickt. Noch konkret zu klären, bevor der Workflow scharf
geschaltet werden kann:

1. **Externe Eingangs-Adresse:** Welche Gmail-/Google-Workspace-Adresse
   (auf einem anderen Konto als `gunnar.reinhardt@froach.de`) nutzt ihr —
   existiert sie schon, oder muss sie neu angelegt werden? Siehe
   „Konten & Connector-Autorisierung" unten zum genauen Ablauf.
2. **Zwei Drive-Ordner:** Namen stehen fest — „**Fotos Instagram**"
   (Eingang) und „**Ergebnisse**" (Ausgabe) — Link/ID der beiden Ordner
   fehlt noch, sobald du den Zugriff gibst.
3. Beide Connectoren (Gmail für die externe Adresse, Google Drive) müssen
   einmal für diesen Chat autorisiert werden — das kann nur du in den
   Connector-Einstellungen tun.

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
