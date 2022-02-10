import { Context } from '../../../types/serverTypes';

export const authorMutations = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createAuthor: async (parent: never, args: never, context: Context) => {
    return await Promise.resolve({ success: true, message: 'AUTHOR_CREATED', data: { id: 44 } })
  },
  // updateAuthor: async (_, args) => {}
}
