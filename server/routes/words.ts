import express from 'express'

const words = express.Router()

words.get('/get/:lang', async (req, res) => {
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

words.get('/getAll', async (req, res) => {
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

export default words