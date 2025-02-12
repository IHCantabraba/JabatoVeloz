import bcrypt from 'bcrypt'
import User from '../models/users.js'
import { generateKey } from '../../utils/jwt.js'
import tryCatch from './utils/tryCatch.js'
export const register = tryCatch(async (req, res, next) => {
  const userDuplicated = await User.findOne({
    dni: req.body.dni
  })
  if (userDuplicated) {
    return res.status(400).json({
      success: false,
      message: 'User already exists. Please log in!'
    })
  }
  if (req.body.password.length < 6)
    return res
      .status(400)
      .json({ success: false, message: 'Password must be 6 chras or more' })
  const newUser = new User(req.body)
  if (req.file) {
    newUser.img = req.file.path
  }
  const user = await newUser.save()
  return res
    .status(201)
    .json({ success: true, result: user, message: 'Registration successfuly' })
})
export const login = tryCatch(async (req, res, next) => {
  const { nombre, password } = req.body
  const user = await User.findOne({ nombre })

  if (!user) {
    return res.status(400).json({
      success: false,
      message: `user name '${nombre}' does not exists`
    })
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = generateKey(user.id)
    const simplifiedUser = {
      _id: user._id,
      alias: user.alias,
      nombre: user.nombre,
      rol: user.rol,
      img: user.img
    }
    return res.status(200).json({
      success: true,
      result: { token, user: simplifiedUser },
      message: 'Successfully login!'
    })
  }
  return res
    .status(400)
    .json({ success: false, message: `user or password incorrect` })
})
