import { getAllProductos, deleteProduct } from '../controllers/productos.js'
import express from 'express'
const productosRouter = express.Router()
productosRouter.get('/', getAllProductos)
productosRouter.delete('/:id', deleteProduct)

export default productosRouter
