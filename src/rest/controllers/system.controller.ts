import { Context } from '../../types/serverTypes'

export type SystemStatusResult = {
  database: SystemStatus
}

export type SystemStatus = {
  status: StatusTypes
  error?: string
}

export enum StatusTypes {
  OK = 'OK',
  NOT_OK = 'NOT_OK',
}

export interface SystemController {
  ping: () => Promise<SystemStatusResult>
}

export const SystemController = ({ db }: Context) => {
  const ping = async () => {
    try {
      const query = 'SELECT NOW()'
      const data = await db.query(query)

      const systems: SystemStatusResult = {
        database: { status: StatusTypes.NOT_OK },
      }

      console.log(data.rows)

      if (data.rows.length > 0) {
        systems.database.status = StatusTypes.OK
      } else {
        systems.database.status = StatusTypes.NOT_OK
        systems.database.error = 'Could not query the database.'
      }

      return systems
    } catch (error: unknown) {
      return {
        database: {
          status: StatusTypes.NOT_OK,
          error: String(error),
        },
      }
    }
  }

  return {
    ping,
  }
}
