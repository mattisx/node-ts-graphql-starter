import { Book } from '../../../services/bookService/bookService.types'
import { Context } from '../../../types/serverTypes'

export const bookFields = (context: Context) => {
  return {
    Book: {
      author: async (book: Book) => {
        const { data } = await context.services.authorService.getAuthor(book.authorId)
        return data
      },
    },
  }
}
