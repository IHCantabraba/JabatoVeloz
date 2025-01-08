import Pedidos from '../models/pedidos.js'
import Orders from '../models/orders.js'
import tryCatch from './utils/tryCatch.js'
import User from '../models/users.js'

export const createOrder = tryCatch(async (req, res) => {
  const pedido = await Pedidos.findById(req.body.pedidos)
  const user = await User.findById(req.body.users)

  const newOrder = new Orders(req.body)
  const solicitud = await newOrder.save()

  if (solicitud) {
    if (pedido) {
      pedido.orders.push(solicitud._id)
      const updatedPedido = await Pedidos.findByIdAndUpdate(pedido.id, pedido, {
        new: true
      })
    }
    if (user) {
      user.orders.push(solicitud._id)
      const updatedUser = await User.findByIdAndUpdate(user.id, user, {
        new: true
      })
    }
  }
  return res.status(201).json({ success: true, result: solicitud })
})
export const updateOrder = tryCatch(async (req, res) => {
  const { id } = req.params
  const order = await Orders.findById(id)

  if (order) {
    console.log(`order ${order._id} actualizada`)
    order.pagado = true
  }

  const orderUpdated = await Orders.findByIdAndUpdate(id, order, {
    new: true
  })
  return res.status(200).json({
    success: true,
    result: orderUpdated,
    message: 'Prenda actualizada'
  })
})
export default { createOrder, updateOrder }
