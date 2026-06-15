import type { Metadata } from "next";
import { ContactView } from "./contact-view";

export const metadata: Metadata = {
  title: "Let's build — Contact",
  description: "Tell me about your project. Long sprints, clear scope, weekly demos.",
};

export default function ContactPage() {
  return <ContactView />;
}
