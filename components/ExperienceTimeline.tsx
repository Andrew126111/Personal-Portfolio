"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2022",
    title: "STARTED PROGRAMMING",
    description: "Began learning to code in the summer. Started with Python and web fundamentals. Discovered a passion for building things on the web.",
    color: "#ff6b9d",
  },
  {
    year: "2023",
    title: "FIRST PROJECTS",
    description: "Built first full-stack applications. Explored React, Node.js, and databases. Started contributing to open source.",
    color: "#6bcbff",
  },
  {
    year: "2024",
    title: "DEEPER INTO INTERACTION",
    description: "Discovered Framer Motion and creative development. Focused on front-end engineering, animation, and UI design. Built interactive portfolio pieces.",
    color: "#ffd93d",
  },
  {
    year: "2025",
    title: "COMPUTER SCIENCE AT QUEEN'S",
    description: "Currently pursuing a degree in Computer Science. Building towards internships and co-op opportunities in software engineering and creative technology.",
    color: "#a8e6cf",
  },
];

export default function ExperienceTimeline({ sectionId }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#fef9ff", backfaceVisibility: "hidden" }}
    >
      {/* Background circle */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          bottom: "-20%",
          right: "-10%",
          backgroundColor: "#6bcbff",
          opacity: 0.06,
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-32 md:py-40">
        {/* Section heading */}
        <motion.div
          className="flex items-center gap-2 mb-16 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#2b2d42" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span>・</span>
          <span>EXPERIENCE</span>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-px"
            style={{ backgroundColor: "#2b2d42", opacity: 0.1 }}
          />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              className="relative flex items-start gap-6 md:gap-10 pb-16 md:pb-20 last:pb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              {/* Year with dot */}
              <div className="relative flex items-center justify-center shrink-0" style={{ width: 120, height: 40 }}>
                {/* Dot */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    left: 54,
                    backgroundColor: item.color,
                    zIndex: 2,
                  }}
                />
                <span
                  className="text-lg md:text-xl tracking-[0.15em]"
                  style={{
                    fontFamily: "Six Caps, sans-serif",
                    color: item.color,
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {item.year}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3
                  className="text-xl md:text-2xl lg:text-3xl tracking-[0.05em] mb-2"
                  style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed font-light max-w-lg"
                  style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0.6 }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
