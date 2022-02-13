import { readdirSync, readFileSync } from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers'

const gqlFiles: string[] = readdirSync(new URL('./typedefs', import.meta.url))

let typeDefs: string = ''

gqlFiles.map((file) => {
  // typeDefs += readFileSync(join(__dirname, './typedefs', file), {
  typeDefs += readFileSync(new URL('./typedefs/' + file, import.meta.url), {
    encoding: 'utf8',
  })
})

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
