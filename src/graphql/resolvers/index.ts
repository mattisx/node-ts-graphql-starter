import { authorQueries, authorMutations, authorFields } from './author'
import { bookQueries, bookMutations, bookFields } from './book'

export const resolvers = {
  Query: {
    ...authorQueries,
    ...bookQueries,
  },
  Mutation: {
    ...authorMutations,
    ...bookMutations,
  },
  ...authorFields,
  ...bookFields,
}
