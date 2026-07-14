"use client";

import { ReactNode } from "react";

interface ProjectPageProps {
  num: string;
  title: string;
  description: string;
  tags: string[];
  bgColor: string;
  accentColor: string;
  circleColor: string;
  sectionId?: string;
  children?: ReactNode;
}

export default function ProjectPage({
  num,
  title,
  description,
  tags,
  accentColor,
  circleColor,
  sectionId,
  children,
}: ProjectPageProps) {
  return (
    <section
      id={sectionId}
      data-pin="top"
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{ minHeight: "100vh" }}
    >
      {/* Decorative circles with depth parallax */}
      <div
        data-depth={0.25}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600, height: 600,
          top: "-15%", right: "-10%",
          backgroundColor: circleColor,
          opacity: 0.12,
        }}
      />
      <div
        data-depth={0.2}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          bottom: "10%", left: "5%",
          backgroundColor: circleColor,
          opacity: 0.08,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        {/* Number */}
        <div
          data-reveal="slide"
          data-delay="0"
          className="mb-6 md:mb-10 text-6xl md:text-8xl leading-none"
          style={{ fontFamily: "Six Caps, sans-serif", color: accentColor }}
        >
          {num}
        </div>

        {/* Title */}
        <div data-reveal="clip" data-delay="0.15">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 md:mb-8"
            style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
          >
            {title}
          </h2>
        </div>

        {/* Description */}
        <p
          data-reveal="slide"
          data-delay="0.3"
          className="text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mb-8 font-light"
          style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
        >
          {description}
        </p>

        {/* Tags */}
        <div
          data-reveal="fade"
          data-delay="0.4"
          className="flex flex-wrap gap-3 mb-8"
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
        </div>

        {/* Children (links) */}
        {children && (
          <div data-reveal="fade" data-delay="0.5">
            {children}
          </div>
        )}

        {/* Decorative line */}
        <div
          data-reveal="line"
          data-delay="0.2"
          className="mt-12 md:mt-16 w-full max-w-xl"
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
        </div>
      </div>
    </section>
  );
}
