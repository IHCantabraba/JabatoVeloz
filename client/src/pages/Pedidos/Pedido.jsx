import {
  AppBar,
  Box,
  Container,
  Dialog,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import React from 'react'
import { useValue } from '../../context/ContextProvider'
import { Close } from '@mui/icons-material'
import TablaPedidos from '../../components/TablaPedidos/TablaPedidos'

const Pedido = () => {
  const {
    state: { pedido, light },
    dispatch
  } = useValue()

  const handleClose = () => {
    dispatch({ type: 'UPDATE_PEDIDO', payload: null })
  }
  const cantidadTotal = () => {
    let total = 0
    pedido?.orders.map((order) => (total += Number(order.precio)))
    return total
  }
  return (
    <Dialog fullScreen open={Boolean(pedido)}>
      {/* cabecera del pedido */}
      <AppBar
        position='relative'
        style={{
          backgroundColor: `var(--ihc-toolbar-${light ? 'light' : 'dark'}-mode)`
        }}
      >
        <Toolbar>
          <Typography variant='h6' component='h3' sx={{ ml: 2, flex: 1 }}>
            {'Creado por ' +
              pedido?.users.alias +
              '. ' +
              'Fecha Estimada: ' +
              pedido?.ExpireDate}
          </Typography>
          <IconButton color='inherit' onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* cuerpo con informacion */}
      <Container
        sx={{
          pt: 5,
          alignContent: 'Center',
          width: '100%'
        }}
      >
        {/* resumen de solicitudes */}
        <Stack
          direction='row'
          sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <Box>
            <Typography variant='h6' component='span'>
              {'Solicitudes: ' + pedido?.orders.length}
            </Typography>
          </Box>
          <Box>
            <Typography variant='h6' component='span'>
              {'Cantidad: ' + cantidadTotal() + ' €'}
            </Typography>
          </Box>
        </Stack>
        {pedido?.orders.length > 0 ? (
          <TablaPedidos pedido={pedido} />
        ) : (
          <Typography
            sx={{
              mt: 5,
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
            variant='h5'
          >
            Aún no hay ninguna orden de compra
          </Typography>
        )}
      </Container>
    </Dialog>
  )
}

export default Pedido
