import fetchingData from './utils/fetchingData.js'

const baseUrl = import.meta.env.VITE_BaseName
export const handleRegister = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' })

  const result = await fetchingData(
    {
      url: `https://jabatoveloz-backend.vercel.app/api/auth/register`,
      body: user
    },
    dispatch
  )
  if (result.success) {
    dispatch({ type: 'CLOSE_LOGIN' })

    handleLogin(
      { nombre: result.result.nombre, password: user.password },
      dispatch
    )
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
        message: result.message
      }
    })
  }
  dispatch({ type: 'END_LOADING' })
}
const handleLogin = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' })
  const result = await fetchingData(
    {
      url: `https://jabatoveloz-backend.vercel.app/api/auth/login`,
      body: user
    },
    dispatch
  )
  if (result.success) {
    dispatch({ type: 'UPDATE_USER', payload: result.result })
    dispatch({ type: 'SHOW_FILTERS' })
    dispatch({ type: 'SHOW_THEME_SWITCHER' })
    if (result.result.user.rol === 'admin') {
      dispatch({ type: 'IS_ADMIN' })
    } else {
      dispatch({ type: 'NOT_ADMIN' })
    }
    dispatch({ type: 'CLOSE_LOGIN' })
  }
  dispatch({ type: 'END_LOADING' })
}

export const UpdateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: 'START_LOADING' })
  const { name, file } = updatedFields

  const data = new FormData()
  data.append('nombre', name)
  if (file) {
    data.append('img', file)
  }
  try {
    const result = await fetch(
      `https://jabatoveloz-backend.vercel.app/api/users/${currentUser.user._id}`,
      {
        headers: { Authorization: `Bearer ${currentUser.token}` },
        method: 'POST',
        body: data
      }
    )
    const response = await result.json()

    currentUser.user.img = response.result.img
    currentUser.user.nombre = response.result.nombre
    if (response.success) {
      dispatch({
        type: 'UPDATE_USER',
        payload: currentUser
      })
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Your profile has been updated successfully'
        }
      })
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: {
          open: false,
          file: null,
          photoURL: response.result.img
        }
      })
    }
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: error.message
      }
    })
  }
  dispatch({ type: 'END_LOADING' })
}
export default handleLogin
