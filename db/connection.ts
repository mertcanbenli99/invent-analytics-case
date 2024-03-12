import { DataSource } from "typeorm"
import { User } from "../db/entities/user.entity"
import dotenv from "dotenv";
import { TYPEORM } from "config/config";

export const PostgresDataSource = new DataSource({
    type: TYPEORM.CONNECTION as "postgres",
    host: TYPEORM.HOST,
    port: Number(TYPEORM.PORT),
    username: TYPEORM.USERNAME,
    password: TYPEORM.PASSWORD,
    database: TYPEORM.DATABASE,
    entities: [
        User
    ],
    synchronize: true
})
