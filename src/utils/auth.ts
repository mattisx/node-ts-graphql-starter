import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_MAX_AGE_SECONDS } from '../config/env'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.header('authorization')

  next()

  if (bearerHeader && typeof bearerHeader !== undefined) {
    const token: string = bearerHeader.split(' ')[1]
    const options: Record<string, number> = {
      maxAge: JWT_MAX_AGE_SECONDS,
    }

    jwt.verify(token, JWT_SECRET, options, (err) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated.',
        })
      } else {
        next()
      }
    })
  }
}
