const ProductManagerReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT_IN_LIST':
      const { _id, Puntuacion } = action.payload
      const productos = state.productos.map((producto) => {
        if (producto._id !== _id) {
          return producto
        }
        return { ...producto, Puntuacion: Puntuacion }
      })
      return {
        ...state,
        productos: productos,
        filterProducts: productos
      }
    case 'UPDATE_PRODUCTOS':
      return {
        ...state,
        productos: action.payload,
        priceFilter: 100,
        filterProducts: action.payload
      }
    case 'FILTER_PRICE':
      return {
        ...state,
        priceFilter: action.payload,
        filterProducts: applyFilter(state.productos, action.payload)
      }
    /* actualizar productos cuando se elimina uno */
    case 'PRODUCTO_ELIMINADO':
      return { ...state, productoEliminado: action.payload }
    /* para abrir detalles de producto */
    case 'UPDATE_PRODUCT':
      return { ...state, product: action.payload }

    case 'UPDATE_NEW_PROD_PHOTO':
      return { ...state, newProductPhoto: action.payload }
    case 'UPDATE_CATEGORIAS':
      return { ...state, Categorias: action.payload }
    case 'UPDATE_GENEROS':
      return { ...state, Generos: action.payload }
    case 'UPDATE_TALLAS':
      return { ...state, Tallas: action.payload }
    default:
      return state
  }
}

export default ProductManagerReducer

/* price filtering */
const applyFilter = (productos, price) => {
  let filterProducts = productos
  if (price < 100) {
    filterProducts = filterProducts.filter(
      (producto) => producto.Precio <= price
    )
  }
  return filterProducts
}
