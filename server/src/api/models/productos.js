import mongoose from 'mongoose'
const subSchema = mongoose.Schema({
  users: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  score: { type: Number, required: true }
})

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
    Puntuacion: [subSchema],
    Descripcion: { type: String, required: false },
    img: { type: String, required: false },
    originalIMG: { type: Boolean, required: true }
  },
  { timestamps: true, collection: 'productos' }
)
const Productos = mongoose.model('productos', productosSchema, 'productos')
export default Productos
