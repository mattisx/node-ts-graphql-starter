import { Context } from '../../../types/serverTypes'

import { bookQueries } from './book.queries'
import { bookMutations } from './book.mutations'
import { bookFields } from './book.fields'

export const bookResolvers = (context: Context) => {
  // Inject context into fields
  return {
    queries: bookQueries,
    mutations: bookMutations,
    fields: bookFields(context),
  }
}
