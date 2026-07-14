"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import HeaderLogo from "@/components/HeaderLogo";
import { CursorProvider } from "@/components/CursorContext";
import PremiumCursor from "@/components/PremiumCursor";
import UnifiedScroll from "@/components/UnifiedScroll";
import { useAnimations } from "@/hooks/useAnimations";
import DepthBackground from "@/components/DepthBackground";
import AboutSection from "@/components/AboutSection";
import WhyIBuild from "@/components/WhyIBuild";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import CurrentlySection from "@/components/CurrentlySection";
import BeyondCode from "@/components/BeyondCode";

export default function AboutPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useAnimations();

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <CursorProvider>
          <DepthBackground />
          <HeaderLogo />
          <PremiumCursor loaded={loaded} />

          <UnifiedScroll>
            <AboutSection />

            <WhyIBuild />

            <ExperienceTimeline />

            <CurrentlySection />

            <BeyondCode />

            {/* Back to Projects CTA */}
            <section className="relative w-full overflow-hidden py-32 md:py-40">
              <div className="max-w-6xl mx-auto px-8 md:px-16 text-center">
                <div data-reveal="slide" data-start="top 85%" data-end="top 55%">
                  <p
                    className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8"
                    style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
                  >
                    WANT TO SEE
                    <br />
                    WHAT I&apos;VE BUILT?
                  </p>
                </div>
                <div data-reveal="scale" data-start="top 75%" data-end="top 55%">
                  <button
                    className="inline-block text-sm tracking-[0.25em] px-8 py-3"
                    data-cursor="magnetic"
                    onClick={() => router.push("/")}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "#ffffff",
                      backgroundColor: "#ff6b9d",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    VIEW PROJECTS
                  </button>
                </div>
              </div>
            </section>
          </UnifiedScroll>
          </CursorProvider>
        </>
      )}
    </>
  );
}
