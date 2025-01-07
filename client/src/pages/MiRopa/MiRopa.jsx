import React from 'react'
import { useValue } from '../../context/ContextProvider'
import { Box, Container, Stack, Typography } from '@mui/material'
import { TablaRopa } from '../../components/TablaRopa/TablaRopa'

const MiRopa = () => {
  const {
    state: { miRopa }
  } = useValue()
  return (
    <Container sx={{ py: 5, mb: 4 }}>
      <Stack>
        <Box>
          <Typography variant='h4' component='span'>
            Ropa solicitada
          </Typography>
        </Box>
      </Stack>
      {miRopa?.orders.length > 0 ? (
        <TablaRopa userOrders={miRopa} />
      ) : (
        <Typography variant='h4' component='span'>
          No hay ropa solicitada
        </Typography>
      )}
    </Container>
  )
}

export default MiRopa
