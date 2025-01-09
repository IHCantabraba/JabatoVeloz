import {
  getAllProductos,
  deleteProduct,
  createProduct
} from '../controllers/productos.js'
import { isAuth, isAdmin } from '../../middleware/auth.js'
import upload from '../../middleware/file.js'
import express from 'express'
const productosRouter = express.Router()
productosRouter.get('/', [isAuth], getAllProductos)
productosRouter.delete('/:id', [isAdmin], deleteProduct)
productosRouter.post('/producto', upload.single('img'), createProduct)
export default productosRouter
