"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";
import { useMotionValue, MotionValue } from "framer-motion";

interface ScrollContextValue {
  currentY: React.MutableRefObject<number>;
  contentHeight: number;
  scrollProgress: MotionValue<number>;
  cameraY: MotionValue<number>;
  scrollVelocity: MotionValue<number>;
}

const SmoothScrollContext = createContext<ScrollContextValue | null>(null);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScroll({ children, background }: { children: ReactNode; background?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafRef = useRef<number>(0);
  const scrollProgress = useMotionValue(0);
  const cameraY = useMotionValue(0);
  const scrollVelocity = useMotionValue(0);
  const prevYRef = useRef(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const update = useCallback(() => {
    prevYRef.current = currentY.current;
    currentY.current += (targetY.current - currentY.current) * 0.06;

    const max = Math.max(0, contentHeight - window.innerHeight);
    const clamped = Math.min(0, Math.max(-max, currentY.current));
    currentY.current = clamped;
    const absY = Math.abs(currentY.current);

    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(${currentY.current}px)`;
    }

    scrollProgress.set(max > 0 ? absY / max : 0);
    cameraY.set(absY);
    scrollVelocity.set(Math.abs(absY - Math.abs(prevYRef.current)));

    rafRef.current = requestAnimationFrame(update);
  }, [contentHeight, scrollProgress, cameraY, scrollVelocity]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [update]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetY.current -= e.deltaY;
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    let touchStartY = 0;
    let isTouching = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isTouching = true;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      targetY.current -= delta * 0.8;
    };
    const handleTouchEnd = () => { isTouching = false; };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ currentY, contentHeight, scrollProgress, cameraY, scrollVelocity }}>
      {background}
      <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
        <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
          <div ref={contentRef}>{children}</div>
        </div>
      </div>
    </SmoothScrollContext.Provider>
  );
}
