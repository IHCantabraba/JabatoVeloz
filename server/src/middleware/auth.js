import User from '../api/models/users.js'
import verifyToken from '../utils/jwt.js'

export const isAuth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization?.replace('Bearer ', '')
    const { id } = verifyToken(token)
    const user = await User.findById(id)
    if (user) {
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json(`User Id not found`)
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json(error)
  }
}
export const isAdmin = async (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(401).send({ msg: 'not an admin' })
  }
  next()
}
export default { isAuth, isAdmin }
