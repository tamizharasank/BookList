import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BooksProvider, useBooks } from "../context/BooksContext";
import { booksApi } from "../api/books";
import { Book } from "../types/Book";

jest.mock("../api/books", () => ({
  booksApi: {
    getAll: jest.fn(),
    create: jest.fn(),
  },
}));

const Consumer: React.FC = () => {
  const { books, loading, add } = useBooks();
  return (
    <div>
      <div data-testid="loading">{loading ? "loading" : "loaded"}</div>
      <div data-testid="books">{books.map((b) => b.title).join(",")}</div>
      <button onClick={add}>add</button>
    </div>
  );
};

describe("BooksProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading initially and then loads books", async () => {
    const mockBooks: Book[] = [
      { id: "1", title: "Book A" },
      { id: "2", title: "Book B" },
    ];
    (booksApi.getAll as jest.Mock).mockResolvedValueOnce(mockBooks);

    render(
      <BooksProvider>
        <Consumer />
      </BooksProvider>
    );

    expect(screen.getByTestId("loading")).toHaveTextContent("loading");
    await screen.findByText("loaded");
    expect(screen.getByTestId("books")).toHaveTextContent("Book A,Book B");
  });

  it("adds a new book via add()", async () => {
    const initialBooks: Book[] = [{ id: "1", title: "Book A" }];
    const newBook: Book = { id: "2", title: "New Book" };
    (booksApi.getAll as jest.Mock).mockResolvedValueOnce(initialBooks);
    (booksApi.create as jest.Mock).mockResolvedValueOnce(newBook);

    render(
      <BooksProvider>
        <Consumer />
      </BooksProvider>
    );

    await screen.findByText("loaded");
    await act(async () => {
      screen.getByText("add").click();
    });

    expect(screen.getByTestId("books")).toHaveTextContent("New Book,Book A");
  });

  it("throws if useBooks is used outside provider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    const BrokenConsumer = () => {
      useBooks();
      return null;
    };
    expect(() => render(<BrokenConsumer />)).toThrow();
    spy.mockRestore();
  });
});
