import type { Metadata } from "next";
import { BooksView } from "./books-view";

export const metadata: Metadata = {
  title: "The Book Hub — Resources",
  description:
    "A living library of notes from the books that shaped how I research, build, and tell product stories. Every cover opens to its own page.",
};

export default function BooksPage() {
  return <BooksView />;
}
