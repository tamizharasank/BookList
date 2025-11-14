import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock lazy-loaded pages
jest.mock("../pages/BooksPage", () => ({
  __esModule: true,
  default: () => <div>Books Page</div>,
}));

jest.mock("../pages/BookDetailPage", () => ({
  __esModule: true,
  default: () => <div>Book Detail Page</div>,
}));

describe("App Routing (TSX)", () => {
  it("renders loading fallback during suspense", () => {
    render(<App />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("redirects from / to /books", async () => {
    window.history.pushState({}, "Test page", "/");
    render(<App />);
    expect(await screen.findByText(/Books Page/i)).toBeInTheDocument();
  });

  it("renders BooksPage at /books", async () => {
    window.history.pushState({}, "Test page", "/books");
    render(<App />);
    expect(await screen.findByText(/Books Page/i)).toBeInTheDocument();
  });

  it("renders BookDetailPage at /books/:id", async () => {
    window.history.pushState({}, "Test page", "/books/123");
    render(<App />);
    expect(await screen.findByText(/Book Detail Page/i)).toBeInTheDocument();
  });
});
