import mongoose from 'mongoose'

const pedidosSchema = mongoose.Schema(
  {
    ExpireDate: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    orders: [{ type: mongoose.Types.ObjectId, ref: 'orders' }],
    uid: { type: mongoose.Types.ObjectId, ref: 'users' },
    open: { type: Boolean, default: true }
  },
  { timestamp: true, collection: 'pedidos' }
)
const Pedidos = mongoose.model('pedidos', pedidosSchema, 'pedidos')

export default Pedidos
