import type { Metadata } from "next";
import { ProjectsView } from "./projects-view";

export const metadata: Metadata = {
  title: "Projects — Essy Udeme",
  description: "Selected products built with care — case studies, tools, and quiet interfaces.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
