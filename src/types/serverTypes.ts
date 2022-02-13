import { AuthorService } from '../services/authorService'
import { DatabaseInstance } from '../services/databaseService/databaseService.types'

type Only<T, U> = { [P in keyof T]: T[P] } & Omit<{ [P in keyof U]?: never }, keyof T>

export type Either<T, U> = Only<T, U> | Only<U, T>

export interface Context {
  env: Env
  jwtConfig: JwtConfig
  port: number
  pgConfig: PgConfig
  db: DatabaseInstance
  rateLimitConfig: RateLimitConfig
  services: Services
}

export type Env = {
  local: boolean
  dev: boolean
  prod: boolean
}

export type JwtConfig = {
  secret: string
  maxAge: number
}

export type PgConfig = {
  active: boolean
  PGHOST?: string
  PGPORT?: string
  PGDATABASE?: string
  PGUSER?: string
  PGPASSWORD?: string
}

export type RateLimitConfig = {
  maxRequestCount: number
  timeWindowSeconds: number
}

export type Services = {
  authorService: AuthorService
}
