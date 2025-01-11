import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

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
        MenuProps={MenuProps}
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
