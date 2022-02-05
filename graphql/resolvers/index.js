import { authorMutations, authorQueries } from './author'
import { bookMutations, bookQueries } from './book'
import { publisherMutations, publisherQueries } from './publisher'

const resolvers = {
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

export default resolvers