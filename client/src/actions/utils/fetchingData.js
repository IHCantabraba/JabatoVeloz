/* devuelve una funcion fetch genérica  */
const fetchingData = async (
  { url, method = 'POST', token = '', body = null },
  dispatch
) => {
  const headers = token
    ? { 'Content-Type': 'application/json', authentication: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' }
  body = body ? { body: JSON.stringify(body) } : {}
  try {
    const response = await fetch(url, { method, headers, ...body })
    const data = await response.json()
    if (response.ok) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'succesfully login!'
        }
      })
    }
    return data
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: error.message }
    })
    console.log(error.message)
    return null
  }
}
export default fetchingData
