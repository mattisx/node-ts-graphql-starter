import { NextFunction, Request, Response } from 'express'
import { Context } from '../types/serverTypes'
import { getIpAddressFromRequest } from './ipAddress'

type RateData = {
  numberOfRequests: number
  timestampMilliseconds: number
}

const rateDataByIp: Record<string, RateData> = {}

export const rateLimit = (context: Context) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let ipAddress
    try {
      ipAddress = getIpAddressFromRequest(context, req)
    } catch (e) {
      return next()
    }

    if (!ipAddress || ipAddress.length === 0) {
      return next()
    }

    const rateData = rateDataByIp[ipAddress]
    const rateResetTime = Date.now() - context.rateLimitConfig.timeWindowSeconds * 1000
    const maxRequestCount = context.rateLimitConfig.maxRequestCount

    if (!rateData || rateData.timestampMilliseconds < rateResetTime) {
      rateDataByIp[ipAddress] = {
        numberOfRequests: 1,
        timestampMilliseconds: Date.now(),
      }
      return next()
    }

    if (rateData.numberOfRequests < maxRequestCount) {
      rateData.numberOfRequests++
    } else {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, try again later.',
      })
    }

    next()
  }
}
