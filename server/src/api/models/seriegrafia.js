import mongoose from 'mongoose'

const seriegrafiaSchema = mongoose.Schema(
  {
    precio: { type: Number, required: true },
    categoria: { type: String, required: true }
  },
  { timestamps: true, collection: 'seriegrafias' }
)
const Seriegrafias = mongoose.model(
  'seriegrafias',
  seriegrafiaSchema,
  'seriegrafias'
)
export default Seriegrafias
