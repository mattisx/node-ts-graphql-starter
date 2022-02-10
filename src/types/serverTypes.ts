import { AuthorService } from '../services/authorService'
import { DatabaseInstance } from '../services/databaseService/databaseService.types'

type Only<T, U> = { [P in keyof T]: T[P] } & Omit<{ [P in keyof U]?: never }, keyof T>

export type Either<T, U> = Only<T, U> | Only<U, T>

export interface Context {
  env: Env
  port: number
  db: DatabaseInstance
  services: Services
}

export type Env = {
  dev: boolean
  prod: boolean
}

export type Services = {
  authorService: AuthorService
}
