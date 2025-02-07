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
import ordersRouter from './src/api/routes/orders.js'
import SeriegrafiaRouter from './src/api/routes/seriegrafia.js'

const app = express()
const PORT = 3000

connectDB()
cloudinaryConfig()
app.use(express.json())
app.use(cors())

/* router a los distintos modelos */
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/pedidos', pedidosRouter)
app.use('/api/productos', productosRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/seriegrafias', SeriegrafiaRouter)

/* Not found Root */
app.use('*', (req, res, next) => {
  return res.status(404).json(`Route not found`)
})
/* listen port for backend */
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`)
})
