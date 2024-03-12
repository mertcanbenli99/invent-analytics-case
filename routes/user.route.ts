import { BorrowedBook } from "../db/entities/borrowed-book.entity"
import { PostgresDataSource } from "../db/connection"
import { User } from "../db/entities/user.entity"
import express, {Request, Response} from "express"
import { MapBorrowedBooksData } from "./helper/user.helpers"



const router = express.Router()

router.post('/users', async (req: Request, res: Response) => {
    console.log(req.body);
    
    const user = await PostgresDataSource.getRepository(User).create(req.body);
    const results = await PostgresDataSource.getRepository(User).save(user);
    return res.status(201).send(results)
})

router.get('/users', async (req: Request, res: Response) => {
    const users = await PostgresDataSource.getRepository(User).find();

    res.status(200).send(users);
})

router.get('/users/:userId', async (req:Request, res:Response) => {
    const {userId} = req.params;
    const usersWithBorrowedBooks = await PostgresDataSource.getRepository(User).createQueryBuilder('user')
    .leftJoinAndSelect('user.books', 'books')
    .leftJoinAndSelect('books.book', 'book')
    .select(['user.id', 'user.name', 'books.score','books.returned', 'book.name'])
    .where('user.id = :userId', { userId }) 
    .getMany();
     
    const result = MapBorrowedBooksData(usersWithBorrowedBooks);
    console.log(result);
    
    

    return res.send(result)
    
    
})

router.post('/users/:userId/borrow/:bookId', async (req: Request, res: Response) => {
       const userId = Number(req.params.userId);
       const bookId = Number(req.params.bookId);
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
      console.log(score);
      
    borrowedBook.score = score;
    borrowedBook.returned = true;
    borrowedBook.return_date = new Date()
    await PostgresDataSource.getRepository(BorrowedBook).save(borrowedBook);
    return res.status(204).send('OK');
})

export {router as UserRouter}