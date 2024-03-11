import {  Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Index()
    id: number

    @Column({type: "varchar"})
    name: string

}