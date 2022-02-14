import { UserInputError } from 'apollo-server-core'
import { Author } from '../../../services/authorService/authorService.types'
import { Context } from '../../../types/serverTypes'

export type CreateAuthorProps = {
  author: Author
}

export type UpdateAuthorProps = {
  author: Author
}

export const authorMutations = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createAuthor: async (parent: never, args: CreateAuthorProps, context: Context) => {
    args.author.name = args.author.name.trim()
    if (args.author.name.length === 0) throw new UserInputError('Missing author name, can not create author.')

    const { data, success, safeError } = await context.services.authorService.createAuthor(args)
    if (!success) {
      throw new Error(`Error in AuthorService: ${safeError}`)
    }
    return data
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAuthor: async (parent: never, args: UpdateAuthorProps, context: Context) => {
    args.author.id = parseInt(String(args.author.id))
    args.author.name = args.author.name.trim()
    if (isNaN(args.author.id) || args.author.id === 0) throw new UserInputError(`Can't update author, something is wrong with your author id.`)
    if (args.author.name.length === 0) throw new UserInputError('Missing author name, can not update author.')

    const { data, success, safeError } = await context.services.authorService.updateAuthor(args)
    if (!success) {
      throw new Error(`Error in AuthorService: ${safeError}`)
    }
    return data
  },
}
