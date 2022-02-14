import { Author } from '../../../services/authorService/authorService.types'
import { Context } from '../../../types/serverTypes'

export const authorFields = (context: Context) => {
  return {
    Author: {
      books: async (author: Author) => {
        const { data } = await context.services.bookService.getAuthorBooks(author)
        return data
      },
    },
  }
}
