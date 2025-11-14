import React from "react";
import { Book } from "../types/Book";

function BookItem({ book, onClick }: { book: Book; onClick: () => void }) {
  return (
    <div className="book-item" onClick={onClick}>
      <div className="thumb">
        {book.imageUrl ? (
          <img src={book.imageUrl} alt="cover" />
        ) : (
          <div className="placeholder">No Image</div>
        )}
      </div>
      <div>
        <h3>{book.title}</h3>
        <p>{book.description}</p>
      </div>
    </div>
  );
}


export default BookItem;