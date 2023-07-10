import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import user from './routes/user'
import words from './routes/words'

dotenv.config()

const mongoString = process.env.DATABASE_URL
if (mongoString) {
  mongoose.connect(mongoString)
  
  const database = mongoose.connection
  database.on('error', (error) => {
    console.log(error)
  })

  database.once('connected', () => {
    console.log('Database Connected')
  })
} else {
  console.log('DATABASE_URL - undefined')
}

const app = express()
app.use(express.json())
app.use('/user', user)
app.use('/words', words)

app.listen(3001, () => {
  console.log(`Server Started at 3001`)
})