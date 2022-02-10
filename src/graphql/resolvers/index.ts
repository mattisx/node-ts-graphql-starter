import { authorMutations, authorQueries } from './author'
import { bookMutations, bookQueries } from './book'
import { publisherMutations, publisherQueries } from './publisher'

export const resolvers = {
  Query: {
    ...authorQueries,
    ...bookQueries,
    ...publisherQueries
  },
  Mutation: {
    ...authorMutations,
    ...bookMutations,
    ...publisherMutations
  }
}
