"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/components/CursorContext";

const EDGE_BUFFER = 50;

interface Ripple { id: number; x: number; y: number }

// Spring simulation via lerp
function lerpSpring(from: number, to: number, stiffness: number, damping: number) {
  const d = Math.min((stiffness / damping) * 0.002, 0.5);
  return from + (to - from) * d;
}

export default function PremiumCursor({ loaded }: { loaded: boolean }) {
  const ctx = useCursor();
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mode, setMode] = useState("default");
  const rippleId = useRef(0);
  const rafRef = useRef<number>(0);

  // Cursor positions for each layer
  const mouse = useRef({ x: -999, y: -999 });
  const core = useRef({ x: -999, y: -999 });
  const glow = useRef({ x: -999, y: -999 });
  const halo = useRef({ x: -999, y: -999 });

  // DOM positions
  const [corePos, setCorePos] = useState({ x: -999, y: -999 });
  const [glowPos, setGlowPos] = useState({ x: -999, y: -999 });
  const [haloPos, setHaloPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleClick = (e: MouseEvent) => {
      const id = rippleId.current++;
      setRipples((prev) => {
        const next = [...prev, { id, x: e.clientX, y: e.clientY }];
        return next.slice(-3);
      });
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    };

    // Magnetic + hover detection via delegated events
    const handleOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        setMode(el.getAttribute("data-cursor") || "default");
        ctx?.isPointer.set(1);
      } else {
        setMode("default");
        ctx?.isPointer.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [isMobile, visible, ctx]);

  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      let mx = mouse.current.x;
      let my = mouse.current.y;

      // Edge dampening
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (mx < EDGE_BUFFER) mx += (EDGE_BUFFER - mx) * 0.3;
      if (mx > vw - EDGE_BUFFER) mx -= (mx - (vw - EDGE_BUFFER)) * 0.3;
      if (my < EDGE_BUFFER) my += (EDGE_BUFFER - my) * 0.3;
      if (my > vh - EDGE_BUFFER) my -= (my - (vh - EDGE_BUFFER)) * 0.3;

      // Three layers with different spring feels
      core.current.x = lerpSpring(core.current.x, mx, 500, 40);
      core.current.y = lerpSpring(core.current.y, my, 500, 40);
      glow.current.x = lerpSpring(glow.current.x, mx, 300, 28);
      glow.current.y = lerpSpring(glow.current.y, my, 300, 28);
      halo.current.x = lerpSpring(halo.current.x, mx, 120, 18);
      halo.current.y = lerpSpring(halo.current.y, my, 120, 18);

      setCorePos({ x: core.current.x, y: core.current.y });
      setGlowPos({ x: glow.current.x, y: glow.current.y });
      setHaloPos({ x: halo.current.x, y: halo.current.y });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  if (isMobile) return null;

  const coreSize = mode === "magnetic" ? 10 : mode === "view" ? 16 : mode === "link" ? 12 : 6;
  const showLabel = mode === "view" || mode === "link";

  return (
    <>
      {/* Layer 3 — Halo */}
      <div
        className="fixed pointer-events-none select-none rounded-full"
        style={{
          zIndex: 99997,
          width: 140, height: 140,
          left: haloPos.x - 70, top: haloPos.y - 70,
          background: "radial-gradient(circle, rgba(107,203,255,0.04) 0%, transparent 70%)",
          opacity: loaded && visible ? 1 : 0,
          transition: "opacity 0.8s ease",
          willChange: "transform",
        }}
      />

      {/* Layer 2 — Glow */}
      <div
        className="fixed pointer-events-none select-none rounded-full flex items-center justify-center"
        style={{
          zIndex: 99998,
          width: 60, height: 60,
          left: glowPos.x - 30, top: glowPos.y - 30,
          background: "radial-gradient(circle, rgba(255,107,157,0.12) 0%, transparent 60%)",
          opacity: loaded && visible ? 1 : 0,
          transition: "opacity 0.8s ease",
          willChange: "transform",
        }}
      >
        {showLabel && (
          <span
            className="text-[10px] tracking-[0.15em]"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#ff6b9d",
              marginLeft: 20,
              marginTop: 2,
            }}
          >
            {mode === "view" ? "VIEW" : mode === "link" ? "\u2192" : ""}
          </span>
        )}
      </div>

      {/* Layer 1 — Core */}
      <div
        className="fixed pointer-events-none select-none rounded-full"
        style={{
          zIndex: 99999,
          width: coreSize, height: coreSize,
          left: corePos.x - coreSize / 2, top: corePos.y - coreSize / 2,
          backgroundColor: mode === "link" ? "#6bcbff" : "#ff6b9d",
          opacity: loaded && visible ? 0.9 : 0,
          transition: "opacity 0.8s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* Click ripples */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="fixed pointer-events-none select-none rounded-full"
          style={{
            zIndex: 99996,
            left: r.x - 12, top: r.y - 12,
            width: 24, height: 24,
            border: "1.5px solid #ff6b9d",
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </>
  );
}
