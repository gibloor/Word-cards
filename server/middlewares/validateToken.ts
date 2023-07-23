import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const secretKey = process.env.SECRET_KEY || ''

    if (!token) {
      return res.status(401).json({ message: 'Missing token' })
    }

    jwt.verify(token, secretKey, (err, user: any) => {
      if (err) {
        return res.json('Wrong token')
      }

      req.body.userId = user.id
      next()
    })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default validateToken