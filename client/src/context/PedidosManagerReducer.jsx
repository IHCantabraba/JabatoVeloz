const PedidosManagerReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PEDIDOS':
      return { ...state, pedidos: action.payload }
    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } }
    case 'UPDATE_FECHA_PEDIDO':
      return { ...state, FechaPedido: action.payload }
    case 'UPDATE_PEDIDO':
      return { ...state, pedido: action.payload }
    case 'UPDATE_MIROPA':
      return { ...state, miRopa: action.payload }
    case 'UPDATE_OPEN_PEDIDO_STATE':
      return { ...state, OpenPedido: action.payload }
    default:
      return state
  }
}
export default PedidosManagerReducer
