import * as React from "react";

export interface LogoProps {
  /** "blue" (default) for light backgrounds, "white" for dark/colored */
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

/** Full relax & froach wordmark lockup (PNG-backed). */
export function Logo(props: LogoProps): JSX.Element;
/** Icon-only hand mark with integrated green leaf. */
export function LogoMark(props: LogoMarkProps): JSX.Element;
/** Hand mark inside a solid circle — app/social contexts. */
export function LogoCircle(props: LogoCircleProps): JSX.Element;
