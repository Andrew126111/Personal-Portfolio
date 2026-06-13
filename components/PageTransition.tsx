"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  active: boolean;
}

export default function PageTransition({ active }: PageTransitionProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ clipPath: "ellipse(0% 0% at 50% 50%)" }}
          animate={{
            clipPath: "ellipse(130% 100% at 50% 0%)",
          }}
          exit={{ clipPath: "ellipse(0% 0% at 50% 50%)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: "#ff6b9d" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ fontFamily: "Six Caps, sans-serif", fontSize: 48, color: "#ffffff" }}
          >
            ABOUT
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
