import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Slide,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import React, { forwardRef, useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import { Close, Send, Star } from '@mui/icons-material'
import { getPedidos } from '../../actions/pedidos'

const Product = () => {
  const [selectedTalla, setSelectedTalla] = useState('')
  const [selectedPedido, setSelectedPedido] = useState('')
  /* definir transición para abrir la página */
  const Transition = forwardRef((props, ref) => {
    return <Slide direction='up' {...props} ref={ref} />
  })
  /* close product page function */
  const handleClose = () => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: null })
    setSelectedTalla('')
    setSelectedPedido('')
  }
  const handleSubmit = () => {
    e.preventDefault()
    /*TODO fetch order to pedido */
    setSelectedPedido('')
    setSelectedTalla('')
  }
  const {
    state: { product, light, pedidos },
    dispatch
  } = useValue()
  const filterPedidos = (pedidos) => {
    if (pedidos) {
      pedidos = pedidos.filter((pedido) => pedido.daysOff > 0)
    } else {
      return pedidos
    }
    return pedidos
  }
  const PedidosFiltrados = filterPedidos(pedidos)
  const Foto = [
    `./clothesPics/${product?.Foto ? product.Foto : 'NoPic.jpg'}
  `,
    `./clothesPics/${product?.Foto ? product.Foto : 'NoPic.jpg'}`
  ]
  const Tallas = product?.Tallas.split(' ')
  const handleChangeTalla = (e) => {
    setSelectedTalla(e.target.value)
  }
  const handleChangePedido = (e) => {
    setSelectedPedido(e.target.value)
  }
  return (
    <Dialog
      fullScreen
      open={Boolean(product)}
      onClose={handleClose}
      // TransitionComponent={Transition}
    >
      <AppBar
        position='relative'
        style={{
          backgroundColor: `var(--ihc-toolbar-${light ? 'light' : 'dark'}-mode)`
        }}
      >
        <Toolbar>
          <Typography variant='h6' component='h3' sx={{ ml: 2, flex: 1 }}>
            {product?.Nombre}
          </Typography>
          <IconButton color='inherit' onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <img
        src={Foto[0]}
        style={{
          maxWidth: '350px',
          maxHeight: '300px',
          alignSelf: 'center',
          marginTop: '10px'
        }}
      />
      <Container
        sx={{
          pt: 5,
          alignContent: 'Center',
          width: '100%'
        }}
      >
        <Stack sx={{ p: 3 }} spacing={2}>
          {/* añadir una fila */}
          <Stack
            direction='row'
            sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
          >
            <Box>
              <Typography variant='h6' component='span'>
                {'Precio  ' + product?.Precio + '€'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6' component='span'>
                {'Valoracion: '}
                <Rating
                  defaultValue={3.5}
                  precision={0.5}
                  emptyIcon={<Star />}
                />
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction='row'
            sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
          >
            <Box>
              <Typography variant='h6' component='spam'>
                {'Descripcion  '}
              </Typography>
              <Typography component='spam'>{product?.Descripcion}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6' component='span'>
                {'Tallas: ' + product?.Tallas}
              </Typography>
            </Box>
          </Stack>
          <Stack>
            <Box>
              <Typography variant='h6' component='span'>
                {'Para pedir producto, '}
              </Typography>
              <Typography>
                {'Selecciona una talla y fecha de un pedido disponible: '}
              </Typography>
              <Stack
                direction='row'
                sx={{
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  mt: 5
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                  {/* seleccionar talla */}
                  <FormControl>
                    <InputLabel id='tallas-label'>Tallas</InputLabel>
                    <Select
                      labelId='tallas-label'
                      value={selectedTalla}
                      label='Tallas'
                      onChange={handleChangeTalla}
                      sx={{ minWidth: '85px' }}
                    >
                      {product &&
                        Tallas.map((talla) => (
                          <MenuItem value={talla}>{talla}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {/* selecionar pedido */}
                  <FormControl>
                    <InputLabel id='pedido-label'>Fecha Pedido</InputLabel>
                    <Select
                      value={selectedPedido}
                      labelId='pedido-label'
                      label='Fecha Pedido'
                      onChange={handleChangePedido}
                      autoWidth
                      sx={{ minWidth: '150px' }}
                    >
                      {PedidosFiltrados
                        ? PedidosFiltrados.map((pedido) => (
                            <MenuItem value={pedido._id}>
                              {pedido.ExpireDate}
                            </MenuItem>
                          ))
                        : 'No hay pedidos actualmente'}
                    </Select>
                  </FormControl>
                </div>
                {/* habilitar botón */}
                {selectedTalla !== '' && selectedPedido && (
                  <Button
                    variant='contained'
                    sx={{ backgroundColor: 'green' }}
                    endIcon={<Send />}
                    onClick={handleSubmit}
                  >
                    Solicitar
                  </Button>
                )}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  )
}
export default Product
