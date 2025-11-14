import React, { useEffect, useState } from "react";
import { booksApi } from "../api/books";
import { Book } from "../types/Book";
import { Link, useParams } from "react-router-dom";
import './BookDetaiPage.css';
const PLACEHOLDER =
    "https://via.placeholder.com/240x320?text=No+Image";

export default function BookDetailPage() {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (id) booksApi.getById(id).then(setBook).catch(() => setBook(null));
    }, [id]);

    if (!book) return <div className="container">Not Found</div>;

    return (
        <main className="container">
            {book.imageUrl ? (
                <img
                    src={book.imageUrl || PLACEHOLDER}
                    alt={`${book.title} cover`}
                    width={240}
                    height={320}
                    loading="lazy"
                    onError={(e) => {
                        if (e.currentTarget.src !== PLACEHOLDER) {
                            e.currentTarget.src = PLACEHOLDER;
                        }
                    }}
                    style={{ objectFit: "cover", borderRadius: 6 }}
                />
            ) : null}
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <Link to="/books" className="btn">Back</Link>
        </main>
    );
}
