import Seriegrafias from '../models/seriegrafia.js'
import tryCatch from './utils/tryCatch.js'

export const createSeriegrafia = tryCatch(async (req, res) => {
  const seriegrafiDup = await Seriegrafias.findOne({
    categoria: req.body.categroia
  })
  if (seriegrafiDup) {
    return res.status(400).json({
      success: false,
      message: 'Esta seriegrafia ya existe.!'
    })
  }
  const newSeriegrafia = new Seriegrafias(req.body)
  const seriegrafia = await newSeriegrafia.save()
  return res
    .status(201)
    .json({ success: true, result: seriegrafia, message: 'seriegrafia Creada' })
})
export const getSeriegrafias = tryCatch(async (req, res) => {
  const seriegrafias = await Seriegrafias.find()
  return res.status(201).json({
    success: true,
    result: seriegrafias,
    message: 'Seriegrafias cargadas'
  })
})
export default { createSeriegrafia, getSeriegrafias }
