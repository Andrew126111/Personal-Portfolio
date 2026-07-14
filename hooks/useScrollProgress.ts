"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMotionValue, useTransform, MotionValue } from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScroll";

let timeRafId = 0;
let globalTime = 0;
const timeListeners = new Set<(t: number) => void>();

function startTimeLoop() {
  if (timeRafId) return;
  const tick = () => {
    globalTime += 0.008;
    timeListeners.forEach((fn) => fn(globalTime));
    timeRafId = requestAnimationFrame(tick);
  };
  timeRafId = requestAnimationFrame(tick);
}

export function useTime(): MotionValue<number> {
  const time = useMotionValue(0);

  useEffect(() => {
    startTimeLoop();
    const handler = (t: number) => time.set(t);
    timeListeners.add(handler);
    return () => {
      timeListeners.delete(handler);
      if (timeListeners.size === 0) {
        cancelAnimationFrame(timeRafId);
        timeRafId = 0;
      }
    };
  }, [time]);

  return time;
}

export function useElementProgress(elementId: string): MotionValue<number> {
  const progress = useMotionValue(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(elementId);
      if (!el) { rafRef.current = requestAnimationFrame(update); return; }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      progress.set(Math.max(0, Math.min(1, scrolled / total)));
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [elementId, progress]);

  return progress;
}

export function usePageProgress() {
  const ctx = useSmoothScroll();
  return ctx?.scrollProgress ?? null;
}

export function useCameraY() {
  const ctx = useSmoothScroll();
  return ctx?.cameraY ?? null;
}

export function useScrollVelocity() {
  const ctx = useSmoothScroll();
  return ctx?.scrollVelocity ?? null;
}

export function useChapterProgress(chapterIndex: number, totalChapters: number): MotionValue<number> | null {
  const pageProgress = usePageProgress();
  if (!pageProgress) return null;

  const start = chapterIndex / totalChapters;
  const end = (chapterIndex + 1) / totalChapters;

  return useTransform(pageProgress, [start, end], [0, 1]);
}

export function useTransformRange(
  input: MotionValue<number> | null,
  inputRange: number[],
  outputRange: number[]
): MotionValue<number> | null {
  if (!input) return null;
  return useTransform(input, inputRange, outputRange);
}

export function useDepthY(depthFactor: number): MotionValue<number> | null {
  const cameraY = useCameraY();
  if (!cameraY) return null;
  return useTransform(cameraY, (y: number) => y * depthFactor);
}

export function useDriftY(amplitude: number, speed: number = 0.3): MotionValue<number> {
  const time = useTime();
  return useTransform(time, (t) => Math.sin(t * speed) * amplitude);
}

export function useDriftX(amplitude: number, speed: number = 0.3): MotionValue<number> {
  const time = useTime();
  return useTransform(time, (t) => Math.cos(t * speed) * amplitude);
}

export function useOrbit(radius: number, speed: number = 0.15) {
  const time = useTime();
  const x = useTransform(time, (t) => Math.cos(t * speed) * radius);
  const y = useTransform(time, (t) => Math.sin(t * speed) * radius);
  return { x, y };
}

export function useSmoothRotate(degrees: number): MotionValue<number> {
  const time = useTime();
  return useTransform(time, (t) => Math.sin(t * 0.08) * degrees);
}
