import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useRef } from 'react'

import { Close } from '@mui/icons-material'

import { useValue } from '../../context/ContextProvider'
import TablaPedidos from '../TablaPedidos/TablaPedidos'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { closePedido } from '../../actions/pedidos'
import { DownloadTableExcel } from 'react-export-table-to-excel'

const PedidoDialog = () => {
  const {
    state: { pedido, light, currentUser, OpenPedido },
    dispatch
  } = useValue()
  const printRef = useRef()

  const handleCerrarPedido = () => {
    /* TODO implement update Pedido */
    console.log(`Se va acerrar el pedido ${pedido._id}`)
    closePedido(pedido, currentUser, dispatch)
  }
  // const handleGenerarPDF = async () => {
  //   console.log('se generará pdf')
  //   const element = printRef.current
  //   const canvas = await html2canvas(element)
  //   const data = canvas.toDataURL('img/png')

  //   const pdf = new jsPDF()
  //   const imgProperties = pdf.getImageProperties(data)
  //   const pdfWidth = pdf.internal.pageSize.getWidth()
  //   const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

  //   pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
  //   pdf.save(`pedido_${pedido?._id}`)
  // }
  const handleClose = () => {
    dispatch({ type: 'UPDATE_PEDIDO', payload: null })
    dispatch({
      type: 'UPDATE_OPEN_PEDIDO_STATE',
      payload: null
    })
  }
  const cantidadTotal = () => {
    let total = 0
    pedido?.orders.map((order) => (total += Number(order.precio)))
    return total
  }
  return (
    <Dialog
      fullScreen
      open={Boolean(pedido)}
      PaperProps={{
        style: {
          backgroundColor: `var(--ihc-${light ? 'light' : 'dark'}-mode-bg-app)`
        }
      }}
    >
      {/* cabecera del pedido */}
      <AppBar
        position='relative'
        style={{
          backgroundColor: `var(--ihc-toolbar-${light ? 'light' : 'dark'}-mode)`
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            component='h3'
            sx={{
              ml: 2,
              flex: 1,
              color: `var(--ihc-${light ? 'light' : 'dark'}-mode-text)`
            }}
          >
            {'Creado por ' +
              pedido?.users.alias +
              '. ' +
              'Fecha Estimada: ' +
              pedido?.ExpireDate}
          </Typography>
          <IconButton color='inherit' onClick={handleClose}>
            <Close
              sx={{ color: `var(--ihc-${light ? 'light' : 'dark'}-mode-text)` }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* cuerpo con informacion */}
      <Container
        sx={{
          pt: 3,
          alignContent: 'Center',
          width: '100%'
        }}
      >
        <Stack
          direction='row'
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            mb: 3,
            gap: 5
          }}
        >
          <Avatar
            src='./assets/Jabato_Veloz9_tran.png'
            sx={{ width: '150px', height: '75px', alignSelf: 'start' }}
          ></Avatar>
          <Typography
            variant='h6'
            component='span'
            sx={{ alignSelf: 'center' }}
          >
            Jabato Veloz Club Deportivo
          </Typography>
        </Stack>
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
        <Stack>
          {pedido?.orders.length > 0 ? (
            <TablaPedidos pedido={pedido} printref={printRef} />
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
          <Stack
            direction='row'
            sx={{ justifyContent: 'space-between', flexWrap: 'wrap', mb: 2 }}
          >
            <DownloadTableExcel
              filename={'pedido_' + pedido?._id}
              sheet='ropa'
              currentTableRef={printRef.current}
            >
              {OpenPedido ? (
                <Button
                  variant='contained'
                  sx={{ backgroundColor: 'var(--ihc-jV-green)', mt: 5 }}
                  endIcon={<PictureAsPdfIcon />}
                  // onClick={handleGenerarPDF}
                >
                  Excel
                </Button>
              ) : (
                <Button
                  variant='contained'
                  sx={{ backgroundColor: 'var(--ihc-jV-green)', mt: 5 }}
                  endIcon={<PictureAsPdfIcon />}
                  // onClick={handleGenerarPDF}
                  disabled
                >
                  PDF
                </Button>
              )}
            </DownloadTableExcel>
            {OpenPedido ? (
              <Button
                variant='contained'
                sx={{ backgroundColor: 'var(--ihc-jV-green)', mt: 5 }}
                endIcon={<DoneAllIcon />}
                onClick={handleCerrarPedido}
              >
                Finalizar
              </Button>
            ) : (
              <Typography variant='h4' component='span' sx={{ pt: 4 }}>
                Finalizado!
              </Typography>
              /* TODO pensar si hacemos un reabrir y un actualizar fecha */
            )}
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  )
}

export default PedidoDialog
