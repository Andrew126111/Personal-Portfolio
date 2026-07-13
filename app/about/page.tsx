"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import HeaderLogo from "@/components/HeaderLogo";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import ParallaxSection from "@/components/ParallaxSection";
import WatermarkReveal from "@/components/WatermarkReveal";
import AboutSection from "@/components/AboutSection";
import WhyIBuild from "@/components/WhyIBuild";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import CurrentlySection from "@/components/CurrentlySection";
import BeyondCode from "@/components/BeyondCode";

export default function AboutPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <HeaderLogo />
          <CustomCursor loaded={loaded} />

          <SmoothScroll>
            <ParallaxSection speed={0.15}>
              <WatermarkReveal>
                <AboutSection />
              </WatermarkReveal>
            </ParallaxSection>

            <ParallaxSection speed={0.15}>
              <WatermarkReveal>
                <WhyIBuild />
              </WatermarkReveal>
            </ParallaxSection>

            <ParallaxSection speed={0.1}>
              <WatermarkReveal>
                <ExperienceTimeline />
              </WatermarkReveal>
            </ParallaxSection>

            <ParallaxSection speed={0.12}>
              <CurrentlySection />
            </ParallaxSection>

            <ParallaxSection speed={0.1}>
              <BeyondCode />
            </ParallaxSection>

            {/* Back to Projects CTA */}
            <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#fef9ff", backfaceVisibility: "hidden" }}>
              <div className="max-w-6xl mx-auto px-8 md:px-16 py-32 md:py-40 text-center">
                <motion.p
                  className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8"
                  style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  WANT TO SEE
                  <br />
                  WHAT I&apos;VE BUILT?
                </motion.p>
                <motion.button
                  className="inline-block text-sm tracking-[0.25em] px-8 py-3"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: "#ffffff",
                    backgroundColor: "#ff6b9d",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/")}
                >
                  VIEW PROJECTS
                </motion.button>
              </div>
            </section>
          </SmoothScroll>
        </>
      )}
    </>
  );
}
