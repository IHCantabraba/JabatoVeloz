import express from 'express'
import { createOrder, updateOrder } from '../controllers/orders.js'

const ordersRouter = express.Router()

ordersRouter.post('/order', createOrder)
ordersRouter.post('/:id', updateOrder)

export default ordersRouter
