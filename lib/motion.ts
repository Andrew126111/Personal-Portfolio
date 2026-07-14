"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const EASE = {
  in: "power2.in",
  out: "power2.out",
  inOut: "power2.inOut",
  smooth: "none",
};

export function withUnit(v: number, unit: string = "px"): string {
  return `${v}${unit}`;
}
