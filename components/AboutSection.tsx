"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-32 md:py-48">
        {/* Section heading */}
        <motion.div
          className="flex items-center gap-2 mb-12 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#302c1a" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span>・</span>
          <span>ABOUT</span>
        </motion.div>

        {/* About text */}
        <div className="max-w-4xl">
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light mb-6"
            style={{ color: "#0d4c82", fontFamily: "Inter, sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            IN THE SUMMER OF 22, I STARTED PROGRAMMING. IT WAS LATER THAN MOST,
            BUT I THINK I FOUND SOMETHING THAT I WAS PASSIONATE ABOUT. I&apos;VE
            BEEN WRITING CODE EVERY DAY EVER SINCE. MY STRENGTH IS INSATIABLE
            CURIOSITY.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl leading-relaxed font-light"
            style={{ color: "#0d4c82", fontFamily: "Inter, sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            THE VISUAL EXPRESSIONS THAT I AM EXPLORING ON A DAILY BASIS ARE
            AVAILABLE ON GITHUB, RANGING FROM CSS ANIMATION TO EXPRESSIONS IN
            FRAMER MOTION. NOT ALL OF MY WORK IS AVAILABLE ON GITHUB, BUT YOU
            CAN FIND LINKS TO IT IN MY PORTFOLIO.
          </motion.p>
        </div>

        {/* Bounce line */}
        <motion.div
          className="mt-16 md:mt-24 w-full max-w-3xl"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
        >
          <svg viewBox="0 0 1000 160" fill="none">
            <path
              d="M0,80 Q 250 200, 500 80 T 1000,80"
              stroke="#0d4c82"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
