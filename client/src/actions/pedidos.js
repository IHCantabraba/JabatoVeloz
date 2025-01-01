import { extractDaysOf } from '../pages/Pedidos/utlis/extractDaysOff'
import fetchingData from './utils/fetchingData'
const baseUrl = import.meta.env.VITE_BaseName
export const createPedido = async (pedido, currentUser, dispatch, setPage) => {
  dispatch({ type: 'START_LOADING' })
  const result = await fetchingData(
    {
      url: `${baseUrl}/api/pedidos/pedido`,
      body: pedido,
      token: currentUser.result.token
    },
    dispatch
  )

  if (result.success) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'Pedido añadido correctamente'
      }
    })
    dispatch({ type: 'RESET_PEDIDO' })
    setPage(2)
  }
  dispatch({ type: 'END_LOADING' })
}
export const getPedidos = async (dispatch) => {
  dispatch({ type: 'START_LOADING' })
  /* TODO use fetching data funcion */
  const result = await fetchingData(
    { url: `${baseUrl}/api/pedidos`, method: 'GET' },
    dispatch
  )
  const handleExpirationDate = (pedido) => {
    extractDaysOf(pedido)
  }

  if (result.success) {
    result.result.map((pedido) => {
      handleExpirationDate(pedido)
    })
    dispatch({ type: 'UPDATE_PEDIDOS', payload: result.result })
    dispatch({ type: 'END_LOADING' })
  }
  return result
}
