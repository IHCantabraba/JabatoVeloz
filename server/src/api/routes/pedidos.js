import {
  createPedido,
  getAllPedidos,
  closePedido
} from '../controllers/pedidos.js'
import express from 'express'
export const maxDuration = 60
export const dynamic = 'force-dynamic'
const pedidosRouter = express.Router()
pedidosRouter.get('/', getAllPedidos)
pedidosRouter.post('/pedido', createPedido)
pedidosRouter.post('/pedido/:id', closePedido)

export default pedidosRouter
