import { Context } from '../../types/serverTypes'
import { authorResolvers } from './author'
import { bookResolvers } from './book'

export const resolvers = (context: Context) => {
  return {
    Query: {
      ...authorResolvers(context).queries,
      ...bookResolvers(context).queries,
    },
    Mutation: {
      ...authorResolvers(context).mutations,
      ...bookResolvers(context).mutations,
    },
    ...authorResolvers(context).fields,
    ...bookResolvers(context).fields,
  }
}
