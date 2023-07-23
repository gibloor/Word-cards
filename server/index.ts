import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import user from './routes/user'
import words from './routes/words'
import pack from './routes/pack'

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
app.use(cors())
app.use(express.json())

app.use('/user', user)
app.use('/words', words)
app.use('/pack', pack)

app.listen(3001, () => {
  console.log(`Server Started at 3001`)
})