import { Book } from '../../../services/bookService/bookService.types'
import { Context } from '../../../types/serverTypes'

export const bookFields = {
  Book: {
    author: async (book: Book, args: never, context: Context) => {
      const { data } = await context.services.authorService.getAuthor(book.authorId)
      return data
    },
  },
}
