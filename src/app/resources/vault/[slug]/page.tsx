import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VAULT, getVaultEntry, relatedVault } from "@/lib/site-data";
import { getVaultContent } from "@/lib/vault-content";
import { VaultDetailView } from "./vault-detail-view";

export function generateStaticParams() {
  return VAULT.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getVaultEntry(slug);
  if (!entry) return { title: "The Product Lab" };
  return {
    title: `${entry.title} — The Product Lab`,
    description: entry.summary,
  };
}

export default async function VaultDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getVaultEntry(slug);
  if (!entry) notFound();
  return (
    <VaultDetailView
      entry={entry}
      related={relatedVault(slug)}
      content={getVaultContent(slug)}
    />
  );
}
