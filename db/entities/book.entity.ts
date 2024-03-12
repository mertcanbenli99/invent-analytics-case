import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BorrowedBook } from "./borrowed-book.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @OneToMany(() => BorrowedBook, (borrowedBook) => borrowedBook.book, {
    onDelete: "CASCADE",
  })
  borrowedBooks?: BorrowedBook[];
}
