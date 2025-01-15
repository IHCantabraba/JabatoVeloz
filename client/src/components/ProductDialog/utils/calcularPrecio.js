export const calculatePrecio = (product, seriegrafia, AvaliableSeriegrafia) => {
  const filterSeriegrafia = AvaliableSeriegrafia.filter(
    (serie) => serie.categoria.toLowerCase() === product.Categoria.toLowerCase()
  )
  if (seriegrafia) {
    return Number(product.Precio) + Number(filterSeriegrafia[0].precio)
  } else {
    return product.Precio
  }
}
