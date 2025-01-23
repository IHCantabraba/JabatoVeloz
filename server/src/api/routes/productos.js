import {
  getAllProductos,
  deleteProduct,
  createProduct,
  addRate
} from '../controllers/productos.js'
import { isAuth, isAdmin } from '../../middleware/auth.js'
import upload from '../../middleware/file.js'
import express from 'express'
export const maxDuration = 60
export const dynamic = 'force-dynamic'
const productosRouter = express.Router()
productosRouter.get('/', [isAuth], getAllProductos)
productosRouter.delete('/:id', [isAuth, isAdmin], deleteProduct)
productosRouter.post('/producto', upload.single('img'), createProduct)
productosRouter.post('/producto/:id', addRate)
export default productosRouter
