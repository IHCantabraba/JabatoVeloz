import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material'
import { useValue } from '../../context/ContextProvider'
import { Close, Send } from '@mui/icons-material'
import PasswordField from '../Password/PasswordField'
import { useEffect, useRef, useState } from 'react'
import GoogleOneTapLogin from '../GoogleLogin/GoogleLogin'
const BaseUrl = import.meta.env.VITE_BaseName
const Login = () => {
  /* obetner estado inicial de nuestro custom hook y el dispatcher para cambair estados */
  /* el Login se va a habrir desde varios sitios por lo que se necesita controlar el estadp con una variable"openLogin" y el dispatch para cerrarlo  */
  const {
    state: { openLogin },
    dispatch
  } = useValue()
  const {
    state: { light }
  } = useValue()
  /* login and register se usa el mismo modelo por lo que usaremos estado para cambair entre ellos */
  const [title, setTitle] = useState('Login')
  const [isRegister, setIsRegister] = useState(false)
  /* Crear referencias de los campos del formulario */
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  /* funcion para cerrar */
  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' })
  }

  /* testing login and register requests */
  const handleLogin = async () => {
    const userName = nameRef.current.value
    const pass = passwordRef.current.value
    console.log(userName, pass)
    // if (!isRegister) {
    //   const user = nameRef.current.value
    //   const password = passwordRef.current.value
    //   console.log(user, password)
    // }
    try {
      const fetchResults = await fetch(`${BaseUrl}/api/auth/login`, {
        headers: new Headers({
          'Content-Type': 'Application/json'
        }),
        method: 'POST',
        body: JSON.stringify({ nombre: userName, password: pass })
      })
      if (fetchResults.ok) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            message: 'login succcesfully'
          }
        })
      }
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: `Bad request ${error}`
        }
      })
    }
  }
  /* controlar el formulario */
  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin()
    //testing loading
    // dispatch({ type: 'START_LOADING' })
    // setTimeout(() => {
    //   dispatch({ type: 'END_LOADING' })
    // }, 6000)
    // /* testing NOTIS */
    // const password = passwordRef.current.value
    // const confirmPassword = confirmPasswordRef.current.value
    // if (password !== confirmPassword) {
    //   dispatch({
    //     type: 'UPDATE_ALERT',
    //     payload: {
    //       open: true,
    //       severity: 'error',
    //       message: 'Passwords do not match'
    //     }
    //   })
    // }
  }
  /* ustilizar el hook useEfect para cambiar el título del dialogo entre Login/Register */
  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login')
  }, [isRegister])
  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'grey'
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill you information in the fields below:
          </DialogContentText>
          <TextField
            autoFocus
            margin='normal'
            variant='standard'
            id='name'
            label='Name'
            type='text'
            fullWidth
            inputRef={nameRef}
            inputProps={{ minLength: 2 }}
            required
          />
          {isRegister && (
            <TextField
              /* si no esta registrado el focus lo hacemos al mail */
              autoFocus={!isRegister}
              margin='normal'
              variant='standard'
              id='email'
              label='Email'
              type='email'
              fullWidth
              inputRef={emailRef}
              required
            />
          )}

          {/* añadir campo de password y si estamos en el menu register, añadir el campo password de valdiacion Al primero, solo se le pasa la prop del useRef daod que el resto usa los campos por defecto */}
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id='confirmPassword'
              label='Confirm Password'
            />
          )}
        </DialogContent>
        {/* botton de enviar */}
        <DialogActions sx={{ px: '19px' }}>
          <Button
            type='submit'
            variant='contained'
            endIcon={<Send />}
            sx={{
              bgcolor: light
                ? `var(--ihc-toolbar-light-mode)`
                : `var(--ihc-dark-mode-text)`
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
      {/* añadir un */}
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister
          ? 'Do you have an account? Sig in now'
          : "Don't you have an account yet? Create one now!!"}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
      {/* Log in with google */}
      <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  )
}

export default Login
