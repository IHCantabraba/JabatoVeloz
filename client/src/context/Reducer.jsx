const Reducer = (state, action) => {
  switch (action.type) {
    /* permite añadir info una vez logueado */
    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload))
      return { ...state, currentUser: action.payload }
    /* cambio de temas en la app */
    case 'DARK_THEME':
      return { ...state, light: action.payload }
    case 'LIGHT_THEME':
      return { ...state, light: action.payload }
    /* abrir cerrar el componente Login */
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true }
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false }
    /* loading */
    case 'START_LOADING':
      return { ...state, loading: true }
    case 'END_LOADING':
      return { ...state, loading: false }
    /* Notifications */
    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload }
    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload }
    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } }
    case 'UPDATE_FECHA_PEDIDO':
      return { ...state, FechaPedido: action.payload }
    /* usuario logueado es admin o no */
    case 'IS_ADMIN':
      localStorage.setItem('isAdmin', 'true')
      return { ...state, isAdmin: true }
    case 'NOT_ADMIN':
      localStorage.setItem('isAdmin', 'false')
      return { ...state, isAdmin: false }
    case 'UPDATE_PEDIDOS':
      return { ...state, pedidos: action.payload }
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
    /* habilitar o no el botón del filtro en el navBar */
    case 'SHOW_FILTERS':
      return { ...state, productPage: true }
    case 'HIDE_FILTERS':
      return { ...state, productPage: false }
    /* show hide theme Switcher */
    case 'SHOW_THEME_SWITCHER':
      return { ...state, showThemes: true }
    case 'HIDE_THEME_SWITCHER':
      return { ...state, showThemes: false }
    /* reset panel pedido despues de crear uno */
    case 'RESET_PEDIDO':
      return {
        ...state,
        FechaPedido: '',
        details: { title: '', description: '' }
      }
    /* para abrir detalles de producto */
    case 'UPDATE_PRODUCT':
      return { ...state, product: action.payload }
    /* para abrir detalles de pedido */
    case 'UPDATE_PEDIDO':
      return { ...state, pedido: action.payload }
    case 'UPDATE_MIROPA':
      return { ...state, miRopa: action.payload }
    default:
      throw new Error('No matched action!')
  }
}

export default Reducer

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
