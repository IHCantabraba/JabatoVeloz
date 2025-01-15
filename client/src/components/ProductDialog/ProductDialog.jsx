import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Select,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useState } from 'react'

import { Close, Send, Star } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import { createOrder } from '../../actions/orders'
import { calculatePrecio } from './utils/calcularPrecio'
import { obtenerCategoria } from './utils/obtenerCategoria'

const ProductDialog = () => {
  const {
    state: {
      product,
      light,
      pedidos,
      currentUser,
      seriegrafia,
      AvaliableSeriegrafia
    },
    dispatch
  } = useValue()
  const [selectedTalla, setSelectedTalla] = useState('')
  const [selectedPedido, setSelectedPedido] = useState('')
  const [cantidad, setCantidad] = useState(1)
  const [SelectedSeriegrafia, setSelectedSeriegrafia] = useState(
    seriegrafia ? 1 : 0
  )

  /* definir transición para abrir la página */
  /* TOOD averiguar porqué afecta a los clicks tras cerrar una vez */
  // const Transition = forwardRef((props, ref) => {
  //   return <Slide direction='up' {...props} ref={ref} />
  // })

  /* close product page function */
  const handleClose = () => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: null })
    setSelectedTalla('')
    setSelectedPedido('')
    setSelectedSeriegrafia(0)
    dispatch({ type: 'UPDATE_SERIEGRAFIA', payload: null })

    setCantidad(1)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      users: currentUser.result.user._id,
      productos: product._id,
      talla: selectedTalla,
      pedidos: selectedPedido,
      unidades: cantidad,
      precio:
        calculatePrecio(product, seriegrafia, AvaliableSeriegrafia) *
        Number(cantidad),
      seriegrafia: seriegrafia
    }
    createOrder(dispatch, body)
    setSelectedPedido('')
    setSelectedTalla('')
    setCantidad('1')
    setSelectedSeriegrafia(0)
    dispatch({ type: 'UPDATE_PRODUCT', payload: null })
    dispatch({ type: 'UPDATE_SERIEGRAFIA', payload: null })
  }

  const Tallas = product?.Tallas.split(' ')
  const handleChangeTalla = (e) => {
    setSelectedTalla(e.target.value)
    console.log(selectedTalla)
  }
  const handleChangePedido = (e) => {
    setSelectedPedido(e.target.value)
  }
  const handleAmountChange = (e) => {
    setCantidad(e.target.value)
  }
  const handleSeriegrafia = (e) => {
    setSelectedSeriegrafia(e.target.value)
    // if (Number(e.target.value) === 1) {
    //   dispatch({
    //     type: 'UPDATE_SERIEGRAFIA',
    //     payload: currentUser.result.user.alias
    //   })
    // } else {
    //   dispatch({ type: 'UPDATE_SERIEGRAFIA', payload: false })
    // }
  }
  const handleInputSeriegrafia = (e) => {
    dispatch({ type: 'UPDATE_SERIEGRAFIA', payload: e.target.value })
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
        src={product?.img}
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
          {/* añadir una fila con precio y valoracion*/}
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
          {/* añadir una fila con Descripcion y tallas*/}
          <Stack
            direction='row'
            sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
          >
            <Box>
              <Typography variant='h6' component='span'>
                {'Descripcion  '}
              </Typography>
              <Typography component='span'>{product?.Descripcion}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6' component='span'>
                {'Tallas: ' + product?.Tallas}
              </Typography>
            </Box>
          </Stack>
          {/* añadir una fila con Cómo pedir un productos*/}
          <Stack>
            <Box>
              <Typography variant='h6' component='span'>
                {'Para pedir producto, '}
              </Typography>
              <Typography>
                {'Selecciona una talla y fecha de un pedido disponible: '}
              </Typography>
              {pedidos?.length > 0 ? (
                <>
                  <Stack
                    direction='row'
                    sx={{
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      mt: 5,
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
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
                          {pedidos
                            ? pedidos.map((pedido) => (
                                <MenuItem value={pedido._id}>
                                  {pedido.ExpireDate}
                                </MenuItem>
                              ))
                            : 'No hay pedidos actualmente'}
                        </Select>
                      </FormControl>
                      {/* seleccionar cantidad */}
                      <FormControl>
                        <TextField
                          sx={{ width: '7ch !important' }}
                          variant='standard'
                          inputProps={{ type: 'number', min: 1, max: 60 }}
                          value={cantidad}
                          onChange={handleAmountChange}
                          name='cantidad'
                        />
                      </FormControl>
                      {/* Seriegrafia */}
                      {product &&
                        obtenerCategoria(product, AvaliableSeriegrafia) && (
                          <FormControl>
                            <RadioGroup
                              sx={{
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                              name='Seriegrafia'
                              value={SelectedSeriegrafia}
                              row
                              onChange={handleSeriegrafia}
                            >
                              <FormControlLabel
                                value={0}
                                control={<Radio />}
                                label='Sin Seriegrafía'
                              />
                              <FormControlLabel
                                value={1}
                                control={<Radio />}
                                label='Con Seriegrafía'
                              />
                              {Number(SelectedSeriegrafia) === 1 && (
                                <TextField
                                  sx={{
                                    width: '20ch !important',
                                    pb: 2
                                  }}
                                  variant='standard'
                                  name='Seriegrafía'
                                  label='Seriegrafía'
                                  value={seriegrafia ? seriegrafia : ''}
                                  onChange={handleInputSeriegrafia}
                                />
                              )}
                            </RadioGroup>
                          </FormControl>
                        )}
                    </Box>
                  </Stack>
                  {/* habilitar botón */}
                  {selectedTalla !== '' && selectedPedido && (
                    <Stack
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Button
                        variant='contained'
                        sx={{
                          backgroundColor: 'var(--ihc-jV-green)',
                          mt: 2
                        }}
                        endIcon={<Send />}
                        onClick={handleSubmit}
                      >
                        Solicitar
                      </Button>
                    </Stack>
                  )}
                </>
              ) : (
                <Typography
                  variant='h6'
                  component='span'
                  sx={{
                    display: 'flex',
                    color: 'var(--ihc-red-icons)',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  No hay ningun pedido abierto para solicitar ropa, contacta con
                  un Admin.
                </Typography>
              )}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  )
}
export default ProductDialog
