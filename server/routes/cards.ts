import express from 'express'

import Model from '../models/model'

const cards = express.Router()

//Post Method
cards.post('/post', async (req, res) => {
  try {
    // const data = new Model({
    //   name: req.body.name,
    //   age: req.body.age
    // })
    // const dataToSave = await data.save()
    // res.status(200).json(dataToSave)
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

export default cards