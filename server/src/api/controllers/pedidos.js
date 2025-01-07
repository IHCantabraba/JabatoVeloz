import Pedidos from '../models/pedidos.js'
import tryCatch from './utils/tryCatch.js'
import Orders from '../models/orders.js'

export const createPedido = tryCatch(async (req, res) => {
  // const { id: uid } = req.user
  const newPedido = new Pedidos({ ...req.body })
  await newPedido.save()
  return res.status(201).json({ success: true, result: newPedido })
})
export const getAllPedidos = tryCatch(async (req, res) => {
  // const orders = await Orders.find().populate('productos')
  const pedidos = await Pedidos.find().populate('orders').populate('users')
  // if (orders) {
  //   console.log('orders')
  //   /* para cada pedido */
  //   const pedidosCombinados = pedidos.map((pedido) => {
  //     /* si el pedido tiene ordenes */
  //     if (pedido.orders.length > 0) {
  //       console.log('tiene pedidos')
  //       /* recorrer las ordenes */
  //       pedido.orders.map((order) => {
  //         console.log('recorriendo las ordenes del pedido')
  //         /* para cada orden incluir la info del producto */
  //         const orderProducts = orders.find(
  //           (peticion) => peticion._id === order._id
  //         )
  //         console.log('order con info de producto es: ', orderProducts)
  //         order.productos = orderProducts.productos
  //         console.log(order.productos)
  //       })
  //     } else {
  //       console.log('no tiene pedidos')
  //     }
  //   })
  // } else {
  //   console.log('no orders')
  // }
  return res
    .status(201)
    .json({ success: true, result: pedidos, message: 'Pedidos actualizados' })
})
