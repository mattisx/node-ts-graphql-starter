import { Context } from '../../types/serverTypes'

export type PingResult = {
  database: string
}

export interface SystemController {
  ping: () => Promise<PingResult>
}

export const SystemController = ({ db }: Context) => {
  const ping = async () => {
    const query = 'SELECT NOW()'
    const data = await db.query(query)
    let status = 'NOT_OK'
    if (data.rows.length > 0) status = 'OK'
    return {
      database: status,
    }
  }

  return {
    ping,
  }
}
