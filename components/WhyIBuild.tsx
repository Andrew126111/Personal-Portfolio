"use client";

import { motion } from "framer-motion";

export default function WhyIBuild({ sectionId }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden flex items-center"
      style={{ backgroundColor: "#ffffff", backfaceVisibility: "hidden" }}
    >
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, top: "-15%", left: "-5%", backgroundColor: "#a8e6cf", opacity: 0.07 }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-32 md:py-40">
        <motion.div
          className="flex items-center gap-2 mb-16 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#2b2d42" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span>・</span>
          <span>WHY I BUILD</span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light mb-8"
            style={{ color: "#2b2d42", fontFamily: "Inter, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            I BUILD BECAUSE I ENJOY THE MOMENT WHEN AN IDEA GOES FROM NOTHING
            TO SOMETHING REAL. THERE&apos;S A SPECIFIC SATISFACTION IN WRITING
            CODE THAT PRODUCES SOMETHING VISUAL, TANGIBLE, AND INTERACTIVE.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl leading-relaxed font-light"
            style={{ color: "#2b2d42", fontFamily: "Inter, sans-serif", opacity: 0.65 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            WHAT MOTIVATES ME IS THE IDEA THAT SOFTWARE CAN FEEL PERSONAL.
            THAT A WELL-PLACED ANIMATION, A THOUGHTFUL LAYOUT, OR A SMOOTH
            INTERACTION CAN MAKE SOMEONE ENJOY USING SOMETHING I BUILT. THAT&apos;S
            WHAT KEEPS ME LEARNING EVERY DAY.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
