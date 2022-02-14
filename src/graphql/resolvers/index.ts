import { Book } from '../../services/bookService/bookService.types'
import { Context } from '../../types/serverTypes'
import { authorMutations, authorQueries } from './author'
import { bookMutations, bookQueries } from './book'

export const resolvers = (context: Context) => {
  return {
    Query: {
      ...authorQueries,
      ...bookQueries,
    },
    Mutation: {
      ...authorMutations,
      ...bookMutations,
    },
    Book: {
      author: async (book: Book) => {
        const { data } = await context.services.authorService.getAuthor(book.authorId)
        return data
      },
    },
  }
}
