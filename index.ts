import express from 'express';
import { PostgresDataSource } from './db/connection';
import { UserRouter } from './routes/user.route';
import { BookRouter } from './routes/book.route';
const app = express()
app.use(express.json());

PostgresDataSource.initialize().then(() => {
  console.log('Database connection is successfull')
}).catch((err) => {
  console.log("Database connection failed", err);
  throw err;
})
const port = 3000

app.use(UserRouter)
app.use(BookRouter)



app.get('/', (req, res) => {
  res.send('hello world')
})



app.listen(port, () => {
    console.log("server listening on 3000");
})