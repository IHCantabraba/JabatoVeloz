export const obtenerCategoria = (product, AvaliableSeriegrafia) => {
  const filterSeriegrafia = AvaliableSeriegrafia.filter(
    (serie) => serie.categoria.toLowerCase() === product.Categoria.toLowerCase()
  )
  if (filterSeriegrafia.length > 0) {
    return filterSeriegrafia[0].categoria
  } else {
    console.log('no existe seriegrafia')
    return null
  }
}
