import { DataSource } from "typeorm"
import { User } from "../db/entities/user.entity"
import { TYPEORM } from "../config/config";
import { Book } from "./entities/book.entity";

export const PostgresDataSource = new DataSource({
    type: TYPEORM.CONNECTION as "postgres",
    host: TYPEORM.HOST,
    port: Number(TYPEORM.PORT),
    username: TYPEORM.USERNAME,
    password: TYPEORM.PASSWORD,
    database: TYPEORM.DATABASE,
    entities: [
        User,
        Book
    ],
    synchronize: true
})
