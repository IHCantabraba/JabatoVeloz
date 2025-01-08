import React, { useEffect } from 'react'
import { useValue } from '../../context/ContextProvider'
import { Box, Container, Stack, Typography } from '@mui/material'
import { TablaRopa } from '../../components/TablaRopa/TablaRopa'

const MiRopa = () => {
  const {
    state: { miRopa, miPrenda }
  } = useValue()

  /* TODO update info after setting to "paid" a product */
  useEffect(() => {
    console.log('prenda actualizada')
  }, [miPrenda])
  return (
    <Container sx={{ py: 5, mb: 4 }}>
      <Stack>
        <Box>
          <Typography variant='h4' component='span'>
            Ropa solicitada
          </Typography>
        </Box>
      </Stack>
      <Stack sx={{ mt: 5 }}>
        {miRopa?.orders.length > 0 ? (
          <TablaRopa userOrders={miRopa} />
        ) : (
          <Typography variant='h4' component='span'>
            No hay ropa solicitada
          </Typography>
        )}
      </Stack>
      <Stack sx={{ mt: 5 }}>
        <Typography variant='span' component='span'>
          {
            '*el pedido de ropa se realiza cuando se alcance una suma de 600€ entre los pedidos de los integrantes del equipo. La fecha prevista de lanzamiento es aproximada. Ten preparados los euros!!'
          }
        </Typography>
      </Stack>
    </Container>
  )
}

export default MiRopa
