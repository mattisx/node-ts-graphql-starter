import { Request } from 'express'
import { Context } from '../types/serverTypes'

export const getIpAddressFromRequest = (context: Context, req: Request) => {
  if (context.env.local) {
    return req.ip
  }

  const appEngineIpHeader = req.headers['x-appengine-user-ip']
  if (appEngineIpHeader) {
    return String(appEngineIpHeader)
  }

  const forwardedForIpHeader = req.headers['x-forwarded-for']
  if (forwardedForIpHeader) {
    return String(forwardedForIpHeader).split(',').shift()
  }

  throw new Error('Could not get IP address from request')
}
