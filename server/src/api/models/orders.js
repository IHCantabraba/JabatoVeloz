import mongoose from 'mongoose'
import Productos from '../models/productos.js'

const orderSchema = mongoose.Schema(
  {
    users: { type: mongoose.Types.ObjectId, ref: 'users' },
    // productos: { type: mongoose.Types.ObjectId, ref: 'productos' },
    productos: { type: String, required: true },
    talla: { type: String, required: true },
    pedidos: { type: mongoose.Types.ObjectId, ref: 'pedidos' },
    unidades: { type: String, required: true },
    precio: { type: String, required: true }
  },
  { timestamp: true, collection: 'orders' }
)

const Orders = mongoose.model('orders', orderSchema, 'orders')

export default Orders
