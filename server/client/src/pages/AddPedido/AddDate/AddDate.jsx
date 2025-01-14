import { Stack } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import PedidoDate from './PedidoDate'

const AddDate = () => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 }
      }}
    >
      <PedidoDate />
    </Stack>
  )
}

export default AddDate
