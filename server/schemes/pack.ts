import mongoose from 'mongoose'

export type PackDocument = Document & {
  _id: string
  name: string
  ownerId: string
  language: string
  dailyCheck: Date | null
  weekCheck: Date | null
  monthCheck: Date | null
}

const packSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  ownerId: {
    required: true,
    type: String,
  },
  language: {
    required: true,
    type: String,
  },
  dailyCheck: {
    type: Date,
    default: null,
  },
  weekCheck: {
    type: Date,
    default: null,
  },
  monthCheck: {
    type: Date,
    default: null,
  },
})

const Pack = mongoose.model<PackDocument>('Pack', packSchema)

export default Pack