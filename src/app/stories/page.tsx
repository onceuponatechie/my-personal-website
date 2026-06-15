import type { Metadata } from "next";
import { StoriesView } from "./stories-view";

export const metadata: Metadata = {
  title: "Stories — Once Upon a Techie",
  description: "Journal entries on product, design, and the quiet craft of building software.",
};

export default function StoriesPage() {
  return <StoriesView />;
}
