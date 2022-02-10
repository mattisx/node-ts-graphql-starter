import express, { Express } from 'express'
import http from 'http'
import graphql from './graphql'
import { Context } from './types/serverTypes'

export const app = {
  run: async (context: Context) => {
    const app: Express = express()
    const httpServer = http.createServer(app)

    const graphqlServer = graphql(context, httpServer)
    await graphqlServer.start()

    graphqlServer.applyMiddleware({
      app,
      path: '/graphql'
    })
    
    httpServer.listen({ port: context.port })

  }
}
