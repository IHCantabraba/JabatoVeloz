import fetchingData from './utils/fetchingData.js'

const baseUrl = import.meta.env.VITE_BaseName
export const handleRegister = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' })

  const result = await fetchingData(
    { url: `${baseUrl}/api/auth/register`, body: user },
    dispatch
  )
  if (result.ok) {
    dispatch({ type: 'CLOSE_LOGIN' })
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'Registration successfully created!'
      }
    })
  } else {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: result
      }
    })
  }
  dispatch({ type: 'END_LOADING' })
}
const handleLogin = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' })

  const result = await fetchingData(
    { url: `${baseUrl}/api/auth/login`, body: user },
    dispatch
  )
  console.log(result)
  if (result.success) {
    dispatch({ type: 'UPDATE_USER', payload: result })
    dispatch({ type: 'CLOSE_LOGIN' })
  } else {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: result.message
      }
    })
  }
  dispatch({ type: 'END_LOADING' })
}
export default handleLogin
