import { CreateBookProps, UpdateBookProps } from '../../graphql/resolvers/book/book.mutations'
import { GetBookProps } from '../../graphql/resolvers/book/book.queries'
import { Either } from '../../types/serverTypes'
import { camelCase } from '../../utils/camelCase'
import { serviceError } from '../../utils/serviceError'
import { Book, BookResponse, BookServiceProps, ServiceError } from './bookService.types'

export interface BookService {
  getBook: (props: GetBookProps) => Promise<Either<BookResponse, ServiceError>>
  getBooks: () => Promise<Either<BookResponse, ServiceError>>
  createBook: (props: CreateBookProps) => Promise<Either<BookResponse, ServiceError>>
  updateBook: (props: UpdateBookProps) => Promise<Either<BookResponse, ServiceError>>
}

export const BookService = ({ db }: BookServiceProps): BookService => {
  const getBook = async ({ id }: GetBookProps) => {
    try {
      const query = 'SELECT * FROM books WHERE id = $1' // Never use `String ${concatenation}` in queries!
      const values = [id]
      const { rows } = await db.query(query, values)
      return { success: true, data: <Book[]>camelCase(rows)[0] }
    } catch (error: unknown) {
      return serviceError(error, 'Could not get book.')
    }
  }

  const getBooks = async () => {
    try {
      const query = 'SELECT * FROM books'
      const { rows } = await db.query(query)
      return { success: true, data: <Book[]>camelCase(rows) }
    } catch (error: unknown) {
      return serviceError(error, 'Could not get books.')
    }
  }

  const createBook = async ({ book }: CreateBookProps) => {
    try {
      const query = 'INSERT INTO books (name, author_id) VALUES ($1, $2) RETURNING *'
      const values = [book.name, book.authorId]
      const { rows } = await db.query(query, values)
      return { success: true, data: <Book[]>camelCase(rows)[0] }
    } catch (error: unknown) {
      return serviceError(error, 'Could not create book.')
    }
  }

  const updateBook = async ({ book }: UpdateBookProps) => {
    try {
      const query = 'UPDATE books SET name = $1, author_id = $2 WHERE id = $3 RETURNING *'
      const values = [book.name, book.authorId, book.id]
      const { rows } = await db.query(query, values)
      return { success: true, data: <Book[]>camelCase(rows)[0] }
    } catch (error: unknown) {
      return serviceError(error, 'Could not update book.')
    }
  }

  return {
    getBook,
    getBooks,
    createBook,
    updateBook,
  }
}
