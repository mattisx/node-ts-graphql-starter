import { Context } from '../../../types/serverTypes'

export type CreateAuthorProps = {
  name: string
}

export type UpdateAuthorProps = {
  id: number
  name: string
}

export const authorMutations = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createAuthor: async (parent: never, args: CreateAuthorProps, context: Context) => {
    const { data, success, safeError } = await context.services.authorService.createAuthor({ name: args.name })
    if (!success) {
      throw new Error(`Error in AuthorService: ${safeError}`)
    }
    return data
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAuthor: async (parent: never, args: UpdateAuthorProps, context: Context) => {
    const { data, success, safeError } = await context.services.authorService.updateAuthor({ id: args.id, name: args.name })
    if (!success) {
      throw new Error(`Error in AuthorService: ${safeError}`)
    }
    return data
  },
}
