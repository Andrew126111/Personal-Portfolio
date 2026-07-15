"use client";

import { useEffect } from "react";

interface HeroElement {
  el: HTMLElement;
  phase: number;
  floatAmp: number;
  driftAmp: number;
  mouseDepth: number;
  speed: number;
}

interface LetterEl {
  el: HTMLElement;
  phase: number;
  index: number;
}

export default function useHeroMotion() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    // ---- Gather animated elements ----

    const bgEls: HeroElement[] = [];
    hero.querySelectorAll<HTMLElement>("[data-hero-bg]").forEach((el) => {
      bgEls.push({
        el,
        phase: Math.random() * Math.PI * 2,
        floatAmp: parseFloat(el.dataset.floatAmp || "0"),
        driftAmp: parseFloat(el.dataset.driftAmp || "0"),
        mouseDepth: parseFloat(el.dataset.mouseDepth || "0"),
        speed: 0.3 + Math.random() * 0.4,
      });
    });

    const letterEls: LetterEl[] = [];
    hero.querySelectorAll<HTMLElement>("[data-letter]").forEach((el, i) => {
      letterEls.push({ el, phase: i * 0.5, index: i });
    });

    const nameClip = hero.querySelector<HTMLElement>("[data-hero-clip]");
    const subtitle = hero.querySelector<HTMLElement>("[data-hero-subtitle]");
    const tags = hero.querySelector<HTMLElement>("[data-hero-tags]");
    const bio = hero.querySelector<HTMLElement>("[data-hero-bio]");
    const topText = hero.querySelector<HTMLElement>("[data-hero-top]");
    const card = hero.querySelector<HTMLElement>("[data-hero-card]");
    const nameWrap = hero.querySelector<HTMLElement>("[data-hero-name]");

    // ---- State ----

    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    let time = 0;

    // ---- Mouse tracking ----

    const handleMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    // ---- RAF loop ----

    let rafId: number;

    const tick = () => {
      time += 0.016;
      const vh = window.innerHeight;
      const rect = hero.getBoundingClientRect();
      const heroProgress = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh)));

      // Smooth mouse (lerp)
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.06;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.06;

      // ---- Background elements: ambient drift + float + mouse parallax ----

      for (const b of bgEls) {
        const floatY = Math.sin(time * b.speed + b.phase) * b.floatAmp;
        const driftX = Math.cos(time * b.speed * 0.7 + b.phase * 1.3) * b.driftAmp;
        const mouseX = smoothMouse.x * b.mouseDepth * 100;
        const mouseY = smoothMouse.y * b.mouseDepth * 100;
        b.el.style.transform = `translate3d(${driftX + mouseX}px, ${floatY + mouseY}px, 0)`;
      }

      // ---- Letters: float + rotate + mouse proximity ----

      for (const l of letterEls) {
        const floatY = Math.sin(time * 0.5 + l.phase) * 1.8;
        const rotate = Math.sin(time * 0.4 + l.phase * 0.7) * 0.3;
        // Mouse proximity effect: letters tilted toward cursor
        const proxX = smoothMouse.x * 2;
        const proxRotate = smoothMouse.x * 0.2;
        l.el.style.transform = `translateY(${floatY}px) rotate(${rotate + proxRotate}deg) translateX(${proxX}px)`;
      }

      // ---- Scroll-driven entrance reveals ----

      if (topText) {
        const p = Math.min(1, Math.max(0, (heroProgress - 0) / 0.15));
        topText.style.opacity = String(p);
      }

      if (nameClip) {
        const p = Math.min(1, Math.max(0, (heroProgress - 0) / 0.35));
        const reveal = 1 - p;
        nameClip.style.clipPath = `inset(0 0 ${reveal * 100}% 0)`;
      }

      // Letter spacing stretches as hero scrolls away
      if (nameWrap) {
        const p = Math.min(1, Math.max(0, (heroProgress - 0.2) / 0.4));
        const spacing = 0.03 + p * 0.12;
        nameWrap.style.letterSpacing = `${spacing}em`;
      }

      if (subtitle) {
        const p = Math.min(1, Math.max(0, (heroProgress - 0.05) / 0.2));
        subtitle.style.opacity = String(p * 0.5);
      }

      if (tags) {
        const p = Math.min(1, Math.max(0, (heroProgress - 0.1) / 0.2));
        tags.style.opacity = String(p);
        tags.style.transform = `translateY(${(1 - p) * 20}px)`;
      }

      if (bio) {
        const p = Math.min(1, Math.max(0, (heroProgress - 0.15) / 0.2));
        bio.style.opacity = String(p * 0.6);
      }

      if (card) {
        const p = Math.min(1, Math.max(0, (heroProgress - 0.2) / 0.3));
        card.style.opacity = String(p);
        card.style.transform = `scale(${0.8 + p * 0.2})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // ---- Cleanup ----

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
