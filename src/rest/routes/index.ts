import { Router } from 'express'
import { RootRoutes } from './root'
import { SystemRoutes } from './system'

export const Routes = () => {
  const mainRouter = Router()
  mainRouter.use(RootRoutes())
  mainRouter.use(SystemRoutes())
  return mainRouter
}
