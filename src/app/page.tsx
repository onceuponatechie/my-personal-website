import type { Metadata } from "next";
import { Navbar } from "@/components/SiteChrome";
import { Hero } from "@/components/Hero";
import { Resources } from "@/components/Resources";
import { Manifesto } from "@/components/Manifesto";
import { Projects } from "@/components/Projects";
import { FromTheDesk } from "@/components/FromTheDesk";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Essy Udeme — Products, people, and the stories that connect them",
  description:
    "Creator, builder, and storyteller. Explore products, journals, research, and ready-to-use templates.",
  openGraph: {
    title: "Essy Udeme",
    description: "Products, people, and the stories that connect them.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />
      <Hero />
      <Resources />
      <Manifesto />
      <Projects />
      <FromTheDesk />
      <Footer />
    </main>
  );
}
