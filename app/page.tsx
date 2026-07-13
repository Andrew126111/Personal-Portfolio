"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import HeaderLogo from "@/components/HeaderLogo";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import ProjectPage from "@/components/ProjectPage";
import ContactSection from "@/components/ContactSection";
import PageTransition from "@/components/PageTransition";
import ParallaxSection from "@/components/ParallaxSection";
import ScrollIndicator from "@/components/ScrollIndicator";

const projects = [
  {
    num: "01",
    title: "PROJECT BEACON",
    description:
      "A FULL-STACK WEB APPLICATION BUILT WITH NEXT.JS AND TYPESCRIPT. FEATURES REAL-TIME DATA SYNCHRONIZATION, AUTHENTICATION, AND A RESPONSIVE DASHBOARD INTERFACE WITH ADVANCED FILTERING CAPABILITIES.",
    tags: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "POSTGRESQL", "TAILWIND"],
    bgColor: "#ffffff",
    accentColor: "#6bcbff",
    circleColor: "#ff6b9d",
  },
  {
    num: "02",
    title: "PROJECT NEXUS",
    description:
      "AN INTERACTIVE DATA VISUALIZATION PLATFORM THAT TRANSFORMS COMPLEX DATASETS INTO IMMERSIVE VISUAL STORIES. BUILT WITH D3.JS AND REACT, FEATURING CUSTOM ANIMATIONS AND REAL-TIME FILTERING.",
    tags: ["REACT", "D3.JS", "FRAMER MOTION", "NODE.JS", "MONGODB"],
    bgColor: "#fef9ff",
    accentColor: "#ff6b9d",
    circleColor: "#6bcbff",
  },
  {
    num: "03",
    title: "PROJECT KALEIDO",
    description:
      "A CREATIVE CODING SANDBOX THAT GENERATES GENERATIVE ART THROUGH CSS AND CANVAS ANIMATIONS. EXPLORES THE BOUNDARIES OF INTERACTION, COLOR, AND MOTION ON THE WEB.",
    tags: ["CSS ANIMATION", "CANVAS API", "TYPESCRIPT", "FRAMER MOTION", "GSAP"],
    bgColor: "#ffffff",
    accentColor: "#ffd93d",
    circleColor: "#ffb3a6",
  },
];

export default function Home() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleAboutClick = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      router.push("/about");
    }, 800);
  }, [router]);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />

      {loaded && (
        <>
          <HeaderLogo />
          <CustomCursor loaded={loaded} />
          <PageTransition active={transitioning} />
          <ScrollIndicator sectionIds={["hero", "project-1", "project-2", "project-3", "contact"]} />

          <SmoothScroll>
            <HeroSection sectionId="hero" onAboutClick={handleAboutClick} />

            {projects.map((p, i) => (
              <ParallaxSection key={p.num} speed={0.2 + i * 0.1}>
                <div style={i > 0 ? { marginTop: "-2px" } : undefined}>
                  <ProjectPage
                    sectionId={`project-${i + 1}`}
                    num={p.num}
                    title={p.title}
                    description={p.description}
                    tags={p.tags}
                    bgColor={p.bgColor}
                    accentColor={p.accentColor}
                    circleColor={p.circleColor}
                  />
                </div>
              </ParallaxSection>
            ))}

            <ParallaxSection speed={0.15}>
              <ContactSection sectionId="contact" />
            </ParallaxSection>
          </SmoothScroll>
        </>
      )}
    </>
  );
}
