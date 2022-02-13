import { Router } from 'express'
import { Controllers } from '../../types/controllerTypes'
import { RootRoutes } from './root'
import { SystemRoutes } from './system'

export const routes = (controllers: Controllers) => {
  const mainRouter = Router()
  mainRouter.use(RootRoutes(controllers))
  mainRouter.use(SystemRoutes(controllers))
  return mainRouter
}
