import { Alert, AlertTitle, Button, Container } from '@mui/material'
import React from 'react'
import { getPedidos } from '../../actions/pedidos'
import { useValue } from '../../context/ContextProvider'

const Pedidos = () => {
  const { dispatch } = useValue()
  const pedidos = getPedidos(dispatch)
  return (
    <Container sx={{ py: 5 }}>
      <Alert severity='success' variant='outlined'>
        <AlertTitle>{pedidos.result.title}</AlertTitle>
        {pedidos.result.description}
        <Button
          variant='outlined'
          sx={{ ml: 2 }}
          onClick={() => console.log('clicked')}
        >
          Request Clothes
        </Button>
      </Alert>
    </Container>
  )
}

export default Pedidos
