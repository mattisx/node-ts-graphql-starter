import { Context } from '../types/serverTypes'
import { routes } from './routes'
import { controllers } from './controllers'

export const rest = (context: Context) => {
  return routes(controllers(context))
}
