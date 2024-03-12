import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BorrowedBook } from "./borrowed-book.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @OneToMany(() => BorrowedBook, (borrowedBook) => borrowedBook.user, {
    onDelete: "CASCADE",
  })
  books: BorrowedBook[];
}
