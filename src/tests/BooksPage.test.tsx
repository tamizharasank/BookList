import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BooksPage from "../pages/BooksPage";
import { useBooks } from "../context/BooksContext";
import { useNavigate } from "react-router-dom";

jest.mock("../context/BooksContext", () => ({
  useBooks: jest.fn(),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

jest.mock("../components/BookItem", () => (props: any) => (
  <div data-testid="book-item" onClick={props.onClick}>
    {props.book.title}
  </div>
));

describe("BooksPage", () => {
  const mockNavigate = jest.fn();
  const mockAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders loading state", () => {
    (useBooks as jest.Mock).mockReturnValue({
      books: [],
      loading: true,
      add: mockAdd,
    });

    render(<BooksPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders books list when not loading", () => {
    (useBooks as jest.Mock).mockReturnValue({
      books: [
        { id: "1", title: "Book A", description: "Desc A", imageUrl: "" },
        { id: "2", title: "Book B", description: "Desc B", imageUrl: "" },
      ],
      loading: false,
      add: mockAdd,
    });

    render(<BooksPage />);
    expect(screen.getByText("Books List")).toBeInTheDocument();
    expect(screen.getByText("Book A")).toBeInTheDocument();
    expect(screen.getByText("Book B")).toBeInTheDocument();
  });

  it("calls add when Add Book button is clicked", () => {
    (useBooks as jest.Mock).mockReturnValue({
      books: [],
      loading: false,
      add: mockAdd,
    });

    render(<BooksPage />);
    fireEvent.click(screen.getByText("Add Book"));
    expect(mockAdd).toHaveBeenCalledTimes(1);
  });

  it("navigates to book detail when BookItem is clicked", () => {
    (useBooks as jest.Mock).mockReturnValue({
      books: [{ id: "123", title: "Book A", description: "Desc", imageUrl: "" }],
      loading: false,
      add: mockAdd,
    });

    render(<BooksPage />);
    fireEvent.click(screen.getByTestId("book-item"));
    expect(mockNavigate).toHaveBeenCalledWith("/books/123");
  });
});
