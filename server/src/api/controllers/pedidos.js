import Pedidos from '../models/pedidos.js'
import tryCatch from './utils/tryCatch.js'

export const createPedido = tryCatch(async (req, res) => {
  // const { id: uid } = req.user
  const newPedido = new Pedidos({ ...req.body })
  await newPedido.save()
  return res.status(201).json({ success: true, result: newPedido })
})
export const getAllPedidos = tryCatch(async (req, res) => {
  const pedidos = await Pedidos.find()
  return res.status(201).json({ success: true, result: pedidos })
})
