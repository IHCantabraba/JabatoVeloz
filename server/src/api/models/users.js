import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validateDNI from '../../utils/ValidateDNIorNIE.js'
import ValidateEmail from '../../utils/validateEmail.js'
/* TODO funcion para validar DNI o NIE */
/* esquema de usuario */
const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellidos: { type: String, required: true, trim: true },
    alias: { type: String, required: false },
    dni: {
      type: String,
      required: true,
      validate: [validateDNI, 'Invalid DNI or NIE']
    },
    email: {
      type: String,
      require: true,
      validate: [ValidateEmail, 'Please fill a valid email address']
    },
    password: { type: String, required: true, trim: true },
    birthDate: { type: String, required: true },
    rol: {
      type: String,
      required: false,
      default: 'user',
      enum: ['admin', 'user', 'candidate']
    },
    img: { type: String, required: false },
    carreras: [{ type: mongoose.Types.ObjectId, ref: 'competitions' }]
  },
  { timestamp: true, collection: 'users' }
)
/* encriptar contraseña antes de almacenarla */
userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})
const User = mongoose.model('users', userSchema, 'users')
export default User
