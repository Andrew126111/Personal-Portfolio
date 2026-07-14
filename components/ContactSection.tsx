"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useElementProgress } from "@/hooks/useScrollProgress";

export default function ContactSection({ sectionId }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionProgress = useElementProgress(sectionId ?? "contact");

  const bgOpacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const headingOpacity = useTransform(sectionProgress, [0, 0.15], [0, 1]);
  const bodyClip = useTransform(
    sectionProgress,
    [0.08, 0.3],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );
  const nameOpacity = useTransform(sectionProgress, [0.15, 0.35], [0, 1]);
  const nameScale = useTransform(sectionProgress, [0.15, 0.35], [0.5, 1]);
  const linksOpacity = useTransform(sectionProgress, [0.25, 0.45], [0, 1]);
  const taglineOpacity = useTransform(sectionProgress, [0.35, 0.55], [0, 1]);
  const cardOpacity = useTransform(sectionProgress, [0.4, 0.6], [0, 1]);
  const cardX = useTransform(sectionProgress, [0.4, 0.6], [-30, 0]);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative w-full overflow-hidden py-24 md:py-36"
    >
      {/* Expanding circle background */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 800, height: 800,
          top: "-20%", right: "-10%",
          backgroundColor: "#ff6b9d",
          opacity: useTransform(bgOpacity, [0.3, 1], [0, 0.1]),
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        {/* Section heading */}
        <motion.div
          className="flex items-center gap-2 mb-12 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#2b2d42", opacity: headingOpacity }}
        >
          <span>・</span>
          <span style={{ color: "#e84a5f" }}>GET IN TOUCH</span>
        </motion.div>

        {/* Contact text */}
        <div style={{ overflow: "hidden" }}>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light max-w-3xl mb-16"
            style={{ color: "#2b2d42", fontFamily: "Inter, sans-serif", clipPath: bodyClip }}
          >
          LOOKING FOR INTERNSHIP &amp; CO-OP OPPORTUNITIES IN
          SOFTWARE ENGINEERING, FRONT-END DEVELOPMENT, AND CREATIVE TECHNOLOGY.
          IF MY WORK RESONATES WITH YOU, I&apos;D LOVE TO HEAR FROM YOU.
        </motion.p>
        </div>

        {/* Contact name */}
        <motion.p
          className="text-6xl md:text-8xl lg:text-9xl leading-none mb-16"
          style={{
            fontFamily: "Six Caps, sans-serif",
            color: "#e84a5f",
            transformOrigin: "left",
            opacity: nameOpacity,
            scaleX: nameScale,
          }}
        >
          NGUYEN
        </motion.p>

        {/* Contact links */}
        <motion.div
          className="flex flex-wrap gap-8 mb-6"
          style={{ opacity: linksOpacity }}
        >
          <a
            href="mailto:ng.andrew2006@gmail.com"
            data-cursor="link"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            EMAIL
          </a>
          <a
            href="https://github.com/Andrew126111"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/andrew-nguyenn18"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            LINKEDIN
          </a>
          <a
            href="#"
            data-cursor="link"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            RESUME
          </a>
        </motion.div>

        {/* Closing tagline */}
        <motion.p
          className="text-xs tracking-[0.3em] mb-20"
          style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: useTransform(taglineOpacity, [0, 1], [0, 0.25]) }}
        >
          AVAILABLE FOR INTERNSHIPS &middot; SUMMER 2025 &middot; OPEN TO RELOCATION
        </motion.p>

        {/* Contact card */}
        <motion.div
          className="app-card-wrapper"
          data-cursor="magnetic"
          style={{
            backgroundColor: "#ffb3a6",
            rotate: -6,
            position: "relative",
            opacity: cardOpacity,
            x: cardX,
          }}
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
      </div>
    </section>
  );
}
