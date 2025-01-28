export const getAverage = (puntuaciones) => {
  const average =
    puntuaciones.reduce((suma, puntuacion) => suma + puntuacion.score, 0) /
    puntuaciones.length

  return average.toFixed(1)
}
