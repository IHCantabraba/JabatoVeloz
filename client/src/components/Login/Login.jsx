import {
  Avatar,
  Button,
  Container,
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
import handleLogin, { handleRegister } from '../../actions/user'
import CustomDate from '../CustomDate/CustomDate'

// import FileUpload from '../FileUpload/FileUpload'
const BaseUrl = import.meta.env.VITE_BaseName
const Login = () => {
  /* obetner estado inicial de nuestro custom hook y el dispatcher para cambair estados */
  /* el Login se va a habrir desde varios sitios por lo que se necesita controlar el estadp con una variable"openLogin" y el dispatch para cerrarlo  */
  const {
    state: { openLogin, light },
    dispatch
  } = useValue()

  /* login and register se usa el mismo modelo por lo que usaremos estado para cambair entre ellos */
  const [title, setTitle] = useState('Login')
  const [isRegister, setIsRegister] = useState(false)
  /* Crear referencias de los campos del formulario */
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const dniRef = useRef()
  const apellidosRef = useRef()
  const aliasRef = useRef()
  const birthDateRef = useRef()

  /* funcion para cerrar */
  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' })
  }

  /* testing login and register requests */
  /* controlar el formulario */
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const password = passwordRef.current.value
    if (isRegister) {
      const email = emailRef.current.value
      const apellidos = apellidosRef.current.value
      const dni = dniRef.current.value
      const alias = aliasRef.current.vale
      const confirmPassword = confirmPasswordRef.current.value
      const birthdate = birthDateRef.current.value

      if (password === confirmPassword) {
        handleRegister(
          {
            nombre: name,
            apellidos: apellidos,
            alias: alias,
            dni: dni,
            email: email,
            password: password,
            birthDate: birthdate
          },
          dispatch
        )
      } else {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'error',
            message: 'passwords do not match'
          }
        })
      }
    } else {
      handleLogin({ nombre: name, password: password }, dispatch)
    }
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
              margin='normal'
              variant='standard'
              id='apellidos'
              label='Surname'
              type='text'
              fullWidth
              inputRef={apellidosRef}
              required
            />
          )}
          {isRegister && (
            <TextField
              margin='normal'
              variant='standard'
              id='alias'
              label='Alias'
              type='text'
              fullWidth
              inputRef={aliasRef}
              required
            />
          )}
          {isRegister && (
            <CustomDate propRef={birthDateRef} labelProp='Start Date' />
          )}
          {isRegister && (
            <TextField
              margin='normal'
              variant='standard'
              id='dni'
              label='DNI/NIE'
              type='text'
              fullWidth
              inputRef={dniRef}
              required
            />
          )}
          {isRegister && (
            <TextField
              /* si no esta registrado el focus lo hacemos al mail */
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
      {/* <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
        <GoogleOneTapLogin sx={{ cursor: 'not-allowed' }} />
      </DialogActions> */}
    </Dialog>
  )
}

export default Login
