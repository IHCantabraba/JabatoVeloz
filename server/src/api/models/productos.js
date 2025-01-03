import mongoose from 'mongoose'

const productosSchema = mongoose.Schema(
  {
    Nombre: { type: String, required: true },
    Categoria: { type: String, required: true },
    Sexo: {
      type: String,
      required: true,
      enum: ['hombre', 'mujer', 'unisex', 'niñ@s']
    },
    Precio: { type: String, required: true },
    Tallas: {
      type: String,
      required: true
    },
    Descripcion: { type: String, required: false },
    Foto: { type: String, required: false }
  },
  { timestamp: true, collection: 'productos' }
)
const Productos = mongoose.model('productos', productosSchema, 'productos')
export default Productos
