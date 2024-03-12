import { BorrowedBook } from "../db/entities/borrowed-book.entity";
import { PostgresDataSource } from "../db/connection";
import { User } from "../db/entities/user.entity";
import express, { Request, Response } from "express";
import { MapBorrowedBooksData } from "./helper/user.helpers";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validation";
import { Book } from "../db/entities/book.entity";

const userRepository = PostgresDataSource.getRepository(User);
const borrowedBookRepository = PostgresDataSource.getRepository(BorrowedBook);
const bookRepository = PostgresDataSource.getRepository(Book);

const router = express.Router();

router.post(
  "/users",
  [body("name").isString().notEmpty().withMessage("name required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const user = userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.status(201).send(results);
  },
);

router.get("/users", async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.status(200).send(users);
});

router.get(
  "/users/:userId",
  [param("userId").isNumeric()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const usersWithBorrowedBooks = await PostgresDataSource.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.books", "books")
      .leftJoinAndSelect("books.book", "book")
      .select([
        "user.id",
        "user.name",
        "books.score",
        "books.returned",
        "book.name",
      ])
      .where("user.id = :userId", { userId })
      .getMany();
    if (!usersWithBorrowedBooks) {
      return res.status(400).send({ message: "Resource not found" });
    }

    const result = MapBorrowedBooksData(usersWithBorrowedBooks);

    return res.send(result);
  },
);

router.post(
  "/users/:userId/borrow/:bookId",
  [param("userId").isNumeric(), param("bookId").isNumeric()],
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const bookId = Number(req.params.bookId);

    // Find the user
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    // Find the book
    const book = await bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      return res.status(400).send({ error: "Book does not exist" });
    }

    // Check if the book is already borrowed
    const borrowedBook = await borrowedBookRepository.findOne({
      where: { book_id: bookId, returned: false },
    });
    if (borrowedBook) {
      return res.status(400).send("This book is already borrowed");
    }

    // Create a new borrowed book entry
    const newBorrowedBook = borrowedBookRepository.create({
      book_id: bookId,
      user_id: userId,
    });
    await borrowedBookRepository.save(newBorrowedBook);

    return res.status(204).send("OK");
  },
);

router.post(
  "/users/:userId/return/:bookId",
  [body("score").isNumeric().notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const bookId = Number(req.params.bookId);
    const { score } = req.body;

    // Find the borrowed book
    const borrowedBook = await borrowedBookRepository.findOne({
      where: { user_id: userId, book_id: bookId, returned: false },
    });

    // If borrowed book not found, return 404 error
    if (!borrowedBook) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Update borrowed book details
    borrowedBook.score = score;
    borrowedBook.returned = true;
    borrowedBook.return_date = new Date();

    // Save the changes to the borrowed book
    await PostgresDataSource.getRepository(BorrowedBook).save(borrowedBook);

    // Return success response
    return res.status(204).send("OK");
  },
);

export { router as UserRouter };
