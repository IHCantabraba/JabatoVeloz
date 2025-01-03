import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './src/config/db.js'
import cors from 'cors'
// import userRouter from './src/api/routes/users.js'
import userRouter from './src/api/routes/users2.js'
import authRouter from './src/api/routes/auth.js'
import cloudinaryConfig from './src/config/cloudinary.js'
import pedidosRouter from './src/api/routes/pedidos.js'
import productosRouter from './src/api/routes/productos.js'

const app = express()
const PORT = 3000

connectDB()
cloudinaryConfig()
/* configure to accept json structure */
app.use(express.json())
/* configure to access from different ip (front and back end) */
app.use(cors())
/* router a los distintos modelos */
/* auth (register login) */
app.use('/api/auth', authRouter)
/* users */
app.use('/api/users', userRouter)
/* pedidos */
app.use('/api/pedidos', pedidosRouter)
/* productos */
app.use('/api/productos', productosRouter)
/* Not found Root */
app.use('*', (req, res, next) => {
  return res.status(404).json(`Route not found`)
})
/* listen port for backend */
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`)
})
