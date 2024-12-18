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
import { useRef, useState } from 'react'

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
  /* funcion para cerrar */
  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' })
  }
  /* controlar el formulario */
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  /* Crear referencias de los campos del formulario */
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
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
          {isRegister && (
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
          )}
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
        <DialogActions>
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
    </Dialog>
  )
}

export default Login
