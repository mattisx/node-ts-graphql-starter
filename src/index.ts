import { port, env, pgConfig, jwtConfig, rateLimitConfig } from './config/env'
import { app } from './app'
import { Context } from './types/serverTypes'
import { DatabaseService } from './services/databaseService'
import { AuthorService } from './services/authorService'

// Initialize all dependencies here and add to context

const databaseService = DatabaseService()
const db = await databaseService.init()

const authorService = AuthorService({ db })

const context: Context = {
  env,
  jwtConfig,
  port,
  pgConfig,
  db,
  rateLimitConfig,
  services: {
    authorService,
  },
}

const start = async (context: Context) => {
  try {
    await app.run(context)
    console.log(`GraphQL API running on port ${context.port}.`)
  } catch (error: unknown) {
    throw new Error(`Unable to start the server: ${JSON.stringify(error)}`)
  }
}

start(context)
