import { BorrowedBook } from "../db/entities/borrowed-book.entity"
import { PostgresDataSource } from "../db/connection"
import { User } from "../db/entities/user.entity"
import express, {Request, Response} from "express"
import { MapBorrowedBooksData } from "./helper/user.helpers"
import { body, param } from "express-validator"
import { validateRequest } from "../middleware/validation"



const router = express.Router()

router.post('/users', [body('name').isString().notEmpty()], validateRequest,async (req: Request, res: Response) => {
    const user = await PostgresDataSource.getRepository(User).create(req.body);
    const results = await PostgresDataSource.getRepository(User).save(user);
    return res.status(201).send(results)
})

router.get('/users', async (req: Request, res: Response) => {
    const users = await PostgresDataSource.getRepository(User).find();

    res.status(200).send(users);
})

router.get('/users/:userId',[param('userId').isNumeric()], validateRequest, async (req:Request, res:Response) => {
    const {userId} = req.params;
    
    const usersWithBorrowedBooks = await PostgresDataSource.getRepository(User).createQueryBuilder('user')
    .leftJoinAndSelect('user.books', 'books')
    .leftJoinAndSelect('books.book', 'book')
    .select(['user.id', 'user.name', 'books.score','books.returned', 'book.name'])
    .where('user.id = :userId', { userId }) 
    .getMany();
    if(!usersWithBorrowedBooks) {
      return res.status(400).send({message: 'Resource not found'})
   }
     
    const result = MapBorrowedBooksData(usersWithBorrowedBooks);

    return res.send(result)
    
    
})

router.post('/users/:userId/borrow/:bookId', async (req: Request, res: Response) => {
       const userId = Number(req.params.userId);
       const bookId = Number(req.params.bookId);
       const book = PostgresDataSource.getRepository(BorrowedBook).findOne({where: {
        book_id: bookId,
        user_id: userId,
        returned: false
       }})
       if(book) {
        return res.status(400).send('This book is already borrowed')
       }
       const borrowed_book =  PostgresDataSource.getRepository(BorrowedBook).create({book_id: bookId, user_id: userId});
       await PostgresDataSource.getRepository(BorrowedBook).save(borrowed_book);

       return res.status(204).send('OK')

})

router.post('/users/:userId/return/:bookId', async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const bookId = Number(req.params.bookId);
    const {score} = req.body;

      const borrowedBook = await PostgresDataSource.getRepository(BorrowedBook).findOne({ where: { user_id: userId, book_id: bookId, returned: false } });
      console.log(borrowedBook);
      if (!borrowedBook) {
        return res.status(404).json({error: 'Resource not found'});
      }
      
    borrowedBook.score = score;
    borrowedBook.returned = true;
    borrowedBook.return_date = new Date()
    await PostgresDataSource.getRepository(BorrowedBook).save(borrowedBook);
    return res.status(204).send('OK');
})

export {router as UserRouter}