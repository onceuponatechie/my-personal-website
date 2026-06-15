import type { Metadata } from "next";
import { ProjectsView } from "./projects-view";

export const metadata: Metadata = {
  title: "Projects — Once Upon a Techie",
  description: "Selected products built with care — case studies, tools, and quiet interfaces.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
