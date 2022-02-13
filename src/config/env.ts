import 'dotenv/config'
import { Env, JwtConfig, PgConfig } from '../types/serverTypes'

// Fail fast if required values are missing.

// Validate NODE_ENV
if (!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV environment variable!')
}
// if (['dev', 'prod'].indexOf(process.env.NODE_ENV) === -1) {
//   throw new Error(`Environment variable NODE_ENV does not contain either 'dev' or 'prod'.`)
// }
const env: Env = {
  dev: process.env.NODE_ENV === 'dev',
  prod: process.env.NODE_ENV === 'prod',
}

// Validate PORT
if (!process.env.PORT || isNaN(parseInt(process.env.PORT))) {
  throw new Error('Missing or invalid PORT environment variable!')
}
const port: number = parseInt(process.env.PORT)

// Validate POSTGRES
if (process.env.USE_POSTGRES) {
  const pgConnectionValues: string[] = ['PGHOST', 'PGPORT', 'PGDATABASE', 'PGUSER', 'PGPASSWORD']
  const missingPgValues: string[] = pgConnectionValues.filter((v) => {
    if (!process.env[v]) return v
  })
  if (missingPgValues.length > 0) {
    throw new Error(`USE_POSTGRES=1 requires the following missing values in .env: ${missingPgValues.join(', ')}`)
  }
}

// pg will automatically use the correct PG* env if available in process.env,
// but in case we want to connect to the db in some other way, we'll export them as pgConfig.
const pgConfig: PgConfig = {
  active: process.env.USE_POSTGRES ? true : false,
  PGHOST: process.env.PGHOST,
  PGPORT: process.env.PGPORT,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
}

// Validate JWT
if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable!')
}
const JWT_SECRET: string = process.env.JWT_SECRET

if (!process.env.JWT_MAX_AGE_SECONDS || isNaN(parseInt(process.env.JWT_MAX_AGE_SECONDS))) {
  throw new Error('Missing or invalid JWT_MAX_AGE_SECONDS environment variable!')
}
const JWT_MAX_AGE_SECONDS: number = parseInt(process.env.JWT_MAX_AGE_SECONDS)

const jwtConfig: JwtConfig = {
  secret: JWT_SECRET,
  maxAge: JWT_MAX_AGE_SECONDS,
}

export { port, env, pgConfig, jwtConfig }
