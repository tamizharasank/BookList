import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BookDetailPage from "../pages/BookDetailPage";
import { booksApi } from "../api/books";
import { Book } from "../types/Book";

jest.mock("../api/books", () => ({
    booksApi: {
        getById: jest.fn(),
    },
}));

describe("BookDetailPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderWithRoute = (initialPath: string) =>
        render(
            <MemoryRouter initialEntries={[initialPath]}>
                <Routes>
                    <Route path="/books/:id" element={<BookDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

    it("renders Not Found when no book is returned", async () => {
        (booksApi.getById as jest.Mock).mockRejectedValueOnce(new Error("not found"));
        renderWithRoute("/books/123");
        expect(await screen.findByText("Not Found")).toBeInTheDocument();
    });

    it("renders book details when book is found", async () => {
        const book: Book = {
            id: "123",
            title: "Test Book",
            description: "Test Description",
            imageUrl: "http://example.com/image.png",
        };
        (booksApi.getById as jest.Mock).mockResolvedValueOnce(book);

        renderWithRoute("/books/123");

        expect(await screen.findByText("Test Book")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
        const img = screen.getByAltText("Test Book cover") as HTMLImageElement;
        expect(img.src).toContain("http://example.com/image.png");
    });

    it("renders placeholder image when onError is triggered", async () => {
        const book: Book = {
            id: "123",
            title: "Broken Image Book",
            description: "Desc",
            imageUrl: "https://via.placeholder.com/240x320?text=No+Image",
        };
        (booksApi.getById as jest.Mock).mockResolvedValueOnce(book);

        renderWithRoute("/books/123");

        const img = await screen.findByAltText("Broken Image Book cover");

        act(() => {
            fireEvent.error(img);
        });

        expect((img as HTMLImageElement).src).toBe(
            "https://via.placeholder.com/240x320?text=No+Image"
        );
    });


    it("renders Back link", async () => {
        const book: Book = {
            id: "123",
            title: "Book With Link",
            description: "Desc",
            imageUrl: "",
        };
        (booksApi.getById as jest.Mock).mockResolvedValueOnce(book);

        renderWithRoute("/books/123");

        expect(await screen.findByText("Back")).toHaveAttribute("href", "/books");
    });
});
