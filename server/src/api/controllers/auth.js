import bcrypt from 'bcrypt'
import User from '../models/users.js'
import { generateKey } from '../../utils/jwt.js'
export const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({
      dni: req.body.dni
    })
    if (userDuplicated) {
      return res.status(400).json('User alrady exists. Please log in!')
    }
    const newUser = new User(req.body)
    if (req.file) {
      console.log('adding file')
      newUser.img = req.file.path
    } else {
      console.log('no image passed')
    }
    const user = await newUser.save()
    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json(`Error while registering: ${error}`)
  }
}
export const login = async (req, res, next) => {
  try {
    const { nombre, password } = req.body
    const user = await User.findOne({ nombre })
    if (!user) {
      return res.status(400).json(`user name '${nombre}' does not exists`)
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateKey(user.id)
      return res.status(200).json({ token, user })
    }
    return res.status(400).json(`user or password incorrect`)
  } catch (error) {
    return res.status(400).sjon(`Error while login: ${error}`)
  }
}
// export default { register, login }
