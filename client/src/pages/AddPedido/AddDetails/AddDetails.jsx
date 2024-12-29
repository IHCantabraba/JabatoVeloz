import { FormControl, Stack } from '@mui/material'
import React from 'react'
import { useValue } from '../../../context/ContextProvider'
import InfoField from '../AddDetails/InfoFIeld'
const AddDetails = () => {
  const {
    state: {
      details: { title, description }
    },
    dispatch
  } = useValue()
  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 }
      }}
    >
      <FormControl></FormControl>
      <InfoField
        mainProps={{ name: 'title', label: 'Title', value: title }}
        minLength={5}
      ></InfoField>
      <InfoField
        mainProps={{
          name: 'description',
          label: 'Description',
          value: description
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      ></InfoField>
    </Stack>
  )
}

export default AddDetails
