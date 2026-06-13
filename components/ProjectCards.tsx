"use client";

import { motion } from "framer-motion";

const projects = [
  { name: "PROJECT ONE", desc: "A FULL-STACK WEB APPLICATION BUILT WITH NEXT.JS AND TYPESCRIPT", abbr: "PRJ1", rotate: 8 },
  { name: "PROJECT TWO", desc: "AN INTERACTIVE DATA VISUALIZATION DASHBOARD WITH REALTIME UPDATES", abbr: "PRJ2", rotate: -7 },
  { name: "PROJECT THREE", desc: "A MOBILE-FIRST SOCIAL PLATFORM WITH REAL-TIME MESSAGING", abbr: "PRJ3", rotate: -6 },
  { name: "PROJECT FOUR", desc: "AN E-COMMERCE SOLUTION WITH STRIPE INTEGRATION AND CMS", abbr: "PRJ4", rotate: -9 },
  { name: "PROJECT FIVE", desc: "A MACHINE LEARNING API FOR IMAGE RECOGNITION AND ANALYSIS", abbr: "PRJ5", rotate: 6 },
  { name: "PROJECT SIX", desc: "A COLLABORATIVE CODE EDITOR WITH REAL-TIME SYNC", abbr: "PRJ6", rotate: 7 },
  { name: "PROJECT SEVEN", desc: "AN OPEN SOURCE CONTRIBUTION TOOL FOR DEVELOPER COMMUNITIES", abbr: "PRJ7", rotate: -5 },
];

const positions = [
  { top: "5%", left: "5%" },
  { top: "15%", left: "35%" },
  { top: "30%", left: "65%" },
  { top: "45%", left: "10%" },
  { top: "55%", left: "45%" },
  { top: "70%", left: "25%" },
  { top: "80%", left: "55%" },
];

export default function ProjectCards() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#f3c39f" }}>
      <div className="relative min-h-[200vh] px-8 md:px-16 py-32">
        {/* Marquee heading */}
        <motion.div
          className="mb-16 overflow-hidden"
          style={{ fontFamily: "Six Caps, sans-serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-4xl md:text-6xl text-nowrap"
            style={{ color: "#302c1a", letterSpacing: "0.05em" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON.&nbsp;&nbsp;&nbsp;
            MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON.&nbsp;&nbsp;&nbsp;
            MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON.
          </motion.p>
        </motion.div>

        {/* Project cards */}
        <div className="relative" style={{ height: "150vh" }}>
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="app-card-wrapper absolute"
              style={{
                top: positions[i].top,
                left: positions[i].left,
                backgroundColor: "#ffffff",
                rotate: project.rotate,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div
                className="w-full h-full flex flex-col p-5 md:p-6"
                style={{ fontFamily: "Six Caps, sans-serif", color: "#302c1a" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">・</span>
                  <span className="text-xs tracking-[0.2em]">{project.name}</span>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xs leading-relaxed text-center tracking-wide px-2"
                     style={{ fontFamily: "Inter, sans-serif" }}>
                    {project.desc}
                  </p>
                </div>

                <div className="mt-auto pt-3 border-t border-[#302c1a]/20 text-center">
                  <span className="text-xl tracking-[0.15em]">{project.abbr}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
