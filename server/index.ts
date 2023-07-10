import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import routes from './routes/routes'
import cards from './routes/cards'

dotenv.config()

const mongoString = process.env.DATABASE_URL
if (mongoString) {
  mongoose.connect(mongoString)
  
  const database = mongoose.connection
  database.on('error', (error) => {
    console.log(error)
  })

  database.once('connected', () => {
    console.log('Database Connected');
  })
} else {
  console.log('DATABASE_URL - undefined');
}

const app = express()
app.use(express.json())
app.use('/api', routes)
app.use('/cards', cards)   

app.listen(3001, () => {
    console.log(`Server Started at 3001`)
})