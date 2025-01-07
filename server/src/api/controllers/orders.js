import Pedidos from '../models/pedidos.js'
import Orders from '../models/orders.js'
import tryCatch from './utils/tryCatch.js'

export const createOrder = tryCatch(async (req, res) => {
  const { id } = req.params

  const pedido = await Pedidos.findById(req.body.pedidos)

  const newOrder = new Orders(req.body)

  const solicitud = await newOrder.save()

  if (solicitud) {
    if (pedido) {
      pedido.orders.push(solicitud._id)
      const updatedPedido = await Pedidos.findByIdAndUpdate(pedido.id, pedido, {
        new: true
      })
    }
  }
  return res.status(201).json({ success: true, result: solicitud })
})
export default createOrder
