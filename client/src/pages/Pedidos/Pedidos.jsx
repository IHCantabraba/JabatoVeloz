import { Alert, AlertTitle, Button, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useValue } from '../../context/ContextProvider'
import { getPedidos } from '../../actions/pedidos'

const Pedidos = () => {
  const {
    state: { pedidos, isAdmin },
    dispatch
  } = useValue()
  useEffect(() => {
    getPedidos(dispatch)
  }, [])

  return (
    <Container sx={{ py: 5, mb: 4 }}>
      {pedidos?.length > 0 ? (
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
                Pedir Ropa
              </Button>
            )}
            {isAdmin && (
              <Button
                variant='outlined'
                sx={{ ml: 2, placeSelf: 'self-end' }}
                onClick={() => {
                  console.log(pedido)
                  dispatch({ type: 'UPDATE_PEDIDO', payload: pedido })
                }}
              >
                Ver Detalles
              </Button>
            )}
          </Alert>
        ))
      ) : (
        <Typography
          sx={{
            mt: 5,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
          variant='h4'
        >
          No hay pedidos habiertos
        </Typography>
      )}
    </Container>
  )
}

export default Pedidos
