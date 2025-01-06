import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    product: { type: mongoose.Types.ObjectId, ref: 'productos' },
    talla: { type: String, required: true },
    pedido: { type: mongoose.Types.ObjectId, ref: 'pedidos' },
    unidades: { type: String, required: true },
    precio: { type: String, required: true }
  },
  { timestamp: true, collection: 'orders' }
)
const Orders = mongoose.model('orders', orderSchema, 'orders')

export default Orders
