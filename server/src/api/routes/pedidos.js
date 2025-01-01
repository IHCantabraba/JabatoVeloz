import { createPedido, getAllPedidos } from '../controllers/pedidos.js'
import express from 'express'
const pedidosRouter = express.Router()
pedidosRouter.get('/', getAllPedidos)
pedidosRouter.post('/pedido', createPedido)
export default pedidosRouter
