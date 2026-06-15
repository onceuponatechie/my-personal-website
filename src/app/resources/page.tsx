import type { Metadata } from "next";
import { ResourcesView } from "./resources-view";

export const metadata: Metadata = {
  title: "Resources — Once Upon a Techie",
  description: "Templates, tools, and research — free, useful things to take with you.",
};

export default function ResourcesPage() {
  return <ResourcesView />;
}
