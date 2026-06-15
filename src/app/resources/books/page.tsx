import type { Metadata } from "next";
import { BooksView } from "./books-view";

export const metadata: Metadata = {
  title: "Book Notes — Resources",
  description: "Honest takeaways from books on product, behaviour, and the craft of building.",
};

export default function BooksPage() {
  return <BooksView />;
}
