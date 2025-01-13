import Productos from '../models/productos.js'
import tryCatch from './utils/tryCatch.js'
import deleteFile from '../../utils/deleteFile.js'
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
  /* TODO add filed originalIMG to products */
  if (deleteProduct.img && deleteProduct.originalIMG) {
    deleteFile(deleteProduct.img)
  } else {
    console.log('nothing to delete')
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
    console.log('adding file')
    newProduct.img = req.file.path
  } else {
    console.log('no image passed')
  }
  const product = await newProduct.save()
  if (product)
    return res
      .status(201)
      .json({ success: true, result: product, message: 'Product added' })
})
