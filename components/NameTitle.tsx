"use client";

import { motion } from "framer-motion";

export default function NameTitle() {
  return (
    <motion.div
      className="fixed top-8 left-8 z-30 select-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1
        className="text-2xl md:text-3xl text-white/90 leading-none"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        Andrew Nguyen
      </h1>
      <p className="mt-2 text-xs md:text-sm text-white/40 tracking-wider uppercase">
        Student &bull; Builder &bull; Creator
      </p>
    </motion.div>
  );
}
