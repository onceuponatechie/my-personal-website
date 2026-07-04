import type { Metadata } from "next";
import { StoriesView } from "./stories-view";

export const metadata: Metadata = {
  title: "The Build Diary — Essy Udeme",
  description: "The blog — honest logs on product, design, and the quiet craft of building software.",
};

export default function StoriesPage() {
  return <StoriesView />;
}
