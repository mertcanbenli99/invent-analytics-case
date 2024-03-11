import express from 'express';
import { PostgresDataSource } from './db/connection';
const app = express()

PostgresDataSource.initialize().then(() => {
  console.log('Database connection is successfull')
}).catch((err) => {
  console.log("Database connection failed", err);
  throw err;
})
const port = 3000


app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
    console.log("server listening on 3000");
})