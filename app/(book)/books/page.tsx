import { FC } from "react";
import BookScroller from "@/components/books/BookScroller";
import { mockBooks } from "@/components/books/mockData";
import { Metadata } from "next";
import { bookService } from "@/service/books";
export const metadata: Metadata = {
  title: "Recently read books",
  description: "Recently read books",
};
const BooksPage: FC = async () => {
  const data = await bookService.getAllBooks();
  return (
    <div className="w-full px-4 py-8 md:px-8 lg:px-12">
      <BookScroller books={data?.docs} />
    </div>
  );
};

export default BooksPage;
