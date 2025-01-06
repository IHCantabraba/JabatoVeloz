import fetchingData from './utils/fetchingData'
const baseUrl = import.meta.env.VITE_BaseName
export const createOrder = async (dispatch, body) => {
  dispatch({ type: 'START_LOADING' })

  const result = await fetchingData(
    {
      url: `${baseUrl}/api/orders/order`,
      body: body
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
  }
  dispatch({ type: 'END_LOADING' })
}
