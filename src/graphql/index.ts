import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import schema from './schema'
import { Server } from 'http'
import { Context } from '../types/serverTypes'

const graphql = (context: Context, httpServer: Server) => {
  return new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context,
  })
}

export default graphql
