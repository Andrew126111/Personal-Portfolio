"use client";

import { motion } from "framer-motion";

export default function WhoAmI({ sectionId }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: "#fef9ff", backfaceVisibility: "hidden" }}
    >
      {/* AN watermark - more visible here as a transition element */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 0 }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <span
          className="leading-none"
          style={{
            fontFamily: "Six Caps, sans-serif",
            fontSize: "clamp(24rem, 50vw, 50rem)",
            color: "#2b2d42",
            opacity: 0.035,
            letterSpacing: "0.02em",
            lineHeight: 0.85,
          }}
        >
          AN
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-32 md:py-48">
        <div className="max-w-3xl">
          {/* Section marker */}
          <motion.div
            className="flex items-center gap-2 mb-8 md:mb-10"
            style={{ fontFamily: "Six Caps, sans-serif", fontSize: 28, color: "#ff6b9d" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span>―</span>
            <span>WHO I AM</span>
          </motion.div>

          {/* Primary text */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-2xl md:text-4xl lg:text-5xl leading-[1.15] font-light mb-6 md:mb-8"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", fontWeight: 300 }}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              BUILDING DIGITAL EXPERIENCES SINCE 2022
            </motion.p>
          </div>

          {/* Divider line */}
          <motion.div
            className="w-16 h-px mb-6"
            style={{ backgroundColor: "#6bcbff", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          />

          {/* Description */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-base md:text-lg leading-relaxed font-light max-w-2xl mb-4"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0.65 }}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              COMPUTER SCIENCE STUDENT AT QUEEN&apos;S UNIVERSITY.
            </motion.p>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-base md:text-lg leading-relaxed font-light max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0.65 }}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              PASSIONATE ABOUT FRONT-END DEVELOPMENT, THOUGHTFUL UI, AND BUILDING
              PRODUCTS THAT PEOPLE ENJOY USING.
            </motion.p>
          </div>

          {/* Decorative circle */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 400,
              height: 400,
              bottom: "-10%",
              right: "5%",
              backgroundColor: "#a8e6cf",
              opacity: 0.08,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  );
}
