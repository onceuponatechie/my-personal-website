import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VAULT, getVaultEntry, relatedVault } from "@/lib/site-data";
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
  if (!entry) return { title: "Research Vault" };
  return {
    title: `${entry.title} — Research Vault`,
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
  return <VaultDetailView entry={entry} related={relatedVault(slug)} />;
}
