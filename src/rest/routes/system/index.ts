import { NextFunction, Request, Response, Router } from 'express'

export const SystemRoutes = () => {
  const router: Router = Router()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  router.get('/ping', async (req: Request, res: Response, next: NextFunction) => {
    console.log('GET /ping')
    res.status(200).json({
      success: true,
      data: {
        database: 'ok',
      },
    })
  })

  return router
}
