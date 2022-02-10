import 'dotenv/config'

if (!process.env.PORT) {
  throw new Error('Missing PORT environment variable!')
}
const port = parseInt(process.env.PORT)

if (!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV environment variable!')
}
if (['dev', 'prod'].indexOf(process.env.NODE_ENV) === -1) {
  throw new Error(`Environment variable NODE_ENV does not contain either 'dev' or 'prod'.`)
}
const env = {
  dev: process.env.NODE_ENV === 'dev',
  prod: process.env.NODE_ENV === 'prod',
}

export { port, env }
