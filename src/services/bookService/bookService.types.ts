import { DatabaseInstance } from '../databaseService/databaseService.types'

export type BookResponse = {
  success: boolean
  data: Book[]
}

export interface ServiceError {
  success: boolean
  errorCode: string
  error: string
  safeError: string
  data: string
}

export type Book = {
  id: number
  name: string
  authorId: number
  createdAt: Date
  updatedAt: Date
}

export type BookServiceProps = {
  db: DatabaseInstance
}
