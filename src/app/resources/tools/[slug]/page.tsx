import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, getTool, relatedTools } from "@/lib/site-data";
import { getToolContent } from "@/lib/tool-content";
import { ToolDetailView } from "./tool-detail-view";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Tools & Templates" };
  return {
    title: `${tool.name} — Tools & Templates`,
    description: tool.blurb,
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return <ToolDetailView tool={tool} content={getToolContent(slug)} related={relatedTools(slug)} />;
}
