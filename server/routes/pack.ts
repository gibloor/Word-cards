import express from 'express'

import Pack, { PackDocument } from '../schemes/pack'
import Word, { WordDocument } from '../schemes/word'
import validateToken from '../middlewares/validateToken'

type Word = {
  word: string
  packId: string
}

type PackRequestBody = {
  language: string
  words: string[]
  name: string
  userId: string
}

const pack = express.Router()

const packFromDB = async (DBpack: PackDocument, DBwords:WordDocument[]) => {
  const words = DBwords.map(word => ({
    word: word.word,
    id: word._id.toString(),
    сonfirmations: word.сonfirmations
  }))

  const pack = {
    id: DBpack._id.toString(),
    name: DBpack.name,
    language: DBpack.language,
    dailyCheck: DBpack.dailyCheck,
    weekCheck: DBpack.weekCheck,
    monthCheck: DBpack.monthCheck,
    words: words,
  }

  return pack
}

pack.post('/create', validateToken, async (req, res) => {
  try {
    const { language, words, name, userId }: PackRequestBody = req.body
    
    const newPack = new Pack ({
      name: name,
      ownerId: userId,
      language: language,
    })

    const pack = await newPack.save()
    const packId = pack._id.toString()
    const wordsArray = words.map((word) => ({ word, packId}))
    const newWords = await Word.insertMany(wordsArray)

    await res.json(await packFromDB(pack, newWords))
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

pack.get('/getOwnPacks', validateToken, async (req, res) => {
  try {
    const { userId } = req.body

    const receivedPacks = await Pack.find({ ownerId: userId }).exec()

    if (receivedPacks.length === 0) {
      res.status(200).json([])
    }

    const packs = await Promise.all(
      receivedPacks.map(async (pack) => {
        const packWords = await Word.find({ packId: pack._id }).exec()

        return await packFromDB(pack, packWords)
      })
    )

    await res.json({ packs })
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

export default pack