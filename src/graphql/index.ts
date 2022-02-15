import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { getSchema } from './schema'
import { Server } from 'http'
import { Context } from '../types/serverTypes'
import { validateJWT } from '../utils/auth'

export const graphql = (context: Context, httpServer: Server) => {
  const schema = getSchema(context)

  return new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      const { isValid, payload } = validateJWT(context, req)

      if (!isValid || payload === null) {
        throw new Error('Error when validating JWT.')
      }

      const user = { id: payload.id, email: payload.email }
      return { ...context, user }
    },
  })
}
