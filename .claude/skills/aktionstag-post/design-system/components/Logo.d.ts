import * as React from "react";

export interface LogoProps {
  /** "relax-froach" (default) or the "froachkids" sub-brand lockup */
  brand?: "relax-froach" | "froachkids";
  /** "blue" (default) for light backgrounds, "white" for dark/colored.
   *  Ignored for brand="froachkids" — the multi-color lockup is never recolored. */
  variant?: "blue" | "white";
  /** adds the GESUNDHEITSMANAGEMENT descriptor lockup */
  tagline?: boolean;
  /** rendered height in px */
  height?: number;
  style?: React.CSSProperties;
  /** path prefix to the assets/logos/ folder, relative to the host page */
  assetPath?: string;
}

export interface LogoMarkProps {
  variant?: "blue" | "white";
  size?: number;
  style?: React.CSSProperties;
  assetPath?: string;
}

export interface LogoCircleProps {
  variant?: "blue" | "white" | "green";
  size?: number;
  style?: React.CSSProperties;
  assetPath?: string;
}

/** Full relax & froach wordmark lockup (PNG-backed).
 *  Pass brand="froachkids" for the froachkids sub-brand lockup. */
export function Logo(props: LogoProps): JSX.Element;
/** froachkids sub-brand lockup — shorthand for <Logo brand="froachkids" />. */
export function LogoKids(props: Omit<LogoProps, "brand" | "variant" | "tagline">): JSX.Element;
/** Icon-only hand mark with integrated green leaf. */
export function LogoMark(props: LogoMarkProps): JSX.Element;
/** Hand mark inside a solid circle — app/social contexts. */
export function LogoCircle(props: LogoCircleProps): JSX.Element;
