import deleteFile from '../../utils/deleteFile.js'
import Event from '../models/competitions.js'
import User from '../models/users.js'
import tryCatch from '../controllers/utils/tryCatch.js'
export const getAllusers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while getting all users: ${error}`)
  }
}
export const getUserByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
      .populate('orders')
      .populate({ path: 'orders', populate: { path: 'productos' } })
      .populate({ path: 'orders', populate: { path: 'pedidos' } })
    return res.status(200).json({
      success: true,
      result: user,
      message: 'Actualizandas las ordenes de ropa'
    })
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while getting the user: ${error}`)
  }
}

export const updatedUser = tryCatch(async (req, res, next) => {
  const { id } = req.params
  const newUser = new User(req.body)
  const oldUser = await User.findById(id)

  if (req.file) {
    deleteFile(oldUser.img)
    newUser.img = req.file.path
  }
  newUser._id = id
  newUser.rol = oldUser.rol
  newUser.orders = oldUser.orders
  newUser.carreras = oldUser.carreras

  const userUpdated = await User.findByIdAndUpdate(id, newUser, {
    new: true
  })
  return res.status(200).json({
    success: true,
    result: userUpdated
  })
})
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)
    if (deleteUser.img !== 'Undefined') {
      deleteFile(deletedUser.img)
    }
    return res.status(200).json(`Succesfully deleted User: ${deletedUser}`)
  } catch (error) {
    return res.status(400).json(`Error ocurred while deleting User: ${error}`)
  }
}
/* registrar una Carrera */
export const registerEvent = async (req, res, next) => {
  try {
    const eventDuplicated = await Event.findOne({ titulo: req.body.titulo })
    if (eventDuplicated) {
      return res.satus(400).json(`Event is already register`)
    }
    const newEvent = new Event(req.body)
    if (req.file) {
      newEvent.img = req.file.path
    }
    const event = await newEvent.save()
    return res.status(200).json(event)
  } catch (error) {
    return res
      .status(400)
      .json(`Error occurred while registering event: ${error}`)
  }
}
export default {
  registerEvent,
  getAllusers,
  getUserByID,
  updatedUser,
  deleteUser
}
