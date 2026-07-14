"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";

interface AnimConfig {
  depth?: number;
  reveal?: string;
  delay?: number;
  start?: string;
  end?: string;
  from?: string;
  to?: string;
  pin?: string;
}

function parseConfig(el: HTMLElement): AnimConfig {
  return {
    depth: el.dataset.depth ? parseFloat(el.dataset.depth) : undefined,
    reveal: el.dataset.reveal,
    delay: el.dataset.delay ? parseFloat(el.dataset.delay) : 0,
    start: el.dataset.start || "top 85%",
    end: el.dataset.end || "top 35%",
    from: el.dataset.from,
    to: el.dataset.to,
    pin: el.dataset.pin,
  };
}

export function useAnimations() {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Depth layer parallax — elements with data-depth
      const depthEls = document.querySelectorAll<HTMLElement>("[data-depth]");
      depthEls.forEach((el) => {
        const cfg = parseConfig(el);
        const depth = cfg.depth ?? 0.5;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        gsap.to(el, {
          y: -scrollHeight * depth,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });

      // 2. Scroll reveals — elements with data-reveal
      const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");
      revealEls.forEach((el) => {
        const cfg = parseConfig(el);
        const type = cfg.reveal;

        switch (type) {
          case "clip": {
            gsap.fromTo(
              el,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement || el,
                  start: cfg.start,
                  end: cfg.end,
                  scrub: true,
                },
              }
            );
            break;
          }
          case "fade": {
            gsap.fromTo(
              el,
              { opacity: 0 },
              {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement || el,
                  start: cfg.start,
                  end: cfg.end,
                  scrub: true,
                },
              }
            );
            break;
          }
          case "slide": {
            gsap.fromTo(
              el,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement || el,
                  start: cfg.start,
                  end: cfg.end,
                  scrub: true,
                },
              }
            );
            break;
          }
          case "scale": {
            gsap.fromTo(
              el,
              { scale: 0.8, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement || el,
                  start: cfg.start,
                  end: cfg.end,
                  scrub: true,
                },
              }
            );
            break;
          }
          case "line": {
            gsap.fromTo(
              el,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement || el,
                  start: cfg.start,
                  end: cfg.end,
                  scrub: true,
                },
              }
            );
            break;
          }
          default:
            break;
        }
      });

      // 3. Pinned sections — sections with data-pin
      const pinSections = document.querySelectorAll<HTMLElement>("[data-pin]");
      pinSections.forEach((section) => {
        const cfg = parseConfig(section);
        const pinDir = cfg.pin || "top";

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Animate children within pinned section using timeline
        const children = section.querySelectorAll<HTMLElement>("[data-reveal]");
        if (children.length > 0) {
          const tl = gsap.timeline();
          children.forEach((el) => {
            const c = parseConfig(el);
            const d = c.delay || 0;
            switch (c.reveal) {
              case "clip":
                tl.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", ease: "none" }, d);
                break;
              case "fade":
                tl.fromTo(el, { opacity: 0 }, { opacity: 1, ease: "none" }, d);
                break;
              case "slide":
                tl.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, d);
                break;
              case "scale":
                tl.fromTo(el, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ease: "none" }, d);
                break;
              default:
                break;
            }
          });

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            animation: tl,
          });
        }
      });
    });

    ctxRef.current = ctx;
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);
}
