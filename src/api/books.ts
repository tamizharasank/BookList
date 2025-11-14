import { Book } from "../types/Book";
import { v4 as uuid } from "uuid";

let DB: Book[] = [
  { id: uuid(), title: "Clean Code", description: "A handbook.", imageUrl: "https://placehold.co/200x300/333/fff?text=Book" },
  { id: uuid(), title: "Pragmatic Programmer", description: "Classic dev book.", imageUrl: "https://placehold.co/200x300/333/fff?text=Book" }
];

const wait = (ms = 200) => new Promise(res => setTimeout(res, ms));

export const booksApi = {
  async getAll(): Promise<Book[]> {
    await wait();
    return [...DB];
  },

  async getById(id: string): Promise<Book> {
    await wait();
    const found = DB.find(b => b.id === id);
    if (!found) throw new Error("Not found");
    return found;
  },

  async create(title: string): Promise<Book> {
    await wait();
    const book = { id: uuid(), title, description: "New book.", imageUrl: 'https://placehold.co/200x300/333/fff?text=Book' };
    DB = [book, ...DB];
    return book;
  }
};
