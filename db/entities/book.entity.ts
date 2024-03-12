import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    @Index()
    id: number

    @Column({type: "varchar"})
    name: string
}