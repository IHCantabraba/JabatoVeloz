const AppManagerReducer = (state, action) => {
  switch (action.type) {
    /* abrir cerrar el componente Login */
    case 'OPEN_LOGIN':
      return { ...state, login: { openLogin: true } }
    case 'CLOSE_LOGIN':
      return { ...state, login: { openLogin: false } }

    /* cambio de temas en la app */
    case 'TOGGLE_THEME':
      return { ...state, theme: { light: !state.theme.light } }

    /* habilitar o no el botón del filtro en el navBar */
    case 'SHOW_FILTERS':
      localStorage.setItem('showFilter', 'true')
      return { ...state, productPage: true }
    case 'HIDE_FILTERS':
      localStorage.setItem('showFilter', 'false')
      return { ...state, productPage: false }

    /* alerts */
    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload }

    /* usuario logueado es admin o no */
    case 'IS_ADMIN':
      localStorage.setItem('isAdmin', 'true')
      return { ...state, isAdmin: true }
    case 'NOT_ADMIN':
      localStorage.setItem('isAdmin', 'false')
      return { ...state, isAdmin: false }
    /* show hide theme Switcher */
    case 'SHOW_THEME_SWITCHER':
      return { ...state, showThemes: true }
    case 'HIDE_THEME_SWITCHER':
      return { ...state, showThemes: false }
    /* default */
    default:
      return state
  }
}

export default AppManagerReducer
