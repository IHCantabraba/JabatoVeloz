import React from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useValue } from '../../context/ContextProvider'
const Notis = () => {
  const {
    state: { alert },
    dispatch
  } = useValue()
  /* controlar el cierre si es po clicki en la X o en cualquier lado de la pantalla */
  const handleClose = (event, reason) => {
    /* si se hace clic fuera no se cierra  */
    if (reason === 'clickaway') return
    /* resto de casos cierra cambiando el estado inicial */
    dispatch({ type: 'UPDATE_ALERT', payload: { ...alert, open: false } })
  }
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        sx={{ width: '100%' }}
        variant='filled'
        elevation={6}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

export default Notis
