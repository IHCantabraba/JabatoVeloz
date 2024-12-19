import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const GoogleLogin = () => {
  return (
    <Button
      varinat='outlined'
      startIcon={<Google />}
      sx={{ border: '1px solid lightgrey', borderRadius: '5px' }}
    >
      Log in with Google
    </Button>
  )
}

export default GoogleLogin
