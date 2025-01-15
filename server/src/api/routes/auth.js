import upload from '../../middleware/file.js'
import { register, login } from '../controllers/auth.js'
import express from 'express'

export const maxDuration = 60
export const dynamic = 'force-dynamic'
const authRouter = express.Router()

authRouter.post('/register', upload.single('img'), register)
authRouter.post('/login', login)
export default authRouter
