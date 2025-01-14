import express from 'express'
import { createOrder, updateOrder, deleteOrder } from '../controllers/orders.js'

const ordersRouter = express.Router()

ordersRouter.post('/order', createOrder)
ordersRouter.post('/:id', updateOrder)
ordersRouter.delete('/order/:id', deleteOrder)

export default ordersRouter
