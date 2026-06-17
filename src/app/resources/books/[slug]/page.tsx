import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BOOKS, getBook, relatedBooks } from "@/lib/site-data";
import { BookDetailView } from "./book-detail-view";

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
  if (!book) return { title: "Book Hub" };
  return {
    title: `${book.title} — Book Hub`,
    description: book.takeaway,
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();
  return <BookDetailView book={book} related={relatedBooks(slug)} />;
}
