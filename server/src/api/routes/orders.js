import express from 'express'
import { createOrder, updateOrder, deleteOrder } from '../controllers/orders.js'
export const maxDuration = 60
export const dynamic = 'force-dynamic'
const ordersRouter = express.Router()

ordersRouter.post('/order', createOrder)
ordersRouter.post('/:id', updateOrder)
ordersRouter.delete('/order/:id', deleteOrder)

export default ordersRouter
