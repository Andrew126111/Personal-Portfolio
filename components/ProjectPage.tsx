"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProjectPageProps {
  num: string;
  title: string;
  description: string;
  tags: string[];
  bgColor: string;
  accentColor: string;
  circleColor: string;
  children?: ReactNode;
}

export default function ProjectPage({
  num,
  title,
  description,
  tags,
  bgColor,
  accentColor,
  circleColor,
  children,
}: ProjectPageProps) {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: bgColor, backfaceVisibility: "hidden" }}
    >
      {/* Decorative circles */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "-15%",
          right: "-10%",
          backgroundColor: circleColor,
          opacity: 0.12,
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          bottom: "10%",
          left: "5%",
          backgroundColor: circleColor,
          opacity: 0.08,
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />

      <motion.div
        className="relative z-10 w-full"
        initial={{ clipPath: "inset(5% 0% 5% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-24 md:py-32">
        {/* Number */}
        <motion.div
          className="mb-6 md:mb-10 text-6xl md:text-8xl leading-none"
          style={{ fontFamily: "Six Caps, sans-serif", color: accentColor }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {num}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 md:mb-8"
          style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mb-8 font-light"
          style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs tracking-[0.1em]"
              style={{
                fontFamily: "Inter, sans-serif",
                backgroundColor: accentColor,
                color: "#ffffff",
                borderRadius: 4,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Children (links, extra content) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {children}
          </motion.div>
        )}

        {/* Decorative line */}
        <motion.div
          className="mt-12 md:mt-16 w-full max-w-xl"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
        >
          <svg viewBox="0 0 600 60" fill="none">
            <path
              d="M0,30 Q 150,70 300,30 T 600,30"
              stroke={accentColor}
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
}
