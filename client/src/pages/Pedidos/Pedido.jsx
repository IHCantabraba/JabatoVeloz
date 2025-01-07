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
            {'Pedido creado por ' +
              pedido?.users.alias +
              ' ' +
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
        {/* detalle de cada solicitud */}
        {/* <Stack
          direction='column'
          sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <Stack
            direction='row'
            sx={{ justifyContent: 'space-around', flexWrap: 'wrap' }}
          >
            <Box varinat='h4' component='h4'>
              {'Miembro'}
            </Box>
            <Box varinat='h4' component='h4'>
              {'Artículo'}
            </Box>
            <Box varinat='h4' component='h4'>
              {'Talla'}
            </Box>
            <Box varinat='h4' component='h4'>
              {'Cantidad'}
            </Box>
          </Stack>
          {pedido?.orders.map((order) => (
            <Stack
              direction='row'
              sx={{ justifyContent: 'space-around', flexWrap: 'wrap' }}
            >
              <Box varinat='h4' component='span'>
                {'Miembro: ' + order.users.alias
                  ? order.users.alias
                  : order.users.nombre}
              </Box>
              <Box varinat='h4' component='span'>
                {'Artículo: ' + order.productos.Nombre}
              </Box>
              <Box varinat='h4' component='span'>
                {'Talla: ' + order.talla}
              </Box>
              <Box varinat='h4' component='span'>
                {'Cantidad: ' + order.unidades}
              </Box>
            </Stack>
          ))}
            
        </Stack> */}
        <TablaPedidos pedido={pedido} />
      </Container>
    </Dialog>
  )
}

export default Pedido
