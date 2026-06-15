import type { Metadata } from "next";
import { VaultView } from "./vault-view";

export const metadata: Metadata = {
  title: "Research Vault — Resources",
  description: "Deep dives into human behaviour and product research.",
};

export default function VaultPage() {
  return <VaultView />;
}
