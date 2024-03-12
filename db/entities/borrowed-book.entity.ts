import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import { User } from "./user.entity";

@Entity()
export class BorrowedBook {

    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    book_id: number;

    @ManyToOne(() => Book, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'book_id'})
    book: Book

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    borrow_date: Date

    @Column({nullable: true})
    return_date: Date;

    @Column({default: -1})
    score: number;

    @Column({default: false})
    returned: boolean;
}