import type { Metadata } from "next";
import { ResourcesView } from "./resources-view";

export const metadata: Metadata = {
  title: "Resources — Essy Udeme",
  description: "Templates, tools, and research — free, useful things to take with you.",
};

export default function ResourcesPage() {
  return <ResourcesView />;
}
