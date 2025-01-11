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

export const getUserOrders = async (dispatch, userId, token) => {
  dispatch({ type: 'START_LOADING' })

  const result = await fetchingData(
    {
      url: `${baseUrl}/api/users/${userId}`,
      method: 'GET',
      token: token
    },
    dispatch
  )
  if (result.success) {
    dispatch({ type: 'UPDATE_MIROPA', payload: result.result })
    console.log(result.result)
  }
  dispatch({ type: 'END_LOADING' })
}

export const updateOrder = async (dispatch, order, userId, token) => {
  dispatch({ type: 'START_LOADING' })
  const result = await fetchingData(
    {
      url: `${baseUrl}/api/orders/${order._id}`,
      method: 'POST',
      token: token
    },
    dispatch
  )

  if (result.success) {
    /* TODO create a paidOrder */
    dispatch({ type: 'UPDATE_PRENDA', payload: result.result })
    /* una vez que esta variable global cambie se debe renderizar de nuevo las ordenes del usuairo */
  }
  const userOrders = await fetchingData(
    {
      url: `${baseUrl}/api/users/${userId}`,
      method: 'GET',
      token: token
    },
    dispatch
  )
  if (userOrders.success) {
    dispatch({ type: 'UPDATE_MIROPA', payload: userOrders.result })
    console.log(userOrders.result)
  }
  dispatch({ type: 'END_LOADING' })
}

/* TODO delete order */
