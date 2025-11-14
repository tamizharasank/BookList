import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BooksProvider } from "./context/BooksContext";
import './App.css';
const Books = lazy(() => import("./pages/BooksPage"));
const Detail = lazy(() => import("./pages/BookDetailPage"));

export default function App() {
  return (
    <BrowserRouter>
      <BooksProvider>
        <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/books" replace />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Detail />} />
          </Routes>
        </Suspense>
      </BooksProvider>
    </BrowserRouter>
  );
}
