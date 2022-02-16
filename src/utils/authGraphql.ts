import { Context } from '../types/serverTypes'
import { validateJWT } from './validateJWT'
import { AuthenticationError } from 'apollo-server-core'

export const authGraphql = (context: Context, bearerHeader: string | undefined) => {
  const { isValid, payload } = validateJWT(context, bearerHeader)

  if (!isValid || payload === null) {
    throw new AuthenticationError('Error when validating JWT.')
  }

  return payload
}
