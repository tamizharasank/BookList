import React from "react";
import { useBooks } from "../context/BooksContext";
import { useNavigate } from "react-router-dom";
import BookItem from "../components/BookItem";

export default function BooksPage() {
  const { books, loading, add } = useBooks();
  const nav = useNavigate();

  if (loading) return <div className="container">Loading...</div>;

  return (
    <main className="container">
      <h1>Books List</h1>
      <button onClick={add}>Add Book</button>

      <div className="list">
        {books.map(b => (
          <BookItem key={b.id} book={b} onClick={() => nav(`/books/${b.id}`)} />
        ))}
      </div>
    </main>
  );
}
