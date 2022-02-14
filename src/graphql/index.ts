import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { getSchema } from './schema'
import { Server } from 'http'
import { Context } from '../types/serverTypes'

export const graphql = (context: Context, httpServer: Server) => {
  const schema = getSchema(context)

  return new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context,
  })
}
