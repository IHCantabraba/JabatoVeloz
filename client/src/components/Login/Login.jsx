import { Dialog } from '@mui/material'
import { useValue } from '../../context/ContextProvider'

const Login = () => {
  const {
    state: { openLogin },
    dispatch
  } = useValue()

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' })
  }
  return <Dialog open={openLogin} onClose={handleClose}></Dialog>
}

export default Login
