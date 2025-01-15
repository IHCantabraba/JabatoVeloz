import { CheckBox } from '@mui/icons-material'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material'
import React from 'react'
import { CustomProps } from '../utils/CustomProps'

const DropDownMultiple = ({
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
        renderValue={(selected) => selected.join(', ')}
        MenuProps={CustomProps}
        multiple
        defaultValue
      >
        {selections &&
          selections.map((selection) => (
            <MenuItem
              sx={{ backgroundColor: 'white' }}
              key={selection}
              value={selection}
            >
              <Checkbox
                sx={{ '&.Mui-checked': { color: 'var(--ihc-jV-green)' } }}
                checked={value.includes(selection)}
                size='small'
              />
              <ListItemText primary={selection} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default DropDownMultiple
