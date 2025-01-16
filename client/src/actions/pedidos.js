import { extractDaysOf } from '../pages/Pedidos/utlis/extractDaysOff'
import fetchingData from './utils/fetchingData'
import { filterPedidos } from './utils/filterPedidos'
const baseUrl = import.meta.env.VITE_BaseName
export const createPedido = async (pedido, currentUser, dispatch, setPage) => {
  dispatch({ type: 'START_LOADING' })
  const result = await fetchingData(
    {
      url: `https://jabato-veloz-backend.vercel.app/api/pedidos/pedido`,
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
    /* redirigir a la página */
    setPage(1)
  }
  dispatch({ type: 'END_LOADING' })
}
export const getPedidos = async (dispatch) => {
  dispatch({ type: 'START_LOADING' })
  const result = await fetchingData(
    {
      url: `https://jabato-veloz-backend.vercel.app/api/pedidos`,
      method: 'GET'
    },
    dispatch
  )
  /* filtrar pedidos que tengan fecha vencida */
  if (result.success) {
    result.result.map((pedido) => {
      extractDaysOf(pedido)
    })
    const PedidosFiltrados = filterPedidos(result.result)
    dispatch({ type: 'UPDATE_PEDIDOS', payload: PedidosFiltrados })
    dispatch({ type: 'END_LOADING' })
  }
  return result
}
export const closePedido = async (pedido, currentUser, dispatch) => {
  dispatch({ type: 'START_LOADING' })
  const result = await fetchingData(
    {
      url: `https://jabato-veloz-backend.vercel.app/api/pedidos/pedido/${pedido._id}`,
      method: 'POST',
      token: currentUser?.result.token
    },
    dispatch
  )
  if (result.success) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'Pedido cerrado correctamente'
      }
    })
    dispatch({
      type: 'UPDATE_OPEN_PEDIDO_STATE',
      payload: false
    })

    dispatch({ type: 'END_LOADING' })
  }
  dispatch({ type: 'END_LOADING' })
}
