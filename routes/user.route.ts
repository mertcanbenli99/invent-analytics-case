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

export {router as UserRouter}