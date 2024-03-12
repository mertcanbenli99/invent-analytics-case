import { BorrowedBook } from "../db/entities/borrowed-book.entity"
import { PostgresDataSource } from "../db/connection"
import { User } from "../db/entities/user.entity"
import express, {Request, Response} from "express"



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

router.post('/users/:userId/borrow/:bookId', async (req: Request, res: Response) => {
       const userId = Number(req.params.userId);
       const bookId = Number(req.params.bookId);

       const borrowed_book =  PostgresDataSource.getRepository(BorrowedBook).create({book_id: bookId, user_id: userId});
       await PostgresDataSource.getRepository(BorrowedBook).save(borrowed_book);

       return res.status(204).send('OK')

})

export {router as UserRouter}