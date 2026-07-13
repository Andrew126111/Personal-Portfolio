"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#ffffff", backfaceVisibility: "hidden" }}>
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

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-32 md:py-48"
        initial={{ clipPath: "inset(5% 0% 5% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
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
          OPEN TO INTERNSHIPS &amp; CO-OP OPPORTUNITIES IN
          SOFTWARE ENGINEERING, FRONT-END DEVELOPMENT, AND CREATIVE TECHNOLOGY.
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
            href="mailto:ng.andrew2006@gmail.com"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            EMAIL
          </a>
          <a
            href="https://github.com/Andrew126111"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/andrew-nguyenn18"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            LINKEDIN
          </a>
        </motion.div>

        {/* Contact card */}
        <motion.div
          className="app-card-wrapper"
          style={{
            backgroundColor: "#ffb3a6",
            rotate: -6,
            position: "relative",
          }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="mailto:ng.andrew2006@gmail.com"
            className="block w-full h-full"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="w-full h-full flex flex-col p-5 md:p-6"
              style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">・</span>
                <span className="text-base md:text-lg tracking-[0.2em]">CONTACT</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-xl md:text-2xl tracking-wide">ANDREW</p>
                <p className="text-base md:text-lg mt-2 tracking-[0.15em] opacity-70">(EMAIL ME)</p>
              </div>
              <div className="mt-auto pt-3 border-t border-[#2b2d42]/20 text-center">
                <span className="text-2xl md:text-3xl tracking-[0.1em]">NGUYEN</span>
              </div>
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
