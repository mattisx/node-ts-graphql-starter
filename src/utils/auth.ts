import { NextFunction, Request, Response } from 'express'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (Math.random() > 0.5) {
    next()
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated.',
    })
  }
}
