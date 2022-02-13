import { NextFunction, Request, Response, Router } from 'express'

export const RootRoutes = () => {
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
