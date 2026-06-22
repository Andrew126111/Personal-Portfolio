"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";

interface ScrollContextValue {
  currentY: React.MutableRefObject<number>;
  contentHeight: number;
}

const SmoothScrollContext = createContext<ScrollContextValue | null>(null);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const update = useCallback(() => {
    currentY.current += (targetY.current - currentY.current) * 0.08;
    const max = Math.max(0, contentHeight - window.innerHeight);
    currentY.current = Math.min(0, Math.max(-max, currentY.current));

    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(${currentY.current}px)`;
    }

    rafRef.current = requestAnimationFrame(update);
  }, [contentHeight]);

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

    const handleTouchEnd = () => {
      isTouching = false;
    };

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
    <SmoothScrollContext.Provider value={{ currentY, contentHeight }}>
      <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
        <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
          <div ref={contentRef}>{children}</div>
        </div>
      </div>
    </SmoothScrollContext.Provider>
  );
}
