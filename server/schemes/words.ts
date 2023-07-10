import mongoose from 'mongoose'

const wordsSchema = new mongoose.Schema({
  word: {
    required: true,
    type: String,
    unique: true
  },
  language: {
    required: true,
    type: String,
    enum: ['eng']
  },
})

export default mongoose.model('User', wordsSchema)