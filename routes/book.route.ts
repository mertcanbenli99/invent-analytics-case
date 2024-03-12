import { Book } from "../db/entities/book.entity"
import { PostgresDataSource } from "../db/connection"
import express, {Request, Response} from "express"

import { body, param } from "express-validator"
import { validateRequest } from "../middleware/validation"





const router = express.Router()
const bookRepository = PostgresDataSource.getRepository(Book);

router.post('/books',[body('name').notEmpty().isString().withMessage('book name is required')],validateRequest,
 async (req: Request, res: Response) => {
    const {name} = req.body;
    
    
    const book = await bookRepository.create(name);
    const results = await bookRepository.save(book);
    return res.status(201).send(results)
})

router.get('/books', async (req: Request, res: Response) => {
    const books = await bookRepository.find();
    res.status(200).send(books);
})

router.get('/books/:bookId',[param('bookId').isNumeric()], validateRequest, async (req: Request, res: Response) => {
      const bookId = req.params.bookId;

      const query = await bookRepository.createQueryBuilder('book')
      .select('book.id', 'id')
      .addSelect('book.name', 'name')
      .addSelect('ROUND(COALESCE((SELECT AVG(borrowed_book.score) FROM borrowed_book WHERE borrowed_book.book_id = book.id AND borrowed_book.score != -1), -1), 2)', 'score')
      .where('book.id = :bookId', { bookId })
      .getRawOne()

      if(!query) {
        return res.status(400).send({message: 'Resource not found'})
      }
      
      return res.status(200).send(query)
      

})

export {router as BookRouter}