import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import route from './routes/route'
import bodyParser from 'express'
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
mongoose.connect(process.env.DB_CRENDENTIALS).then(() => {
  console.log('Database connection successful')
})
  .catch(err => {
    console.error('Database connection error')
  });
route(app)

app.listen(process.env.PORT)


