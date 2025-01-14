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

/* TODO reopen pedido */

export const closePedido = tryCatch(async (req, res) => {
  const { id } = req.params
  const pedido = await Pedidos.findById(id)

  if (pedido) pedido.open = false

  const updatedPedido = await Pedidos.findByIdAndUpdate(id, pedido, {
    new: true
  })
  return res.status(201).json({
    success: true,
    result: updatedPedido,
    message: 'Pedido cerrado correctamente'
  })
})
