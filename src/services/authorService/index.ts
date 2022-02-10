import { Either } from '../../types/serverTypes'
import { serviceError } from '../../utils/serviceError'
import { AuthorResponse, AuthorServiceProps, ServiceError } from './authorService.types'

import { data } from './dummydata'

export interface AuthorService {
  getAuthor: (id: number) => Promise<Either<AuthorResponse, ServiceError>>
  getAuthors: () => Promise<Either<AuthorResponse, ServiceError>>
}

export const AuthorService = ({ db }: AuthorServiceProps): AuthorService => {
  const getAuthor = async (id: number) => {
    try {
      const author = data.filter((author) => {
        if (author.id === id) {
          return author
        }
      })
      return Promise.resolve({ success: true, data: author })
    } catch (error: unknown) {
      return Promise.resolve(serviceError(error, 'Could not get author.'))
    }
  }

  const getAuthors = async () => {
    try {
      const authors = data
      return Promise.resolve({ success: true, data: authors })
    } catch (error: unknown) {
      return Promise.resolve(serviceError(error, 'Could not get authors.'))
    }
  }

  return {
    getAuthor,
    getAuthors,
  }
}
