"use client";

import { createContext, useContext, ReactNode } from "react";
import { useMotionValue, MotionValue } from "framer-motion";

interface CursorContextValue {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  glowX: MotionValue<number>;
  glowY: MotionValue<number>;
  haloX: MotionValue<number>;
  haloY: MotionValue<number>;
  isPointer: MotionValue<number>;
  cursorMode: MotionValue<string>;
  magneticTarget: MotionValue<{ x: number; y: number } | null>;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const cursorX = useMotionValue(-999);
  const cursorY = useMotionValue(-999);
  const springX = useMotionValue(-999);
  const springY = useMotionValue(-999);
  const glowX = useMotionValue(-999);
  const glowY = useMotionValue(-999);
  const haloX = useMotionValue(-999);
  const haloY = useMotionValue(-999);
  const isPointer = useMotionValue(0);
  const cursorMode = useMotionValue("default");
  const magneticTarget = useMotionValue<{ x: number; y: number } | null>(null);

  return (
    <CursorContext.Provider
      value={{ cursorX, cursorY, springX, springY, glowX, glowY, haloX, haloY, isPointer, cursorMode, magneticTarget }}
    >
      {children}
    </CursorContext.Provider>
  );
}
