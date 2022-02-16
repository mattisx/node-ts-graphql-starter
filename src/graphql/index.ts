import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { getSchema } from './schema'
import { Server } from 'http'
import { Context } from '../types/serverTypes'
import { authGraphql } from '../utils/authGraphql'

export const graphql = (context: Context, httpServer: Server) => {
  const schema = getSchema(context)

  return new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      const bearerHeader = req.header('authorization')
      const payload = authGraphql(context, bearerHeader)

      const user = { id: payload.id, email: payload.email }
      return { ...context, user }
    },
  })
}
