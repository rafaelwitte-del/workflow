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
6. [Quellen](#6-quellen)

## 1. Wie der Workflow funktioniert

```
Auslöser (Chat-Nachricht / Ordner-Upload / externer Kanal)
        │
        ▼
Skill „aktionstag-post" (.claude/skills/aktionstag-post/SKILL.md)
        │  liest Corporate Design live aus dem Claude-Design-Projekt
        │  „relax & froach Design System"
        ▼
Entwurf: Instagram-Post oder -Story (PNG, passendes Format)
        │
        ▼
Rückmeldung an dich zur Kontrolle — kein Auto-Post
```

Das eigentliche Corporate Design (Farben, Logos, Maskottchen „Froach",
Partner-Logos, Fotos) liegt **nicht** in diesem Repo, sondern bleibt
zentral im Claude-Design-Projekt *„relax & froach Design System"* — das
Skill liest es bei jedem Lauf aktuell aus, statt es zu duplizieren.

## 2. Auslöser (Trigger) — aktueller Stand

Du hattest dich für **externer Kanal (Slack/Teams/E-Mail)** entschieden.
Ehrlicher Zwischenstand dazu, damit keine falschen Erwartungen entstehen:

| Auslöser | Status | Was noch nötig ist |
|---|---|---|
| **Chat-Nachricht in einer Claude-Code-Session** | ✅ funktioniert direkt | Nichts — einfach Fotos + Infos hier reinschreiben, Skill wird automatisch erkannt. |
| **E-Mail** | 🟡 Gmail-Connector ist im Account vorhanden, aber für diesen Chat nicht aktiviert | Connector aktivieren + einen **Trigger** in den Claude-Code-Einstellungen anlegen, der bei neuer Mail (z. B. an eine feste Adresse/mit festem Betreff) eine neue Session mit diesem Skill startet. |
| **Slack** | ⛔ kein Connector im Account gefunden | Slack müsste erst als Connector verbunden werden, danach analog per Trigger einrichten. |
| **Teams** | ⛔ kein Connector im Account gefunden | Aktuell kein offizieller Teams-Connector — müsste geprüft werden, ob/wie das technisch machbar ist. |
| **Ordner-Upload (z. B. Google Drive)** | ⛔ noch nicht eingerichtet | Braucht einen Drive-Connector + einen Trigger, der auf neue Dateien in einem bestimmten Ordner reagiert. |

Diese Trigger-Einrichtung ist eine **Produkt-Konfiguration** (siehe
[code.claude.com/docs/en/claude-code-on-the-web](https://code.claude.com/docs/en/claude-code-on-the-web)),
kein Code, den ich in diesem Repo schreibe — deshalb kann ich sie nicht
„committen". Ich helfe dir gerne beim Einrichten, sobald du sagst, mit
welchem Kanal wir anfangen (Vorschlag: E-Mail zuerst, da der Gmail-Connector
schon vorhanden ist).

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

Bitte einmal bestätigen bzw. entscheiden:

1. Mit welchem externen Kanal fangen wir an (E-Mail über Gmail wäre am
   schnellsten realisierbar)?
2. Sollen fertige Bilder zusätzlich automatisch in einem bestimmten Ordner
   abgelegt werden, oder reicht die Zusendung im Chat/per Mail?
3. Soll ich testweise mit einem vorhandenen Foto aus dem Design-System
   (z. B. aus `froachkids fotos/` oder `froach Gesundheitstage/`) einmal
   einen Beispiel-Post erstellen, damit du das Layout beurteilen kannst?

## 6. Quellen

- § 20 SGB V (Primäre Prävention und Gesundheitsförderung) — [gesetze-im-internet.de/sgb_5/__20.html](https://www.gesetze-im-internet.de/sgb_5/__20.html)
- §§ 22 f. Kunsturhebergesetz (KunstUrhG) — Recht am eigenen Bild
- Verordnung (EU) 2016/679 (DSGVO), insb. Art. 6, Art. 8, Art. 9
- Claude-Design-Projekt „relax & froach Design System" (projectId
  `044c8b4b-076a-4543-930c-a3642c12b3fe`), README.md, CLAUDE.md, SKILL.md
  darin
- [code.claude.com/docs/en/claude-code-on-the-web](https://code.claude.com/docs/en/claude-code-on-the-web) — Trigger/Connector-Konfiguration
