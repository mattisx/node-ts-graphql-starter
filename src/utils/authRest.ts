import { NextFunction, Request, Response } from 'express'
import { Context } from '../types/serverTypes'
import { validateJWT } from './auth'

export const authRest = (context: Context) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { isValid, payload } = validateJWT(context, req)

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
