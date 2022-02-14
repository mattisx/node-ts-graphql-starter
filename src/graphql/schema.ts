import { readdirSync, readFileSync } from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers'
import { Context } from '../types/serverTypes'

export const getSchema = (context: Context) => {
  const gqlFiles: string[] = readdirSync(new URL('./typedefs', import.meta.url))

  let typeDefs: string = ''

  gqlFiles.map((file) => {
    // typeDefs += readFileSync(join(__dirname, './typedefs', file), {
    typeDefs += readFileSync(new URL('./typedefs/' + file, import.meta.url), {
      encoding: 'utf8',
    })
  })

  return makeExecutableSchema({
    typeDefs,
    resolvers: resolvers(context),
  })
}
