import jwt from 'jsonwebtoken'

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable!')
}

console.log(jwt.sign({ 'id': 123421312, 'email': 'test@example.com' }, JWT_SECRET))
