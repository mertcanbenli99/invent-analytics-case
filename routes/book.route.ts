import { Book } from "../db/entities/book.entity"
import { PostgresDataSource } from "../db/connection"
import express, {Request, Response} from "express"

import { body, param } from "express-validator"
import { validateRequest } from "../middleware/validation"




const router = express.Router()

router.post('/books',[body('name').notEmpty().isString().withMessage('book name is required')],validateRequest,
 async (req: Request, res: Response) => {
    const {name} = req.body;
    
    
    const book = await PostgresDataSource.getRepository(Book).create(name);
    const results = await PostgresDataSource.getRepository(Book).save(book);
    return res.status(201).send(results)
})

router.get('/books', async (req: Request, res: Response) => {
    const books = await PostgresDataSource.getRepository(Book).find();
    res.status(200).send(books);
})

router.get('/books/:bookId',[param('bookId').isNumeric()], validateRequest, async (req: Request, res: Response) => {
      const bookId = req.params.bookId;

      const bookRepository =  PostgresDataSource.getRepository(Book)

      const query = await bookRepository.createQueryBuilder('book')
      .select('book.id', 'id')
      .addSelect('book.name', 'name')
      .addSelect('COALESCE((SELECT AVG(borrowed_book.score) FROM borrowed_book WHERE borrowed_book.book_id = book.id and borrowed_book.score != -1), -1)', 'score')
      .where('book.id = :bookId', { bookId })
      .getRawOne()

      if(!query) {
        return res.status(400).send({message: 'Resource not found'})
      }
      
      return res.status(200).send(query)
      

})

export {router as BookRouter}