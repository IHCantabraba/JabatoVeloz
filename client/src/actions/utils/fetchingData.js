/* devuelve una funcion fetch genérica  */
const fetchingData = async (
  { url, method = 'POST', token = '', body = null },
  dispatch
) => {
  const headers = token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' }
  body = body ? { body: JSON.stringify(body) } : {}
  try {
    const response = await fetch(url, { method, headers, ...body })
    const data = await response.json()

    if (!data.success) {
      if (response.status === 401)
        dispatch({ type: 'UPDATE_USER', payload: null })
      throw new Error(data.message)
    }
    if (data.success) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: data.message
        }
      })
    }
    return data
  } catch (error) {
    let msg = ''
    if (error.message === 'jwt expired') {
      msg = 'Sesion caducada'
    } else {
      msg = error.message
    }
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: msg }
    })
    console.log(error.message)
    dispatch({ type: 'END_LOADING' })
    return null
  }
}
export default fetchingData
