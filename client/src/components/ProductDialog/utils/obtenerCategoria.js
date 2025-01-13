export const obtenerCategoria = (product, AvaliableSeriegrafia) => {
  const filterSeriegrafia = AvaliableSeriegrafia.filter(
    (serie) => serie.categoria === product.Categoria
  )
  if (filterSeriegrafia.length > 0) {
    return filterSeriegrafia[0].categoria
  } else {
    console.log('no existe seriegrafia')
    return null
  }
}
