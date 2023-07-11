import express from 'express'

import User from '../schemes/user'

const user = express.Router()

user.post('/signUp', async (req, res) => {
  try {
    console.log(req.body)
    // const user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   passwrod: req.body.password,
    // })
    // await user.save()
    await res.status(200).end("success")
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

user.post('/signIn', async (req, res) => {
  try {
    // const user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   passwrod: req.body.password,
    // })
    // await user.save()
    await res.status(200).end("success")
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

user.post('/autoSignIn', async (req, res) => {
  try {
    // const user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   passwrod: req.body.password,
    // })
    // await user.save()
    await res.status(200).end("success")
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

export default user