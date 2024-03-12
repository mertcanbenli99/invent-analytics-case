import { Column, Index, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import { User } from "./user.entity";

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

    @Column()
    borrow_date: Date

    @Column({nullable: true})
    return_date: Date;

    @Column({default: -1})
    score: number;

    @Column({default: false})
    returned: boolean;
    

}