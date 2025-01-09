import { TextField } from '@mui/material'
import React from 'react'

const CustomTextField = ({ nombre, tipo, register, formState }) => {
  return (
    <TextField
      {...register(nombre, {
        required: { value: true, message: 'Obligatorio' }
      })}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            boder: formState.errors[nombre] ? '2px solid red ' : 'none'
          }
        }
      }}
      error={!!formState.errors[nombre]}
      name={nombre}
      margin='normal'
      variant='filled'
      label={nombre}
      id={nombre}
      type={tipo}
      fullWidth
      defaultValue
    />
  )
}

export default CustomTextField
