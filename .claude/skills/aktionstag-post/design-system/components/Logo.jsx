// relax & froach Logo — uses the real PNG from the Branding Guide 2023.
// This is the safest path: the wordmark is a custom typeface and
// reconstructing it from glyph paths would drift. The PNG is the
// official logo asset as exported from the 2023 Figma file.

export function Logo({
  brand = "relax-froach", // "relax-froach" | "froachkids"
  variant = "blue",     // "blue" | "white" — froachkids is always full-color
  tagline = false,      // adds " GESUNDHEITSMANAGEMENT " lockup variant
  height = 56,
  style = {},
  assetPath = "assets/logos/",  // path prefix so component works from any dir
}) {
  // froachkids is the original multi-color lockup ("froach" in Brand Blue +
  // the multi-color "kids" wordmark). Never rebuild it in CSS/type, never
  // recolor it, never use "kids" without the "froach" wordmark in front.
  const isKids = brand === "froachkids";
  const src = isKids
    ? `${assetPath}froachkids-lockup.png`
    : tagline
      ? `${assetPath}logo-gesundheits-png.png`
      : `${assetPath}logo-primary.png`;

  // CSS filter inverts dark blue → white for the white variant.
  // Not applied to froachkids — it would destroy the multi-color wordmark.
  const filter = !isKids && variant === "white"
    ? "brightness(0) invert(1)"
    : "none";

  return (
    <img
      src={src}
      alt={isKids ? "froachkids" : "relax & froach"}
      style={{
        height,
        width: "auto",
        display: "block",
        filter,
        ...style,
      }}
    />
  );
}

// Convenience wrapper — the froachkids sub-brand lockup.
export function LogoKids({ height = 56, style = {}, assetPath = "assets/logos/" }) {
  return <Logo brand="froachkids" height={height} style={style} assetPath={assetPath} />;
}

// Icon-only hand mark with integrated green leaf.
// Three variants available as SVG:
//   hand-blue.svg    = Brand Blue hand + green leaf (for light backgrounds)
//   hand-white.svg   = White hand + green leaf (for dark/colored backgrounds)
//   hand-canonical.svg = currentColor hand + green leaf (for CSS tinting)
export function LogoMark({
  variant = "blue",     // "blue" | "white"
  size = 64,
  style = {},
  assetPath = "assets/logos/",
}) {
  const file = variant === "white" ? "hand-white.svg" : "hand-blue.svg";
  return (
    <img
      src={`${assetPath}${file}`}
      alt="relax & froach"
      style={{
        width: size,
        height: "auto",
        display: "block",
        ...style,
      }}
    />
  );
}

// Circle icon — hand in a solid circle (used in app/social contexts)
export function LogoCircle({
  variant = "blue",      // "blue" | "white" | "green"
  size = 120,
  style = {},
  assetPath = "assets/logos/",
}) {
  const map = {
    blue:  { bg: "#044894", hand: "white" },
    white: { bg: "#FFFFFF", hand: "blue"  },
    green: { bg: "#94CE0E", hand: "white" },
  };
  const { bg, hand } = map[variant] || map.blue;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 24px rgba(1,51,78,0.12)",
        ...style,
      }}
      aria-label="relax & froach icon"
    >
      <LogoMark variant={hand} size={size * 0.55} assetPath={assetPath} />
    </div>
  );
}

