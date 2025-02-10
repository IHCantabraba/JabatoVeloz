const UserManagerReducer = (state, action) => {
  switch (action.type) {
    /* permite añadir info una vez logueado */
    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload))
      return {
        ...state,
        currentUser: action.payload
      }
    /* update profile info */
    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload }
    default:
      return state
  }
}
export default UserManagerReducer
