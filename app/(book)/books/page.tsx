import { FC } from "react";
import BookScroller from "@/components/books/BookScroller";
import { mockBooks } from "@/components/books/mockData";

const BooksPage: FC = () => {
  return (
    <div className="w-full px-4 py-8 md:px-8 lg:px-12">
      <BookScroller books={mockBooks} />
    </div>
  );
};

export default BooksPage;
