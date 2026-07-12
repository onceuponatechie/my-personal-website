import type { Metadata } from "next";
import { StoriesView } from "./stories-view";

export const metadata: Metadata = {
  title: "The Rabbit Hole — Essy Udeme",
  description:
    "Issues for curious people — each starts with a simple question and follows it wherever it leads.",
};

export default function StoriesPage() {
  return <StoriesView />;
}
