import mongoose from 'mongoose'

const competitionSchema = mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  ubicacion: { type: String, required: true },
  fecha: Date,
  abierto: { type: Boolean, default: true },
  maxParticipates: { type: Number },
  distancia: { type: String, required: true },
  modalidades: { type: String, required: false },
  participantes: [{ type: mongoose.Types.ObjectId, ref: 'users' }]
})
const Competition = mongoose.model(
  'competitions',
  competitionSchema,
  'competitions'
)
export default Competition
