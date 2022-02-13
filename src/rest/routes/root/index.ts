import { NextFunction, Request, Response, Router } from 'express'
import { Controllers } from '../../../types/controllerTypes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const RootRoutes = (controllers: Controllers) => {
  const router: Router = Router()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log('GET /')
    res.status(200).json({
      success: true,
    })
  })

  return router
}
