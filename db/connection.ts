import { DataSource } from "typeorm"
import { User } from "../db/entities/user.entity"

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "invent-analytics-case",
    entities: [
        User
    ],
    synchronize: true
})
