export const getAverage = (puntuaciones) => {
  const numeroPuntuaciones = puntuaciones.length
  let puntuacionTotal = 0
  puntuaciones.map((puntuacion) => (puntuacionTotal += puntuacion.score))
  const average = puntuacionTotal / numeroPuntuaciones

  return average.toFixed(1)
}
