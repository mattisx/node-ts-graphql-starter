import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import schema from './schema'

const graphql = (context, httpServer) => {
  return new ApolloServer({
    schema,
    playground: context.env.dev,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
}

export default graphql
