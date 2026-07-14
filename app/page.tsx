"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import HeaderLogo from "@/components/HeaderLogo";
import { CursorProvider } from "@/components/CursorContext";
import PremiumCursor from "@/components/PremiumCursor";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import WhoAmI from "@/components/WhoAmI";
import ProjectPage from "@/components/ProjectPage";
import SkillsSection from "@/components/SkillsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";
import PageTransition from "@/components/PageTransition";
import ChapterNav from "@/components/ChapterNav";
import DepthBackground from "@/components/DepthBackground";

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

const sectionIds = ["hero", "whoami", "project-1", "project-2", "project-3", "skills", "experience", "contact"];
const chapters = [
  { num: "01", label: "IDENTITY" },
  { num: "02", label: "PURPOSE" },
  { num: "03", label: "PROJECTS" },
  { num: "04", label: "SKILLS" },
  { num: "05", label: "EXPERIENCE" },
  { num: "06", label: "CONTACT" },
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
          <CursorProvider>
          <HeaderLogo />
          <PremiumCursor loaded={loaded} />
          <ChapterNav />
          <PageTransition active={transitioning} />

          <SmoothScroll background={<DepthBackground />}>
            <HeroSection sectionId="hero" onAboutClick={handleAboutClick} />

            <WhoAmI sectionId="whoami" />

            {projects.map((p, i) => (
              <div key={p.num}>
                <ProjectPage
                  sectionId={`project-${i + 1}`}
                  num={p.num}
                  title={p.title}
                  description={p.description}
                  tags={p.tags}
                  bgColor={p.bgColor}
                  accentColor={p.accentColor}
                  circleColor={p.circleColor}
                >
                  <div className="flex flex-wrap gap-6">
                    <a
                      href="#"
                      data-cursor="link"
                      className="text-sm tracking-[0.15em] hover:opacity-60 transition-opacity"
                      style={{ fontFamily: "Inter, sans-serif", color: p.accentColor }}
                    >
                      LIVE DEMO →
                    </a>
                    <a
                      href="#"
                      data-cursor="link"
                      className="text-sm tracking-[0.15em] hover:opacity-60 transition-opacity"
                      style={{ fontFamily: "Inter, sans-serif", color: p.accentColor }}
                    >
                      VIEW SOURCE →
                    </a>
                  </div>
                </ProjectPage>
              </div>
            ))}

            <SkillsSection sectionId="skills" />

            <ExperienceTimeline sectionId="experience" />

            <ContactSection sectionId="contact" />
          </SmoothScroll>
          </CursorProvider>
        </>
      )}
    </>
  );
}
