import 'dotenv/config'

const port = process.env.PORT

const env = {
  dev: process.env.NODE_ENV === 'dev',
  prod: process.env.NODE_ENV === 'prod'
}

export { port, env }