import express from 'express'
import http from 'http'
import graphql from './graphql'

const app = {
  run: async (context) => {
    const app = express()
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

export default app