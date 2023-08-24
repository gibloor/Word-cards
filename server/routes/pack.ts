import express from 'express'
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

import Pack, { PackDocument } from '../schemes/pack'
import Word, { WordDocument } from '../schemes/word'
import validateToken from '../middlewares/validateToken'
import e from 'express'

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

type TranslateRequestBody = {
  words: any[],
  language: string
}

const pack = express.Router()

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_KEY,
})
const openai = new OpenAIApi(configuration)

const packFromDB = async (DBpack: PackDocument, DBwords: WordDocument[]) => {
  const words = DBwords.map(word => ({
    word: word.word,
    id: word._id.toString(),
    сonfirmations: word.сonfirmations
  }))

  const pack = {
    id: DBpack._id.toString(),
    name: DBpack.name,
    language: DBpack.language,
    secondLanguage: DBpack.secondLanguage,
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
    const wordsArray = words.map((word) => ({ word: word.toLowerCase(), packId }))
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
      await res.status(200).json([])
    } else {
      const packs = await Promise.all(
        receivedPacks.map(async (pack) => {
          const packWords = await Word.find({ packId: pack._id }).exec()

          return await packFromDB(pack, packWords)
        })
      )

      await res.json({ packs })
    }
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

pack.delete('/delete/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params

    await Word.deleteMany({ packId: id })
    await Pack.findByIdAndDelete(id)

    await res.json({message: 'success'})
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

pack.post('/translate', async (req, res) => {
  try {
    const { words, language }: TranslateRequestBody = req.body

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Can you change this JSON to every object: add static element 'wordT' - value: word translated on ${language}, add static element 'sentence' - value: short funny sentence with 'word', add static element 'sentenceT' - value: short funny sentence with 'wordT'. Return Json. ${JSON.stringify(words)}`,
      temperature: 0.8,
      max_tokens: words.length * 150,
    })

    if (completion.data.choices[0].text) {
      await res.json({ words: JSON.parse(completion.data.choices[0].text.trim())})
    } else {
      await res.json({ message: 'Wrong chatGPT answer' })
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

pack.patch('/update-confirmations', validateToken, async (req, res) => {
  try {
    const { confirmedIds } = req.body

    await Word.updateMany(
      { _id: { $in: confirmedIds } },
      { $inc: { сonfirmations: 1 } }
    )

    await res.json({message: 'Success'})
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

export default pack