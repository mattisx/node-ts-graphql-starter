import { UserInputError } from 'apollo-server-core'
import { Context } from '../../../types/serverTypes'

type GetAuthorProps = {
  id: string
}

export const authorQueries = {
  authors: async (parent: never, args: never, context: Context) => {
    const { success, data, safeError } = await context.services.authorService.getAuthors()
    if (!success) {
      throw new Error(`Error in AuthorService: ${safeError}`)
    }
    return data
  },
  author: async (parent: never, args: GetAuthorProps, context: Context) => {
    if (!args.id || isNaN(parseInt(args.id))) {
      throw new UserInputError('Invalid input id provided, please send a whole number.')
    }
    const { success, data, safeError } = await context.services.authorService.getAuthor(parseInt(args.id))
    if (!success) {
      throw new Error(`Error in AuthorService: ${safeError}`)
    }
    return data
  },
}
