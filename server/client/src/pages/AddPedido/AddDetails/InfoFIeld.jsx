import { Avatar, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useValue } from '../../../context/ContextProvider'
import pendingIcon from './Icons/progress1.svg'
import CheckIcon from '@mui/icons-material/Check'
/* variable para limpiar el timer antes de crear uno nuevo*/
/* este timer sirve para comprobar si el usuario sigue escribiendo */
let timer

const InfoFIeld = ({ mainProps, optionalProps = {}, minLength }) => {
  /* importar el dispatcher */
  const { dispatch } = useValue()
  /* user typping */
  const [editing, setEditing] = useState(false)
  /* error length */
  const [error, setError] = useState(false)
  /* success length */
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    /* actualizar la variable global "details" */
    dispatch({
      type: 'UPDATE_DETAILS',
      payload: { [e.target.name]: e.target.value }
    })
    /* cambiar el estado editando a true */
    if (!editing) setEditing(true)
    /* eliminar timer */
    clearTimeout(timer)
    /* crear nuevo que se comprueba cada segundo */
    timer = setTimeout(() => {
      /* pasado un segundo cambiar el estado */
      setEditing(false)
      /* comprobar si el texto cumple la longitud mínima */
      if (e.target.value.length < minLength) {
        /* si no cumple longitud. activar error y no activar exito  */
        if (!error) setError(true)
        if (success) setSuccess(false)
        /* caso contrario */
      } else {
        if (error) setError(false)
        if (!success) setSuccess(true)
      }
    }, 1000)
  }
  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      error={error}
      helperText={error && `This field must be ${minLength}`}
      color={success ? 'success' : 'primary'}
      variant='outlined'
      onChange={handleChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            {editing ? (
              <Avatar src={pendingIcon} sx={{ height: 70 }} />
            ) : (
              success && <CheckIcon color='success' />
            )}
          </InputAdornment>
        )
      }}
    />
  )
}

export default InfoFIeld
