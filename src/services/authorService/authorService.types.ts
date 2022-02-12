import { DatabaseInstance } from '../databaseService/databaseService.types'

export type AuthorResponse = {
  success: boolean
  data: Author[]
}

export interface ServiceError {
  success: boolean
  errorCode: string
  error: string
  safeError: string
  data: string
}

export type Author = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type AuthorServiceProps = {
  db: DatabaseInstance
}
