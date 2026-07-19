import type { Metadata } from "next";
import { VaultView } from "./vault-view";

export const metadata: Metadata = {
  title: "The Product Lab — Resources",
  description: "Product thinking, opportunity finding, and product teardowns.",
};

export default function VaultPage() {
  return <VaultView />;
}
