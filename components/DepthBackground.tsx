"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { useTime, useDriftX, useDriftY, useOrbit, useSmoothRotate } from "@/hooks/useScrollProgress";
import { useCursor } from "@/components/CursorContext";

const palette = {
  pink: "#ff6b9d", sky: "#6bcbff", lemon: "#ffd93d",
  blush: "#ffb3a6", mint: "#a8e6cf", red: "#e84a5f", dark: "#2b2d42",
};

const chapterBoundaries = [0, 0.14, 0.26, 0.48, 0.66, 0.84, 1];

function useChapterBlend(progress: any) {
  const raw = useTransform(progress, chapterBoundaries, [0, 0, 1, 2, 3, 4, 5]);
  return useTransform(raw, (v: number) => {
    const idx = Math.min(Math.floor(v), 5);
    return { index: idx, frac: v - idx };
  });
}

const anScale = [8, 10, 6, 9, 7, 5];
const anOpacity = [0.025, 0.035, 0.02, 0.03, 0.025, 0.04];

// ---- Cursor-responsive parallax wrapper ----

function CursorLayer({ depth, children }: { depth: number; children: React.ReactNode }) {
  const cursorCtx = useCursor();
  const fallbackX = useMotionValue(0);
  const cursorX = cursorCtx?.cursorX ?? fallbackX;
  const [vw, setVw] = useState(0);

  useEffect(() => {
    setVw(window.innerWidth);
    const handle = () => setVw(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const offsetX = useTransform(cursorX, (x: number) => {
    if (vw === 0) return 0;
    return (x - vw / 2) * depth * 0.06;
  });

  return <motion.div style={{ x: offsetX, willChange: "transform" }}>{children}</motion.div>;
}

// ---- Depth element factories ----

function GradientBlob({ index, depth, size, initialX, initialY, blur, chapterBlend }: {
  index: number; depth: number; size: number; initialX: string; initialY: string; blur?: number;
  chapterBlend: any;
}) {
  const ctx = useSmoothScroll();
  const cameraY = ctx?.cameraY;
  const y = cameraY ? useTransform(cameraY, (v: number) => -v * depth) : 0;
  const driftX = useDriftX(30, 0.06 + index * 0.02);
  const driftY = useDriftY(15, 0.08 + index * 0.02);
  const rotate = useSmoothRotate(0.5 + index * 0.1);

  const bg = useTransform(chapterBlend, (blend: any) => {
    if (!blend) return palette.pink;
    const ci = index % 3;
    const col = [palette.pink, palette.sky, palette.lemon, palette.blush, palette.mint, palette.red];
    const c = col[(blend.index + ci) % col.length];
    return c;
  });

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: initialX, top: initialY,
        y, x: driftX, rotate,
        opacity: 0.05 - index * 0.005,
        background: bg,
        filter: `blur(${blur ?? 80}px)`,
        willChange: "transform",
      }}
    />
  );
}

function TypographyLayer({ depth, chapterBlend }: { depth: number; chapterBlend: any }) {
  const ctx = useSmoothScroll();
  const cameraY = ctx?.cameraY;
  const y = cameraY ? useTransform(cameraY, (v: number) => -v * depth) : 0;
  const driftX = useDriftX(15, 0.04);
  const driftY = useDriftY(8, 0.03);
  const rotate = useSmoothRotate(1.2);

  const opacity = useTransform(chapterBlend, (blend: any) => {
    if (!blend) return anOpacity[0];
    return anOpacity[Math.min(blend.index, 5)];
  });

  const scale = useTransform(chapterBlend, (blend: any) => {
    if (!blend) return anScale[0];
    const idx = Math.min(blend.index, 5);
    return anScale[idx] + Math.sin(blend.frac * Math.PI) * 1.5;
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      style={{ y, x: driftX, rotate, willChange: "transform" }}
    >
      <motion.span
        className="leading-none"
        style={{
          fontFamily: "Six Caps, sans-serif",
          fontSize: "clamp(20rem, 45vw, 45rem)",
          color: palette.dark,
          opacity,
          scale,
          letterSpacing: "0.02em",
          lineHeight: 0.85,
          willChange: "transform",
        }}
      >
        AN
      </motion.span>
    </motion.div>
  );
}

function FloatingCircle({ depth, size, initialX, initialY, colorIdx, orbitRadius }: {
  depth: number; size: number; initialX: string; initialY: string; colorIdx: number; orbitRadius: number;
}) {
  const ctx = useSmoothScroll();
  const cameraY = ctx?.cameraY;
  const y = cameraY ? useTransform(cameraY, (v: number) => -v * depth) : 0;
  const orbit = useOrbit(orbitRadius, 0.05 + Math.random() * 0.04);
  const rotate = useSmoothRotate(0.3 + Math.random() * 0.4);
  const pulse = useTransform(useTime(), (t: number) => 0.85 + Math.sin(t * 0.04 + Math.random() * 6) * 0.12);
  const colors = [palette.pink, palette.sky, palette.lemon, palette.blush, palette.mint, palette.red];

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: initialX, top: initialY,
        y, x: orbit.x, rotate,
        scale: pulse,
        backgroundColor: colors[colorIdx % colors.length],
        opacity: 0.05,
        boxShadow: `0 0 60px ${colors[colorIdx % colors.length]}22`,
        willChange: "transform",
      }}
    />
  );
}

function Particles({ depth }: { depth: number }) {
  const ctx = useSmoothScroll();
  const cameraY = ctx?.cameraY;
  const baseY = cameraY ? useTransform(cameraY, (v: number) => -v * depth) : 0;
  const particles = useRef(
    Array.from({ length: 30 }, (_, i) => ({
      id: i, size: 1.5 + Math.random() * 3,
      x: Math.random() * 100, y: Math.random() * 100,
      phase: Math.random() * 6, speed: 0.02 + Math.random() * 0.04,
    }))
  );

  return (
    <>
      {particles.current.map((p) => (
        <ParticleDot key={p.id} particle={p} baseY={baseY} />
      ))}
    </>
  );
}

function ParticleDot({ particle, baseY }: { particle: any; baseY: any }) {
  const time = useTime();
  const driftX = useTransform(time, (t: number) => `${particle.x + Math.sin(t * particle.speed + particle.phase) * 4}%`);
  const driftY = useTransform(time, (t: number) => particle.y + Math.cos(t * particle.speed * 0.6 + particle.phase) * 3);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: particle.size, height: particle.size,
        left: driftX, top: driftY,
        y: baseY,
        backgroundColor: palette.dark,
        opacity: 0.03,
        willChange: "transform",
      }}
    />
  );
}

function NoiseOverlay() {
  const ctx = useSmoothScroll();
  const cameraY = ctx?.cameraY;
  const y = cameraY ? useTransform(cameraY, (v: number) => -v * 0.35) : 0;
  const time = useTime();
  const x = useTransform(time, (t: number) => `${Math.sin(t * 0.015) * 3}%`);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none select-none"
      style={{
        y, x,
        opacity: 0.012,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
        willChange: "transform",
      }}
    />
  );
}

function AmbientLayer({ depth, chapterBlend }: { depth: number; chapterBlend: any }) {
  const ctx = useSmoothScroll();
  const cameraY = ctx?.cameraY;
  const y = cameraY ? useTransform(cameraY, (v: number) => -v * depth) : 0;
  const rotate = useSmoothRotate(0.2);

  const grad1 = useTransform(chapterBlend, (blend: any) => {
    if (!blend) return `radial-gradient(ellipse at 20% 40%, ${palette.pink} 0%, transparent 60%)`;
    const colors = [palette.pink, palette.sky, palette.lemon, palette.blush, palette.mint, palette.red];
    const c = colors[Math.min(blend.index, 5)];
    return `radial-gradient(ellipse at 20% 40%, ${c} 0%, transparent 60%)`;
  });

  const grad2 = useTransform(chapterBlend, (blend: any) => {
    if (!blend) return `radial-gradient(ellipse at 80% 60%, ${palette.sky} 0%, transparent 50%)`;
    const colors = [palette.sky, palette.mint, palette.blush, palette.pink, palette.lemon, palette.blush];
    const c = colors[Math.min(blend.index, 5)];
    return `radial-gradient(ellipse at 80% 60%, ${c} 0%, transparent 50%)`;
  });

  return (
    <>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y, rotate, background: grad1, opacity: 0.12, willChange: "transform" }} />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y, rotate: useTransform(rotate, (r: number) => -r), background: grad2, opacity: 0.08, willChange: "transform" }} />
    </>
  );
}

// ---- Floating editorial typography ----

const floatingTexts = [
  { text: "FULL-STACK DEVELOPER", depth: 0.06, y: 20, xSpeed: 0.01, size: 60 },
  { text: "UX • UI • INTERACTION", depth: 0.08, y: 50, xSpeed: -0.008, size: 40 },
  { text: "CREATIVE ENGINEERING", depth: 0.07, y: 80, xSpeed: 0.012, size: 50 },
  { text: "QUEEN'S UNIVERSITY CS", depth: 0.09, y: 10, xSpeed: -0.015, size: 35 },
  { text: "DIGITAL EXPERIENCES", depth: 0.11, y: 65, xSpeed: 0.009, size: 45 },
  { text: "BUILD SINCE 2022", depth: 0.13, y: 35, xSpeed: -0.011, size: 40 },
];

function FloatingText({ item }: { item: typeof floatingTexts[0] }) {
  const ctx = useSmoothScroll();
  const cameraY = ctx?.cameraY;
  const y = cameraY ? useTransform(cameraY, (v: number) => -v * item.depth) : 0;
  const time = useTime();
  const x = useTransform(time, (t: number) => `${50 + Math.sin(t * item.xSpeed) * 30}%`);

  return (
    <motion.div
      className="absolute pointer-events-none select-none whitespace-nowrap"
      style={{
        fontFamily: "Six Caps, sans-serif",
        fontSize: item.size,
        color: palette.dark,
        opacity: 0.015,
        letterSpacing: "0.3em",
        top: `${item.y}%`,
        left: x,
        y,
        willChange: "transform",
      }}
    >
      {item.text}
    </motion.div>
  );
}

// ---- Light sweep ----

function LightSweep({ depth }: { depth: number }) {
  const ctx = useSmoothScroll();
  const cameraY = ctx?.cameraY;
  const y = cameraY ? useTransform(cameraY, (v: number) => -v * depth) : 0;
  const time = useTime();
  const x = useTransform(time, (t: number) => `${70 + Math.sin(t * 0.004) * 40}%`);
  const pulse = useTransform(time, (t: number) => 0.3 + Math.sin(t * 0.003) * 0.2);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: "60%",
        height: "100%",
        top: 0,
        left: x,
        y,
        opacity: pulse,
        background: `radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, transparent 70%)`,
        willChange: "transform, opacity",
      }}
    />
  );
}

// ---- Camera tilt effect ----

function CameraEffects({ children }: { children: React.ReactNode }) {
  const ctx = useSmoothScroll();
  const velocity = ctx?.scrollVelocity;

  const tilt = velocity ? useTransform(velocity, [0, 50], [0, 1.2]) : undefined;
  const tiltX = tilt ? useTransform(tilt, (t: number) => Math.sin(t * 0.3) * 0.3) : undefined;
  const tiltY = tilt ? useTransform(tilt, (t: number) => Math.cos(t * 0.2) * 0.2) : undefined;
  const zoom = velocity ? useTransform(velocity, [0, 50], [1, 1.003]) : undefined;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        scale: zoom,
        transformPerspective: 1000,
        transformOrigin: "50% 50%",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

// ---- Main export ----

export default function DepthBackground() {
  const ctx = useSmoothScroll();
  const progress = ctx?.scrollProgress;
  if (!progress) return null;

  const chapterBlend = useChapterBlend(progress);

  return (
    <CameraEffects>
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Layer 1: Deep gradient blobs (2–3%) — cursor moves 0.12% per px */}
        <CursorLayer depth={0.02}>
          <GradientBlob index={0} depth={0.02} size={900} initialX="-15%" initialY="5%" chapterBlend={chapterBlend} />
          <GradientBlob index={1} depth={0.025} size={650} initialX="55%" initialY="35%" chapterBlend={chapterBlend} />
          <GradientBlob index={2} depth={0.03} size={750} initialX="25%" initialY="65%" chapterBlend={chapterBlend} />
        </CursorLayer>

        {/* Layer 2: Ambient light gradients (5%) */}
        <CursorLayer depth={0.05}>
          <AmbientLayer depth={0.05} chapterBlend={chapterBlend} />
        </CursorLayer>

        {/* Layer 3: Floating editorial typography (6–13%) */}
        <CursorLayer depth={0.08}>
          {floatingTexts.map((item, i) => (
            <FloatingText key={i} item={item} />
          ))}
        </CursorLayer>

        {/* Layer 4: Oversized AN typography (10%) */}
        <CursorLayer depth={0.1}>
          <TypographyLayer depth={0.1} chapterBlend={chapterBlend} />
        </CursorLayer>

        {/* Light sweep across the scene */}
        <CursorLayer depth={0.15}>
          <LightSweep depth={0.15} />
        </CursorLayer>

        {/* Layer 6: Floating circles (18–23%) */}
        <CursorLayer depth={0.2}>
          <FloatingCircle depth={0.18} size={550} initialX="88%" initialY="2%" colorIdx={0} orbitRadius={20} />
          <FloatingCircle depth={0.2} size={380} initialX="8%" initialY="55%" colorIdx={2} orbitRadius={18} />
          <FloatingCircle depth={0.22} size={280} initialX="92%" initialY="78%" colorIdx={1} orbitRadius={15} />
          <FloatingCircle depth={0.19} size={450} initialX="45%" initialY="25%" colorIdx={4} orbitRadius={25} />
          <FloatingCircle depth={0.21} size={220} initialX="3%" initialY="22%" colorIdx={3} orbitRadius={12} />
          <FloatingCircle depth={0.23} size={320} initialX="75%" initialY="48%" colorIdx={5} orbitRadius={20} />
        </CursorLayer>

        {/* Layer 7: Particle system (30%) */}
        <CursorLayer depth={0.3}>
          <Particles depth={0.3} />
        </CursorLayer>

        {/* Layer 8: Noise grain (35%) */}
        <CursorLayer depth={0.35}>
          <NoiseOverlay />
        </CursorLayer>
      </div>
    </CameraEffects>
  );
}
