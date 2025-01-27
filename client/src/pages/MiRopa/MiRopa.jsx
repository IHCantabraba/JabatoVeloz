import React, { useEffect } from 'react'
import { useValue } from '../../context/ContextProvider'
import { Box, Container, Stack, Typography } from '@mui/material'
import { TablaRopa } from '../../components/TablaRopa/TablaRopa'

const MiRopa = () => {
  const {
    state: { miRopa, currentUser }
  } = useValue()

  return (
    <Container sx={{ minHeight: '93vh', py: 6, mb: 4 }}>
      <Stack>
        <Box>
          <Typography variant='h4' component='span'>
            {`Ropa solicitada por ${currentUser.user.nombre}`}
          </Typography>
        </Box>
      </Stack>
      <Stack sx={{ mt: 5, justifyContent: 'center', alignItems: 'center' }}>
        {miRopa?.orders.length > 0 ? (
          <TablaRopa userOrders={miRopa} />
        ) : (
          <Typography variant='h4' component='span'>
            No hay ropa solicitada
          </Typography>
        )}
      </Stack>
      {miRopa?.orders.length > 0 && (
        <Stack sx={{ mt: 5 }}>
          <Typography variant='span' component='span'>
            {
              '*el pedido de ropa se realiza cuando se alcance una suma de 600€ entre los pedidos de los integrantes del equipo. La fecha prevista de lanzamiento es aproximada. Ten preparados los euros!!'
            }
          </Typography>
        </Stack>
      )}
    </Container>
  )
}

export default MiRopa
