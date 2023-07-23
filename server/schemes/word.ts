import mongoose from 'mongoose'


export type WordDocument = Document & {
  _id: string
  word: string
  packId: string
  сonfirmations: number
}

const wordSchema = new mongoose.Schema({
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
    type: Number,
    default: 0,
  }
})

const Word = mongoose.model<WordDocument>('Word', wordSchema)

export default Word