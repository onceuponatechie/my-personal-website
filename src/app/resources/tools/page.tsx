import type { Metadata } from "next";
import { ToolsView } from "./tools-view";

export const metadata: Metadata = {
  title: "Tools & Templates — Resources",
  description: "Free templates, Figma files, and small tools to borrow.",
};

export default function ToolsPage() {
  return <ToolsView />;
}
