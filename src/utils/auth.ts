import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Context } from '../types/serverTypes'

export const auth = (context: Context) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.header('authorization')

    if (bearerHeader && typeof bearerHeader !== undefined) {
      const token: string = bearerHeader.split(' ')[1]
      const options: Record<string, number> = {
        maxAge: context.jwtConfig.maxAge,
      }

      jwt.verify(token, context.jwtConfig.secret, options, (err) => {
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
}
