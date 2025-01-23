export const getAverage = (puntuaciones) => {
  const numeroPuntuaciones = puntuaciones.length
  let puntuacionTotal = 0
  puntuaciones.map((puntuacion) => (puntuacionTotal += puntuacion.score))
  const average = puntuacionTotal / numeroPuntuaciones

  //{ average: average.toFixed(1), total: numeroPuntuaciones }
  return { average: average.toFixed(1), total: numeroPuntuaciones }
}
