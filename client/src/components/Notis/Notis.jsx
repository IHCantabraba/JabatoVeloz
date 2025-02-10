import React from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useValue } from '../../context/ContextProvider'
const Notis = () => {
  const {
    state: { appManager },
    dispatch
  } = useValue()
  /* controlar el cierre si es po clicki en la X o en cualquier lado de la pantalla */
  const handleClose = (event, reason) => {
    /* si se hace click fuera no se cierra  */
    if (reason === 'clickaway') return
    /* resto de casos cierra cambiando el estado inicial */
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { ...appManager.alert, open: false }
    })
  }
  return (
    <Snackbar
      open={appManager?.alert.open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={appManager?.alert.severity}
        sx={{ width: '100%' }}
        variant='filled'
        elevation={6}
      >
        {appManager?.alert.message}
      </Alert>
    </Snackbar>
  )
}

export default Notis
