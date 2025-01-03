import Productos from '../models/productos.js'
import tryCatch from './utils/tryCatch.js'

export const getAllProductos = tryCatch(async (req, res) => {
  const productos = await Productos.find()
  return res.status(201).json({
    success: true,
    result: productos,
    message: 'Productos cargados'
  })
})

export const deleteProduct = tryCatch(async (req, res) => {
  const { id } = req.params
  const deleteProduct = await Productos.findByIdAndDelete(id)
  return res.status(200).json({ success: true, message: 'Producto Eliminado' })
})
