import Productos from '../models/productos.js'
import tryCatch from './utils/tryCatch.js'
import deleteFile from '../../utils/deleteFile.js'
export const getAllProductos = tryCatch(async (req, res) => {
  const productos = await Productos.find().populate({
    path: 'Puntuacion',
    populate: { path: 'users' }
  })
  return res.status(201).json({
    success: true,
    result: productos,
    message: 'Productos cargados'
  })
})

export const deleteProduct = tryCatch(async (req, res) => {
  const { id } = req.params
  const deleteProduct = await Productos.findByIdAndDelete(id)
  if (deleteProduct.img && deleteProduct.originalIMG) {
    deleteFile(deleteProduct.img)
  }
  return res.status(200).json({ success: true, message: 'Producto Eliminado' })
})

export const createProduct = tryCatch(async (req, res) => {
  const productDuplicated = await Productos.findOne({ Nombre: req.body.Nombre })
  if (productDuplicated) {
    return res.status(400).json({
      success: false,
      message: 'Product Name already exists.'
    })
  }
  const newProduct = new Productos(req.body)
  if (req.file) {
    newProduct.img = req.file.path
  }
  const product = await newProduct.save()
  if (product)
    return res
      .status(201)
      .json({ success: true, result: product, message: 'Product added' })
})

export const addRate = tryCatch(async (req, res) => {
  const { id } = req.params
  const productRated = await Productos.findById(id)

  if (productRated) {
    productRated.Puntuacion = [req.body.puntuacion, ...productRated.Puntuacion]
  }
  const updatedProduct = await Productos.findByIdAndUpdate(id, productRated, {
    new: true
  })
  return res
    .status(200)
    .json({ success: true, result: updatedProduct, message: 'Puntuado!' })
})
