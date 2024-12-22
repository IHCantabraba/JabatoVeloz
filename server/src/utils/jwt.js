import jwt from 'jsonwebtoken'
export const generateKey = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
}
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}
export default { generateKey, verifyToken }
