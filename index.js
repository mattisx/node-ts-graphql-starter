import { port, env } from './config/env'
import app from './app'

const context = {
  env,
  port,
}

const start = async (context) => {
  try {
    await app.run(context)
    console.log(`GraphQL API running on port ${context.port}.`)
  } catch (error) {
    throw new Error(`Unable to start the server: ${error.message}`)
  }
}

start(context)