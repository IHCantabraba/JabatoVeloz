const Reducer = (state, action) => {
  switch (action.type) {
    /* permite añadir info una vez logueado */
    case 'UPDATE_USER':
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

    default:
      throw new Error('No matched action!')
  }
}

export default Reducer
