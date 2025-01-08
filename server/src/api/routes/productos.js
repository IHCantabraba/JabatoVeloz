import { getAllProductos, deleteProduct } from '../controllers/productos.js'
import { isAuth, isAdmin } from '../../middleware/auth.js'

import express from 'express'
const productosRouter = express.Router()
productosRouter.get('/', [isAuth], getAllProductos)
productosRouter.delete('/:id', [isAdmin], deleteProduct)

export default productosRouter
