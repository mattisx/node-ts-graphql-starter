import { Context } from '../../../types/serverTypes'

import { authorQueries } from './author.queries'
import { authorMutations } from './author.mutations'
import { authorFields } from './author.fields'

export const authorResolvers = (context: Context) => {
  // Inject context into fields
  return {
    queries: authorQueries,
    mutations: authorMutations,
    fields: authorFields(context),
  }
}
