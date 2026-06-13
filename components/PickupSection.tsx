"use client";

import { motion } from "framer-motion";

const items = [
  { num: "01", text: "PASSIONATE ABOUT CREATING THINGS THAT LIVE ON THE WEB", color: "#0d4c82" },
  { num: "02", text: "EXPLORING THE BOUNDARIES OF INTERACTION AND ANIMATION", color: "#5e6d90" },
  { num: "03", text: "BUILDING PROJECTS THAT BLEND DESIGN AND TECHNOLOGY", color: "#e0710a" },
];

export default function PickupSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#55b1ff" }}>
      {/* Background circles */}
      <span
        className="absolute block"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          backgroundColor: "#7ec1f9",
          top: "-10%",
          right: "10%",
        }}
      />
      <span
        className="absolute block"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: "#c9d3e9",
          bottom: "20%",
          left: "5%",
        }}
      />
      <span
        className="absolute block"
        style={{
          width: 250,
          height: 250,
          borderRadius: "50%",
          backgroundColor: "#f3c39f",
          top: "50%",
          right: "5%",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-32 md:py-48">
        {/* Section heading */}
        <motion.div
          className="flex items-center gap-2 mb-16 md:mb-24"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#302c1a" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span>・</span>
          <span>SELECTED</span>
          <span>PROJECT</span>
        </motion.div>

        {/* Numbered items */}
        <div className="space-y-16 md:space-y-20">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-6 md:gap-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <span
                className="text-5xl md:text-7xl lg:text-8xl leading-none shrink-0"
                style={{ fontFamily: "Six Caps, sans-serif", color: item.color }}
              >
                {item.num}
              </span>
              <p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed mt-2 max-w-2xl"
                style={{ fontFamily: "Inter, sans-serif", color: item.color, fontWeight: 300 }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
