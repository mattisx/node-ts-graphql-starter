import { CreateAuthorProps, UpdateAuthorProps } from '../../graphql/resolvers/author/author.mutations'
import { Either } from '../../types/serverTypes'
import { camelCase } from '../../utils/camelCase'
import { serviceError } from '../../utils/serviceError'
import { Author, AuthorResponse, AuthorServiceProps, ServiceError } from './authorService.types'

export interface AuthorService {
  getAuthor: (id: number) => Promise<Either<AuthorResponse, ServiceError>>
  getAuthors: () => Promise<Either<AuthorResponse, ServiceError>>
  createAuthor: (props: CreateAuthorProps) => Promise<Either<AuthorResponse, ServiceError>>
  updateAuthor: (props: UpdateAuthorProps) => Promise<Either<AuthorResponse, ServiceError>>
}

export const AuthorService = ({ db }: AuthorServiceProps): AuthorService => {
  const getAuthor = async (id: number) => {
    try {
      const query = 'SELECT * FROM authors WHERE id = $1' // Never use `String ${concatenation}` in queries!
      const values = [id]
      const { rows } = await db.query(query, values)
      return { success: true, data: <Author[]>camelCase(rows)[0] }
    } catch (error: unknown) {
      return serviceError(error, 'Could not get author.')
    }
  }

  const getAuthors = async () => {
    try {
      const query = 'SELECT * FROM authors'
      const { rows } = await db.query(query)
      return { success: true, data: <Author[]>camelCase(rows) }
    } catch (error: unknown) {
      return serviceError(error, 'Could not get authors.')
    }
  }

  const createAuthor = async ({ author }: CreateAuthorProps) => {
    try {
      const query = 'INSERT INTO authors (name) VALUES ($1) RETURNING *'
      const values = [author.name]
      const { rows } = await db.query(query, values)
      return { success: true, data: <Author[]>camelCase(rows)[0] }
    } catch (error: unknown) {
      return serviceError(error, 'Could not create author.')
    }
  }

  const updateAuthor = async ({ author }: UpdateAuthorProps) => {
    try {
      const query = 'UPDATE authors SET name = $2 WHERE id = $1 RETURNING *'
      const values = [author.id, author.name]
      const { rows } = await db.query(query, values)
      return { success: true, data: <Author[]>camelCase(rows)[0] }
    } catch (error: unknown) {
      return serviceError(error, 'Could not update author.')
    }
  }

  return {
    getAuthor,
    getAuthors,
    createAuthor,
    updateAuthor,
  }
}
