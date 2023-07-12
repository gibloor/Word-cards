import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserWords'
    }
  ]
})

export default mongoose.model('User', userSchema)