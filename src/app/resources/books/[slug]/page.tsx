import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BOOKS, BOOK_HIGHLIGHTS, getBook, relatedBooks } from "@/lib/site-data";
import { BookNoteView } from "./book-note-view";

export function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Book note" };
  return {
    title: `${book.title} — Book notes`,
    description: book.takeaway,
  };
}

export default async function BookNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();
  return (
    <BookNoteView book={book} highlights={BOOK_HIGHLIGHTS[slug] ?? []} related={relatedBooks(slug)} />
  );
}
