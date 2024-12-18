import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const PasswordField = ({
  passwordReference,
  id = 'password',
  label = 'Password'
}) => {
  const [showPassword, setShowPassword] = useState(false)
  /* controlar el botón de show password or not */
  const handleClick = () => {
    setShowPassword(!showPassword)
  }
  /* evita que el foco se vaya del campo password */
  const handleMouseDown = (e) => {
    e.preventDefault
  }
  return (
    <TextField
      autoFocus
      margin='normal'
      variant='standard'
      id={id}
      label={label}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      inputRef={passwordReference}
      inputProps={{ minLength: 6 }}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default PasswordField
