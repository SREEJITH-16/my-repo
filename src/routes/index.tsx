import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/Reveal";
import { SiteBackground } from "@/components/SiteBackground";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { AcademicPerformance } from "@/components/AcademicPerformance";
import { WhatIDo } from "@/components/WhatIDo";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Experience } from "@/components/Experience";
import { CertificateGallery } from "@/components/CertificateGallery";
import { ActivitySection } from "@/components/ActivitySection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const TITLE = "Sreejith S — Software Engineer & Full-Stack Developer";
const DESCRIPTION =
  "Portfolio of Sreejith S — B.Tech CSE student at SRM Institute of Science and Technology and Software Engineer Intern at Zoho Corporation. Projects, academics, certifications and experience.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteBackground />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <AcademicPerformance />
        <WhatIDo />
        <ProjectShowcase />
        <Experience />
        <CertificateGallery />
        <ActivitySection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
