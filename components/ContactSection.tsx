"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      {/* Expanding circle background */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 800,
          height: 800,
          top: "-20%",
          right: "-10%",
          backgroundColor: "#ff6b9d",
          opacity: 0.1,
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-32 md:py-48">
        {/* Section heading */}
        <motion.div
          className="flex items-center gap-2 mb-12 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#2b2d42" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span>・</span>
          <span style={{ color: "#e84a5f" }}>SAY HI</span>
        </motion.div>

        {/* Contact text */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light max-w-3xl mb-16"
          style={{ color: "#2b2d42", fontFamily: "Inter, sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          I AM A COMPUTER SCIENCE STUDENT FOCUSED ON CREATING THINGS WITH
          INTERACTION &amp; ANIMATION AS MY MAIN FOCUS.
        </motion.p>

        {/* Contact name */}
        <motion.p
          className="text-6xl md:text-8xl lg:text-9xl leading-none mb-16"
          style={{ fontFamily: "Six Caps, sans-serif", color: "#e84a5f", transformOrigin: "left" }}
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          NGUYEN
        </motion.p>

        {/* Contact info */}
        <motion.div
          className="flex flex-wrap gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="mailto:andrew@example.com"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            EMAIL
          </a>
          <a
            href="https://github.com/andrewn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/andrewn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            LINKEDIN
          </a>
        </motion.div>

        {/* Contact cards */}
        <div className="flex flex-wrap gap-8 md:gap-16">
          {/* Card 1: Contact */}
          <motion.div
            className="app-card-wrapper"
            style={{
              backgroundColor: "#ffb3a6",
              rotate: -10,
              position: "relative",
            }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div
              className="w-full h-full flex flex-col p-4 md:p-5"
              style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">・</span>
                <span className="text-sm tracking-[0.2em]">CONTACT</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-base md:text-lg tracking-wide">ANDREW</p>
                <p className="text-sm mt-3 tracking-[0.15em] opacity-70">(EMAIL ME)</p>
              </div>
              <div className="mt-auto pt-3 border-t border-[#2b2d42]/20 text-center">
                <span className="text-xl tracking-[0.1em]" style={{ fontFamily: "Six Caps, sans-serif" }}>
                  NGUYEN
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Social links */}
          <motion.div
            className="app-card-wrapper"
            style={{
              backgroundColor: "#ffffff",
              rotate: 8,
              position: "relative",
            }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div
              className="w-full h-full flex flex-col p-4 md:p-5"
              style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">・</span>
                <span className="text-sm tracking-[0.2em]">CODED BY</span>
                <span className="text-sm tracking-[0.2em] opacity-70">(ANDREW NGUYEN)</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <a href="https://github.com/andrewn" target="_blank" rel="noopener noreferrer"
                   className="text-sm tracking-[0.15em] hover:underline"
                   style={{ fontFamily: "Inter, sans-serif" }}>
                  GITHUB @ANDREWN
                </a>
                <a href="mailto:andrew@example.com"
                   className="text-sm tracking-[0.15em] hover:underline"
                   style={{ fontFamily: "Inter, sans-serif" }}>
                  EMAIL
                </a>
              </div>
              <div className="mt-auto pt-3 border-t border-[#2b2d42]/20 text-center">
                <span className="text-xl tracking-[0.1em]">
                  NGUYEN
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
