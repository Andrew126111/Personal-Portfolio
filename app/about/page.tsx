"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeaderLogo from "@/components/HeaderLogo";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import AboutSection from "@/components/AboutSection";
import PickupSection from "@/components/PickupSection";
import ProjectCards from "@/components/ProjectCards";
import ContactSection from "@/components/ContactSection";

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <HeaderLogo />
          <CustomCursor loaded={loaded} />

          <SmoothScroll>
            <AboutSection />
            <PickupSection />
            <ProjectCards />
            <ContactSection />
          </SmoothScroll>
        </>
      )}
    </>
  );
}
