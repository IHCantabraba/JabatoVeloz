const SeriegrafiaManagerReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SERIEGRAFIA':
      return { ...state, seriegrafia: action.payload }
    case 'UPDATE_SERIEGRAFIAS':
      return { ...state, AvaliableSeriegrafia: action.payload }
    default:
      return state
  }
}
export default SeriegrafiaManagerReducer
