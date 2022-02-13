import { Context } from '../../types/serverTypes'
import { SystemController } from './system.controller'

export const controllers = (context: Context) => {
  return {
    systemController: SystemController(context),
  }
}
