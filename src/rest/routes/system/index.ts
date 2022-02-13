import { NextFunction, Request, Response, Router } from 'express'
import { Controllers } from '../../../types/controllerTypes'

export const SystemRoutes = (controllers: Controllers) => {
  const router: Router = Router()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  router.get('/ping', async (req: Request, res: Response, next: NextFunction) => {
    const data = await controllers.systemController.ping()
    res.status(200).json({
      success: true,
      data,
    })
  })

  return router
}
