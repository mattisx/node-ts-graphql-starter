import { NextFunction, Request, Response } from 'express'
import { Context } from '../types/serverTypes'
import { validateJWT } from './validateJWT'

export const authRest = (context: Context) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.header('authorization')
    const { isValid, payload } = validateJWT(context, bearerHeader)

    if (!isValid || payload === null) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated.',
      })
    }

    res.locals.user = {
      id: payload.id,
      email: payload.email,
    }

    return next()
  }
}
