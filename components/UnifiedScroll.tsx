"use client";

import { ReactNode } from "react";
import { useLenis } from "@/hooks/useUnifiedScroll";

export default function UnifiedScroll({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
