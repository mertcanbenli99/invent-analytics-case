import { Book } from "../db/entities/book.entity"
import { PostgresDataSource } from "../db/connection"
import express, {Request, Response} from "express"



const router = express.Router()

router.post('/books', async (req: Request, res: Response) => {
    console.log(req.body);
    
    const book = await PostgresDataSource.getRepository(Book).create(req.body);
    const results = await PostgresDataSource.getRepository(Book).save(book);
    return res.status(201).send(results)
})

router.get('/books', async (req: Request, res: Response) => {
    const books = await PostgresDataSource.getRepository(Book).find();

    res.status(200).send(books);
})

export {router as BookRouter}