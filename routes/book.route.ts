import { Book } from "../db/entities/book.entity"
import { PostgresDataSource } from "../db/connection"
import express, {Request, Response} from "express"
import { getRepository } from "typeorm"



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

router.get('/books/:bookId', async (req: Request, res: Response) => {
      const bookId = req.params.bookId;

      const bookRepository =  PostgresDataSource.getRepository(Book)

      const query = await bookRepository.createQueryBuilder('book')
      .select('book.id', 'id')
      .addSelect('book.name', 'name')
      .addSelect('COALESCE((SELECT AVG(borrowed_book.score) FROM borrowed_book WHERE borrowed_book.book_id = book.id and borrowed_book.score != -1), -1)', 'score')
      .where('book.id = :bookId', { bookId })
      .getRawOne()
      
      return res.status(200).send(query)
      

})

export {router as BookRouter}