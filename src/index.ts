import { port, env, pgConfig, jwtConfig, rateLimitConfig } from './config/env'
import { app } from './app'
import { Context } from './types/serverTypes'
import { DatabaseService } from './services/databaseService'
import { AuthorService } from './services/authorService'
import { BookService } from './services/bookService'

const start = async () => {
  // Initialize all dependencies here and add to context

  const databaseService = DatabaseService()
  const db = await databaseService.init()

  const authorService = AuthorService({ db })
  const bookService = BookService({ db })

  const context: Context = {
    env,
    port,
    pgConfig,
    db,
    jwtConfig,
    rateLimitConfig,
    services: {
      authorService,
      bookService,
    },
  }

  try {
    await app.run(context)
    console.log(`GraphQL serving on <host>:${port}/graphql`)
    console.log(`REST serving on <host>:${port}/rest`)
  } catch (error: unknown) {
    throw new Error(`Unable to start the server: ${String(error)}`)
  }
}

start()
