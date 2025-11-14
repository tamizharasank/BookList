import React, { createContext, useContext, useState, useEffect } from "react";
import { booksApi } from "../api/books";
import { Book } from "../types/Book";

type T = { books: Book[]; loading: boolean; add: () => Promise<void> };

const Ctx = createContext<T | null>(null);
export const useBooks = () => {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useBooks must be used within BooksProvider");
  }
  return ctx;
};

export const BooksProvider: React.FC<{ children: any }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    booksApi.getAll().then(setBooks).finally(() => setLoading(false));
  }, []);

  const add = async () => {
    const b = await booksApi.create("New Book");
    setBooks(s => [b, ...s]);
  };

  return <Ctx.Provider value={{ books, loading, add }}>{children}</Ctx.Provider>;
};
