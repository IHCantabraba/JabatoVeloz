const Reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, currentUser: action.payload }
    case 'DARK_THEME':
      return { ...state, light: action.payload }
    case 'LIGHT_THEME':
      return { ...state, light: action.payload }
    case 'OPEN_LOGIM':
      return { ...state, openLogin: true }
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false }
    default:
      throw new Error('No matched action!')
  }
}

export default Reducer
