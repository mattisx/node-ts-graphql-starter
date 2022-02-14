import { UserInputError } from 'apollo-server-core'
import { Context } from '../../../types/serverTypes'

export type GetAuthorProps = {
  id: number
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
    args.id = parseInt(String(args.id))
    if (!args.id || isNaN(args.id)) {
      throw new UserInputError('Invalid author id provided, please send a whole number.')
    }
    const { success, data, safeError } = await context.services.authorService.getAuthor(args.id)
    if (!success) {
      throw new Error(`Error in AuthorService: ${safeError}`)
    }
    return data
  },
}
