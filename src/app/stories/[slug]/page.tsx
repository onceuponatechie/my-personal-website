import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STORIES } from "@/lib/site-data";
import { StoryDetailView } from "./story-detail-view";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) return { title: "Story" };
  return {
    title: `${story.title} — Stories`,
    description: story.excerpt,
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) notFound();
  return <StoryDetailView s={story} />;
}
