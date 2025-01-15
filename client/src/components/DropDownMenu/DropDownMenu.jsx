import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { CustomProps } from '../utils/CustomProps'

const DropDownMenu = ({
  name,
  register,
  value,
  handler,
  formState,
  selections
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={name}>{name}</InputLabel>
      <Select
        {...register(name, {
          required: true,
          message: `Selecciona una ${name}`
        })}
        error={!!formState.errors[name]}
        labelId={name}
        value={value}
        label={name}
        nombre={name}
        id={name}
        onChange={handler}
        MenuProps={CustomProps}
        defaultValue
      >
        {selections &&
          selections.map((categoria) => (
            <MenuItem
              sx={{ backgroundColor: 'white' }}
              key={categoria}
              value={categoria}
            >
              {categoria}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default DropDownMenu
