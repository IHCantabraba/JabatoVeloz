export const getSeriegrafiaPrice = (categoria, seriegrafiasDisponibles) => {
  const filterSeriegrafia = seriegrafiasDisponibles.filter(
    (serie) => serie.categoria.toLowerCase() === categoria.toLowerCase()
  )
  return filterSeriegrafia[0]?.precio
}
