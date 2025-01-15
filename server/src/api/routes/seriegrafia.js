import express from 'express'
import {
  createSeriegrafia,
  getSeriegrafias
} from '../controllers/seriegrafia.js'

const SeriegrafiaRouter = express.Router()
export const maxDuration = 60
export const dynamic = 'force-dynamic'
SeriegrafiaRouter.post('/seriegrafia', createSeriegrafia)
SeriegrafiaRouter.get('/', getSeriegrafias)

export default SeriegrafiaRouter
