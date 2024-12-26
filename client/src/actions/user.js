import fetchingData from './utils/fetchingData.js'

const baseUrl = import.meta.env.VITE_BaseName
export const handleRegister = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' })

  const result = await fetchingData(
    { url: `${baseUrl}/api/auth/register`, body: user },
    dispatch
  )
  if (result.success) {
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
        message: result.message
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
  if (result.success) {
    dispatch({ type: 'UPDATE_USER', payload: result })
    dispatch({ type: 'CLOSE_LOGIN' })
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'succesfully login'
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

export const UpdateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: 'START_LOADING' })
  const { name, file } = updatedFields
  let body = { nombre: name }
  const data = new FormData()
  data.append('nombre', name)
  if (file) {
    console.log('adding file')
    data.append('img', file)
    body = { ...body, img: file }
  }
  try {
    const result = await fetch(
      `${baseUrl}/api/users/${currentUser.result.user._id}`,
      {
        headers: { Authorization: `Bearer ${currentUser.result.token}` },
        method: 'POST',
        body: data
      }
    )
    const response = await result.json()
    if (result.ok) {
      console.log(response.result.img)
      /* TODO actualziar el avatar */
    }
  } catch (error) {
    console.log(error)
  }
  // const result = await fetchingData(
  //   {
  //     url: `${baseUrl}/api/users/${currentUser.result.user._id}`,
  //     method: 'POST',
  //     token: currentUser.result.token,
  //     body: data
  //   },
  //   dispatch
  // )
  dispatch({ type: 'END_LOADING' })
}
export default handleLogin
