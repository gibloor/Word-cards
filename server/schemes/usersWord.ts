import mongoose from 'mongoose'

const usersWord = new mongoose.Schema({
  word: {
    required: true,
    type: String,
    unique: true,
  },
  language: {
    required: true,
    type: String,
    enum: ['eng'],
  },
  сonfirmations: {
    required: true,
    type: Number,
    default: 0,
  }
})

export default mongoose.model('UsersWord', usersWord)