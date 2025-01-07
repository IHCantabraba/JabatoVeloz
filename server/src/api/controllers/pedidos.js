import Pedidos from '../models/pedidos.js'
import tryCatch from './utils/tryCatch.js'

export const createPedido = tryCatch(async (req, res) => {
  const newPedido = new Pedidos({ ...req.body })
  await newPedido.save()
  return res.status(201).json({ success: true, result: newPedido })
})
export const getAllPedidos = tryCatch(async (req, res) => {
  const pedidos = await Pedidos.find()
    .populate({ path: 'orders', populate: { path: 'productos' } })
    .populate({ path: 'orders', populate: { path: 'users' } })
    .populate('users')

  return res
    .status(201)
    .json({ success: true, result: pedidos, message: 'Pedidos actualizados' })
})
