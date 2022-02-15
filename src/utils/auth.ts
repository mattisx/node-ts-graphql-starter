import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { Context } from '../types/serverTypes'

type Payload = {
  id: string
  email: string
}

type ValidateJWTOutput = {
  isValid: boolean
  payload: Payload | null
}

export const validateJWT = (context: Context, req: Request): ValidateJWTOutput => {
  const bearerHeader = req.header('authorization')
  if (!bearerHeader || typeof bearerHeader === undefined) {
    return {
      isValid: false,
      payload: null,
    }
  }

  const token: string = bearerHeader.split(' ')[1]
  const options: Record<string, number> = {
    maxAge: context.jwtConfig.maxAge,
  }
  let payload
  try {
    payload = jwt.verify(token, context.jwtConfig.secret, options) as Payload
  } catch (error: unknown) {
    return {
      isValid: false,
      payload: null,
    }
  }

  return {
    isValid: true,
    payload,
  }
}
