import { CheckBox } from '@mui/icons-material'
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material'
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
const DropDownMultiple = ({
  name,
  register,
  value,
  handler,
  formState,
  selections
}) => {
  console.log(value)
  console.log(value.includes('xs'))
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
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        multiple
      >
        {selections &&
          selections.map((selection) => (
            <MenuItem
              sx={{ backgroundColor: 'white' }}
              key={selection}
              value={selection}
            >
              <CheckBox checked={value.includes(selection)} />
              <ListItemText primary={selection} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default DropDownMultiple
