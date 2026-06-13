"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function FloatingCircles() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouse = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("mousemove", handleMouse);

    const lerp = () => {
      setMouse((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.05,
        y: prev.y + (targetRef.current.y - prev.y) * 0.05,
      }));
      rafRef.current = requestAnimationFrame(lerp);
    };

    rafRef.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-32 w-[400px] md:w-[600px] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(184,212,227,0.3) 0%, rgba(184,212,227,0) 70%)",
          filter: "blur(60px)",
        }}
        animate={
          isMobile
            ? { x: [0, 30, -20, 0], y: [0, -20, 30, 0] }
            : { x: mouse.x * -30, y: mouse.y * -30 }
        }
        transition={
          isMobile
            ? { duration: 20, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.1, ease: "linear" }
        }
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[350px] md:w-[500px] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(196,181,227,0.3) 0%, rgba(196,181,227,0) 70%)",
          filter: "blur(60px)",
        }}
        animate={
          isMobile
            ? { x: [0, -30, 20, 0], y: [0, 30, -20, 0] }
            : { x: mouse.x * 20, y: mouse.y * 20 }
        }
        transition={
          isMobile
            ? { duration: 25, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.1, ease: "linear" }
        }
      />
    </div>
  );
}
