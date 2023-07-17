import mongoose from 'mongoose'

const usersWord = new mongoose.Schema({
  word: {
    required: true,
    type: String,
    unique: true,
  },

  packId: {
    required: true,
    type: String,
  },
  
  сonfirmations: {
    required: true,
    type: Number,
    default: 0,
  }
})

export default mongoose.model('UsersWord', usersWord)