export const calculatePrecio = (product, seriegrafia, AvaliableSeriegrafia) => {
  const filterSeriegrafia = AvaliableSeriegrafia.filter(
    (serie) => serie.categoria === product.Categoria
  )
  if (seriegrafia) {
    return Number(product.Precio) + Number(filterSeriegrafia[0].precio)
  } else {
    return product.Precio
  }
}
