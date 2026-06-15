import type { Metadata } from "next";
import { AboutView } from "./about-view";

export const metadata: Metadata = {
  title: "About — Once Upon a Techie",
  description: "I'm Essy — designer, builder, storyteller. Here's the long version.",
};

export default function AboutPage() {
  return <AboutView />;
}
