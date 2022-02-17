import { Author } from '../../../services/authorService/authorService.types'
import { Context } from '../../../types/serverTypes'

export const authorFields = {
  Author: {
    books: async (author: Author, args: never, context: Context) => {
      const { data } = await context.services.bookService.getAuthorBooks(author)
      return data
    },
  },
}
