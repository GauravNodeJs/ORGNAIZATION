import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import route from './routes/route'
dotenv.config()

const app = express()

mongoose.connect(process.env.DB_CRENDENTIALS).then(() => {
  console.log('Database connection successful')
})
  .catch(err => {
    console.error('Database connection error')
  });
route(app)

app.listen(process.env.PORT)


