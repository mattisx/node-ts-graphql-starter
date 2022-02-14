import { UserInputError } from 'apollo-server-core'
import { Context } from '../../../types/serverTypes'

export type GetBookProps = {
  id: number
}

export const bookQueries = {
  books: async (parent: never, args: never, context: Context) => {
    const { success, data, safeError } = await context.services.bookService.getBooks()
    if (!success) {
      throw new Error(`Error in BookService: ${safeError}`)
    }
    return data
  },
  book: async (parent: never, args: GetBookProps, context: Context) => {
    if (!args.id || isNaN(parseInt(String(args.id)))) {
      throw new UserInputError('Invalid input id provided, please send a whole number.')
    }
    const { success, data, safeError } = await context.services.bookService.getBook(args)
    if (!success) {
      throw new Error(`Error in BookService: ${safeError}`)
    }
    return data
  },
}
