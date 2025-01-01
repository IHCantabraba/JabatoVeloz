import { Alert, AlertTitle, Button, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useValue } from '../../context/ContextProvider'
import { getPedidos } from '../../actions/pedidos'

const Pedidos = () => {
  const {
    state: { pedidos },
    dispatch
  } = useValue()
  useEffect(() => {
    getPedidos(dispatch)
  }, [])

  return (
    <Container sx={{ py: 5, mb: 4 }}>
      {pedidos &&
        pedidos.map((pedido) => (
          <Alert
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}
            severity={pedido.severity}
            variant='outlined'
          >
            <AlertTitle>{pedido.title}</AlertTitle>
            {pedido.description}

            {` Este pedido se cerrará el ${pedido.ExpireDate}. Aún quedan ${pedido.daysOff} para solicitar ropa`}
            {pedido.daysOff > 0 && (
              <Button
                variant='outlined'
                sx={{ ml: 2, placeSelf: 'self-end' }}
                onClick={() => console.log('clicked')}
              >
                Request Clothes
              </Button>
            )}
          </Alert>
        ))}
    </Container>
  )
}

export default Pedidos
