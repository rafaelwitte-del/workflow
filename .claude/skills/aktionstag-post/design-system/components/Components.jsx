// Marketing UI Kit — Top Nav, Hero, Segments, Footer
// Pixel-reference: 2023 Branding Guide + froach.de conventions.

const C = {
  brand: "#044894", dark: "#053570", heavy: "#001E41", blue3: "#004A84",
  relax: "#0275F2", capri: "#43B3EF", iced: "#A3DFFF", iced50: "#E9F5FF", iced25: "#F6FBFF",
  green: "#94CE0E", lightGreen: "#BCF240",
  coral: "#FF735A", softCoral: "#FFC3B8", mustard: "#FAD26B",
  grau: "#9DB6D2", darkGrau: "#213E79", white: "#FFFFFF",
};

// froach-icon helper: SVG-via-mask so we can color-tint with any brand color.
export function Icon({ name, size = 20, color = "currentColor", style = {} }) {
  const url = `../../assets/icons/froach/${name}.svg`;
  return (
    <span aria-hidden="true" style={{
      display: "inline-block", width: size, height: size,
      background: color,
      WebkitMask: `url(${url}) center/contain no-repeat`,
      mask: `url(${url}) center/contain no-repeat`,
      flexShrink: 0,
      ...style,
    }} />
  );
}

export function TopNav() {
  return (
    <header style={{
      padding: "20px 48px",
      display: "flex", alignItems: "center", gap: 32,
      background: C.white,
      borderBottom: `1px solid ${C.iced50}`,
    }}>
      <img src="../../assets/logos/logo-primary.png" style={{ height: 40 }} />
      <nav style={{ display: "flex", gap: 28, marginLeft: 32 }}>
        {["Lösungen", "Für Kitas", "Für Schulen", "Für Organisationen", "Für Pflege", "Über uns"].map(t => (
          <a key={t} href="#" style={{ color: C.heavy, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>{t}</a>
        ))}
      </nav>
      <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
        <a href="#" style={{ color: C.capri, fontSize: 14, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2, display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Icon name="person" size={16} color={C.capri} />
          Anmelden
        </a>
        <button style={{
          background: C.green, color: C.heavy, border: "none",
          padding: "12px 22px", borderRadius: 999, fontWeight: 600, fontSize: 14,
          cursor: "pointer", fontFamily: "inherit",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          <Icon name="calendar" size={16} color={C.heavy} />
          Demo buchen
        </button>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section style={{
      minHeight: 520,
      padding: "96px 48px",
      backgroundImage: `linear-gradient(rgba(0,57,124,0.82), rgba(0,30,65,0.82)), url('../../assets/images/bg-hero-01.jpg')`,
      backgroundSize: "cover", backgroundPosition: "center",
      color: C.white, position: "relative",
    }}>
      <div style={{ maxWidth: 760 }}>
        <div style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: C.iced, marginBottom: 20 }}>
          Gesundheitsmanagement · 2024
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0, color: C.white }}>
          Bewusste Pausen für <span style={{ color: C.green }}>jede Lebensphase.</span>
        </h1>
        <p style={{ fontSize: 20, fontWeight: 300, lineHeight: 1.5, color: "rgba(255,255,255,0.82)", marginTop: 24, maxWidth: 600 }}>
          Schulen, Organisationen, Pflege — mit froach als lebenslangem Begleiter. Spielerische Bewegung und Entspannung, wissenschaftlich begleitet.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
          <button style={{ background: C.green, color: C.heavy, border: "none", padding: "16px 30px", borderRadius: 999, fontWeight: 600, fontSize: 16, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <Icon name="check" size={18} color={C.heavy} />
            Pilot anfragen
          </button>
          <button style={{ background: "transparent", color: C.white, border: `1.5px solid ${C.white}`, padding: "16px 30px", borderRadius: 999, fontWeight: 600, fontSize: 16, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 10 }}>
            Case Studies
            <Icon name="arrow-right" size={18} color={C.white} />
          </button>
        </div>
      </div>
    </section>
  );
}

export function SegmentCards() {
  // Note: bis authentische Foto-Materialien für Kitas + Schulen geliefert werden,
  // setzen wir hier illustrative Farb-Treatments mit Icon ein (statt schlecht
  // passender Stock-Fotos). Organisation + Pflege nutzen bestehende Foto-Quellen.
  const segs = [
    { label: "Kitas", color: C.capri, icon: "body-child",
      bg: `linear-gradient(160deg, ${C.iced} 0%, ${C.capri} 60%, ${C.relax} 100%)`,
      placeholder: true,
      body: "Frühkindliche Bewegungs- und Entspannungsimpulse begleiten Kinder spielerisch durch den Kita-Alltag — altersgerecht, ritualisiert, mit Freude an der Bewegung.",
      note: "Konzept mit Trägern in Erprobung" },
    { label: "Schulen", color: C.mustard, icon: "book",
      bg: `linear-gradient(160deg, #FFE9A8 0%, ${C.mustard} 55%, ${C.coral} 100%)`,
      placeholder: true,
      body: "Spielerische Bewegungs- und Entspannungspausen direkt am Whiteboard im Unterricht wirken ausgleichend, fördern die Lernfähigkeit und steigern das Gemeinschaftsgefühl.",
      note: "Pilotierung mit GKV erfolgreich abgeschlossen" },
    { label: "Organisation", color: C.coral, icon: "person",
      bg: `linear-gradient(rgba(0,57,124,0.75), rgba(0,30,65,0.85)), url('../../assets/images/bg-hero-01.jpg')`,
      body: "Bewusste Pausen während der Arbeitszeit fördern im Sinne einer gesunden Organisationskultur das physische & mentale Wohlbefinden der Mitarbeitenden.",
      note: "Rollout mit 12 Partnern" },
    { label: "Pflege", color: C.green, icon: "heart",
      bg: `linear-gradient(rgba(0,57,124,0.75), rgba(0,30,65,0.85)), url('../../assets/images/bg-breath.jpg')`,
      body: "Altersspezifische Bewegungs-, Kognitions- und Koordinationstechniken fördern das gesunde Altern und unterstützen Seniorinnen, Pflegebedürftige und Pflegende.",
      note: "Pilotierung mit GKV erfolgreich abgeschlossen" },
  ];
  return (
    <section style={{ padding: "96px 48px", background: C.white }}>
      <h2 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1, color: C.green, margin: 0 }}>Wachstum durch weitere Zielgruppen</h2>
      <p style={{ fontSize: 22, fontWeight: 500, color: C.heavy, marginTop: 12, marginBottom: 56, maxWidth: 640 }}>
        Mit froach als lebenslangem Begleiter weitere wachsende Marktsegmente bespielen.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
        {segs.map(s => (
          <div key={s.label} style={{
            borderRadius: "50% 50% 13px 13px / 25% 25% 13px 13px",
            background: s.bg,
            backgroundSize: "cover", backgroundPosition: "center",
            padding: "130px 28px 36px",
            minHeight: 520,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            color: C.white, position: "relative", overflow: "hidden",
          }}>
            {s.placeholder && (
              <div style={{
                position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)",
                width: 140, height: 140, borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name={s.icon} size={70} color="rgba(255,255,255,0.95)" />
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              {!s.placeholder && <Icon name={s.icon} size={26} color={s.color} />}
              <h3 style={{ fontSize: 26, fontWeight: 600, color: s.placeholder ? C.white : s.color, margin: 0 }}>{s.label}</h3>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.92)", margin: 0 }}>{s.body}</p>
            <div style={{
              fontFamily: "Caveat, cursive", fontSize: 22, lineHeight: 1.1,
              color: C.white, marginTop: 22, opacity: 0.92,
            }}>{s.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    { icon: "breath", title: "Atemübungen", body: "Geführte Mikro-Pausen zur Regulation des vegetativen Nervensystems." },
    { icon: "meditation", title: "Meditation", body: "Kurze Achtsamkeitssequenzen, integriert in den Arbeits- und Schultag." },
    { icon: "calm", title: "Entspannung", body: "Progressive Muskelentspannung und Körperreisen für zwischendurch." },
    { icon: "heart", title: "Bewegung", body: "Altersspezifische Kräftigung, Koordination und Mobilisation." },
    { icon: "book", title: "Wissen", body: "Wissenschaftlich begleitete Inhalte — verständlich aufbereitet." },
    { icon: "check", title: "Nachweise", body: "Teilnahme-Zertifikate und Fortschritts-Tracking für Teams." },
  ];
  return (
    <section style={{ padding: "96px 48px", background: C.iced25 }}>
      <div style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: C.brand, marginBottom: 14 }}>
        Was froach bietet
      </div>
      <h2 style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.15, color: C.heavy, margin: 0, maxWidth: 680 }}>
        Sechs Bausteine für bewusste Pausen.
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginTop: 48 }}>
        {items.map(it => (
          <div key={it.title} style={{
            background: C.white, borderRadius: 13, padding: "32px 28px",
            boxShadow: "0 4px 17px rgba(1,51,78,0.06)",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: C.iced50, display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 18,
            }}>
              <Icon name={it.icon} size={28} color={C.brand} />
            </div>
            <h4 style={{ fontSize: 19, fontWeight: 600, color: C.heavy, margin: "0 0 8px" }}>{it.title}</h4>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: C.darkGrau, margin: 0 }}>{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ background: C.heavy, color: C.white, padding: "64px 48px 40px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <img src="../../assets/logos/logo-primary.png" style={{ height: 44, filter: "brightness(0) invert(1)" }} />
          <p style={{ marginTop: 20, color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 300, lineHeight: 1.55, maxWidth: 320 }}>
            relax & froach Gesundheitsmanagement. Bewusste Pausen für jede Lebensphase.
          </p>
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
            <Icon name="email" size={18} color="rgba(255,255,255,0.85)" />
            hallo@froach.de
          </div>
        </div>
        {[
          { h: "Lösungen", items: ["Kitas", "Schulen", "Organisationen", "Pflege"] },
          { h: "Unternehmen", items: ["Über uns", "Team", "Karriere"] },
          { h: "Kontakt", items: ["hallo@froach.de", "Presse", "Impressum"] },
        ].map(c => (
          <div key={c.h}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.grau, marginBottom: 16 }}>{c.h}</div>
            {c.items.map(i => <div key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>{i}</div>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", marginTop: 48, paddingTop: 24, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
        © 2024 relax & froach GmbH · www.froach.de
      </div>
    </footer>
  );
}

// Composed above-the-fold marketing page — the design-system entry component.
export function Components() {
  return (
    <div>
      <TopNav />
      <Hero />
      <SegmentCards />
      <Features />
      <Footer />
    </div>
  );
}
