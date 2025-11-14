import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookItem from "../components/BookItem";
import { Book } from "../types/Book";

describe("BookItem", () => {
  const baseBook: Book = {
    id: "1",
    title: "Test Title",
    description: "Test Description",
    imageUrl: "",
  };

  it("renders book title and description", () => {
    render(<BookItem book={baseBook} onClick={() => {}} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders placeholder when no imageUrl", () => {
    render(<BookItem book={baseBook} onClick={() => {}} />);
    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    const bookWithImage: Book = { ...baseBook, imageUrl: "http://example.com/cover.png" };
    render(<BookItem book={bookWithImage} onClick={() => {}} />);
    const img = screen.getByAltText("cover") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("http://example.com/cover.png");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<BookItem book={baseBook} onClick={handleClick} />);
    fireEvent.click(screen.getByText("Test Title"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
