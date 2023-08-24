import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../schemes/user'
import validateToken from '../middlewares/validateToken'

const user = express.Router()

const createToken = async (id: string) => {
  try {
    const secretKey = process.env.SECRET_KEY || ''

    const token = await jwt.sign({ id }, secretKey, { expiresIn: '7d' })
    return token
  } catch (error) {
    throw new Error('Failed to create token');
  }
}

user.post('/signUp', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const saltRounds = Number(process.env.SALT_ROUNDS)

    const hash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      name: name,
      email: email,
      password: hash,
    })

    const userData = await newUser.save()
    const id = await userData._id.toString()
    const token = await createToken(id)

    const user = { name, permissions: 0 }

    await res.json({ token, user })
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: `Email is already taken` })
    } else {
      res.status(400).json({ message: error.message })
    }
  }
})

user.post('/signIn', async (req, res) => {
  try {
    const { password, email } = req.body

    const userData = await User.findOne({ email }).exec()
    if (userData) {
      const isMatch = await bcrypt.compare(password, userData.password)
      
      if (isMatch) {
        const token = await createToken(userData._id.toString())
        const user = { name: userData.name, permissions: 0 }

        await res.json({ token, user })
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

user.post('/autoSignIn', validateToken, async (req, res) => {
  try {
    const userData = await User.findById(req.body.userId).exec()
    if (userData) {
      const user = { name: userData.name, permissions: 0 }
      const token = await createToken(userData._id.toString())
      
      await res.json({ token, user })
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({message: error.message})
  }
})

export default user