import express, { Express } from 'express'
import http from 'http'
import graphql from './graphql'
import { Context } from './types/serverTypes'
import { auth } from './utils/auth'

export const app = {
  run: async (context: Context) => {
    const app: Express = express()
    const httpServer = http.createServer(app)

    const graphqlServer = graphql(context, httpServer)
    await graphqlServer.start()

    app.use(auth)

    app.get('/', (req, res) => {
      console.log('In root!')
      res.status(200).json({ success: true, data: 'Hej' })
    })

    graphqlServer.applyMiddleware({
      app,
      path: '/graphql',
    })

    httpServer.listen({ port: context.port })
  },
}
