import express from 'express'
import {
  createSeriegrafia,
  getSeriegrafias
} from '../controllers/seriegrafia.js'

const SeriegrafiaRouter = express.Router()

SeriegrafiaRouter.post('/seriegrafia', createSeriegrafia)
SeriegrafiaRouter.get('/', getSeriegrafias)

export default SeriegrafiaRouter
