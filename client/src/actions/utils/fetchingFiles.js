/* devuelve una funcion fetch genérica  */
const fetchingFiles = async (
  { url, method = 'POST', token = '', body = null },
  dispatch
) => {
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' }
  body = body ? body : {}
  try {
    const response = await fetch(url, { method, headers, ...body })
    const data = await response.json()
    if (data.success) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'successfully updated user info'
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
export default fetchingFiles
