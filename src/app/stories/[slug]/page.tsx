import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STORIES, BOOKS } from "@/lib/site-data";
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
  const idx = STORIES.findIndex((s) => s.slug === slug);
  if (idx === -1) notFound();
  const story = STORIES[idx];
  // Next letter in the loop + one book note as the take-away resource.
  const nextStory = STORIES[(idx + 1) % STORIES.length];
  const resource = BOOKS[idx % BOOKS.length];
  return <StoryDetailView s={story} nextStory={nextStory} resource={resource} />;
}
