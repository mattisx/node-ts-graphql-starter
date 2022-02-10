import { DatabaseInstance } from './databaseService.types'

export interface DatabaseService {
  init: () => Promise<DatabaseInstance>
}

export const DatabaseService = (): DatabaseService => {
  const init = async () => {
    try {
      const db = await Promise.resolve(true)
      return { database: db }
    } catch (error: unknown) {
      throw new Error(`Could not connect to Postgres instance: ${JSON.stringify(error)}`)
    }
  }

  return {
    init,
  }
}
