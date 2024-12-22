import { isAuth, isAdmin } from '../../middleware/auth.js'
import upload from '../../middleware/file.js'
import {
  deleteUser,
  getUserByID,
  getAllusers,
  registerEvent,
  updatedUser
} from '../controllers/users.js'
import express from 'express'
const userRouter = express.Router()
userRouter.get('/', [isAuth, isAdmin], getAllusers)
userRouter.get('/:id', [isAuth, getUserByID])
userRouter.post(
  'competitons',
  [isAuth, isAdmin],
  upload.single('img'),
  registerEvent
)
userRouter.post('/:id', [isAuth], upload.single('img'))
userRouter.delete('/:id', [isAdmin, isAdmin], deleteUser)
export default userRouter
