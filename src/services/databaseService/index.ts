import { DatabaseInstance } from './databaseService.types'
import pg from 'pg' // Doing this dance because node-postgres does not support full ESM imports yet.
const { Pool } = pg

export interface DatabaseService {
  init: () => Promise<DatabaseInstance>
}

export const DatabaseService = (): DatabaseService => {
  const init = async () => {
    try {
      // This is using the default PG* connection information from the .env file.
      // For more information and alternatives, read more here:
      // https://node-postgres.com/features/connecting
      const db = await new Pool()
      return db
    } catch (error: unknown) {
      throw new Error(`Could not connect to database: ${String(error)}`)
    }
  }

  return {
    init,
  }
}
