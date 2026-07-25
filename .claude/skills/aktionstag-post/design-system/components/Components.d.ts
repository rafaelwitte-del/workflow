import * as React from "react";

export interface IconProps {
  /** froach icon name, e.g. "calendar" (file under assets/icons/froach/) */
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

/** Mask-tinted froach icon. */
export function Icon(props: IconProps): JSX.Element;
/** Marketing top navigation bar. */
export function TopNav(): JSX.Element;
/** Full-bleed hero with navy photo overlay. */
export function Hero(): JSX.Element;
/** Four arch-shaped segment cards (Kitas / Schulen / Organisation / Pflege). */
export function SegmentCards(): JSX.Element;
/** Six-up feature grid. */
export function Features(): JSX.Element;
/** Site footer. */
export function Footer(): JSX.Element;
/** Composed above-the-fold marketing page — the entry component. */
export function Components(): JSX.Element;
