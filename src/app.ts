import express, { Express } from 'express'
import http, { Server } from 'http'
import { Context } from './types/serverTypes'
import { graphql } from './graphql'
import { rest } from './rest'
import { auth } from './utils/auth'
import { rateLimit } from './utils/rateLimit'

export const app = {
  run: async (context: Context) => {
    const app: Express = express()
    const httpServer: Server = http.createServer(app)

    app.use(rateLimit(context))
    app.use(auth(context))

    const graphqlServer = graphql(context, httpServer)
    await graphqlServer.start()

    graphqlServer.applyMiddleware({
      app,
      path: '/graphql',
    })

    const restServer = rest()
    app.use('/rest', restServer)

    httpServer.listen({ port: context.port })
  },
}
