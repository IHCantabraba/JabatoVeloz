import {
  AppBar,
  Avatar,
  Box,
  Button,
  colors,
  Container,
  Dialog,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useRef } from 'react'
// import * as XLSX from 'xlsx'
import ExcelJS from 'exceljs'
import { Close } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import TablaPedidos from '../TablaPedidos/TablaPedidos'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
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
  const generateExcel = async (pedido) => {
    const rows = pedido.orders
    const formatedData = rows.map((data) => ({
      codigo: data._id,
      prenda: ` ${
        data.seriegrafia
          ? data.productos.Nombre + '- CON NOMBRE - DISEÑO PATROCINADOR'
          : data.productos.Nombre + '- DISEÑO PATROCINADOR'
      }`,
      color: data.productos.Nombre === 'Pantalon largo' ? 'NEGRO' : '',
      unica: data.talla === 'unica' ? Number(data.unidades) : '',
      cuatro: data.talla === '4' ? Number(data.unidades) : '',
      seis: data.talla === '6' ? Number(data.unidades) : '',
      ocho: data.talla === '8' ? Number(data.unidades) : '',
      diez: data.talla === '10' ? Number(data.unidades) : '',
      doce: data.talla === '12' ? Number(data.unidades) : '',
      catorce: data.talla === '14' ? Number(data.unidades) : '',
      xs: data.talla === 'xs' ? Number(data.unidades) : '',
      s: data.talla === 's' ? Number(data.unidades) : '',
      m: data.talla === 'm' ? Number(data.unidades) : '',
      l: data.talla === 'l' ? Number(data.unidades) : '',
      xl: data.talla === 'xl' ? Number(data.unidades) : '',
      dosxl: data.talla === '2xl' ? Number(data.unidades) : '',
      tresxs: data.talla === '3xl' ? Number(data.unidades) : '',
      cuatroxs: data.talla === '4xl' ? Number(data.unidades) : '',
      TOTAL: Number(data.precio) - Number(data.precio) * 0.21
    }))
    //custom headers
    const customHeaders = [
      'Código',
      'PRENDA',
      'Color',
      'Única',
      '4',
      '6',
      '8',
      '10',
      '12',
      '14',
      'XS',
      'S',
      'M',
      'L',
      'XL',
      '2XL',
      '3XL',
      '4XL',
      'TOTAL'
    ]
    // crear workbook y worksheet
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('PEDIDO')

    //introducir informacion
    ws.addRow(customHeaders)
    formatedData.forEach((row) => {
      ws.addRow(Object.values(row))
    })
    const headerRow = ws.getRow(1)
    // style for header
    headerRow.height = 20
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, size: 14, name: 'Arial' }
      cell.alignment = { horizontal: 'center', vertical: 'middle' }
      cell.border = {
        top: { style: 'thick', color: { argb: 'FF000000' } },
        left: { style: 'thick', color: { argb: 'FF000000' } },
        right: { style: 'thick', color: { argb: 'FF000000' } },
        bottom: { style: 'thick', color: { argb: 'FF000000' } }
      }
    })
    /* asignar color a la celda de la prenda */
    ws.eachRow((fila, numeroFila) => {
      if (numeroFila > 1) {
        const nombrePrenda = fila.getCell(2).value.split('-')

        let richText = []
        for (let part = 0; part < nombrePrenda.length; part++) {
          let colorSelected =
            part === 0
              ? 'FF000000'
              : nombrePrenda[part].includes('NOMBRE')
              ? 'FFFF0000'
              : 'FF0000FF'
          const nuevaParte = {
            text: `${nombrePrenda[part]} - `,
            font: {
              color: { argb: `${colorSelected}` },
              bold: true
            }
          }

          richText.push(nuevaParte)
        }

        fila.getCell(2).value = { richText }
        richText = []
      }
    })
    /* asignar color a todos */
    ws.eachRow((fila, numeroFila) => {
      if (numeroFila > 1) {
        fila.eachCell((cell) => {
          cell.alignment = { horizontal: 'center', vertical: 'middle' }
          cell.font = { bold: true, size: 11, name: 'Arial' }
        })
      }
    })
    ws.getColumn(1).width = 20
    ws.getColumn(2).width = 80
    // create a buffer
    const buffer = await wb.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    //create a link
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    /* name when download */
    link.download = `${pedido._id}_JABATO_VELOZ`
    /* click de link */
    link.click()
    URL.revokeObjectURL(link.href)
  }
  const createExcelAndDownload = (pedido) => {
    const data = pedido?.orders
    /* TODO transformar las ordenes al formato de fila del excel que se deb generar */

    /* woorksheet */
    const ws = XLSX.utils.json_to_sheet(data)
    /* workbook */
    const wb = XLSX.utils.book_new()
    /* create sheet */
    XLSX.utils.book_append_sheet(wb, ws, 'PEDIDO')
    /* buffer */
    const eBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array'
    })
    // convert to blob in order to download
    const blob = new Blob([eBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    /* name when download */
    link.download = `${pedido._id}_JABATO_VELOZ`
    /* click de link */
    link.click()
    URL.revokeObjectURL(link.href)
  }
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
            {/* New button */}
            <Button onClick={() => generateExcel(pedido)}>New Excel</Button>
            <DownloadTableExcel
              filename={'pedido_' + pedido?._id}
              sheet='ropa'
              currentTableRef={printRef.current}
            >
              {OpenPedido ? (
                <Button
                  variant='contained'
                  sx={{ backgroundColor: 'var(--ihc-jV-green)', mt: 5 }}
                  endIcon={<ListAltOutlinedIcon />}
                >
                  Excel
                </Button>
              ) : (
                <Button
                  variant='contained'
                  sx={{ backgroundColor: 'var(--ihc-jV-green)', mt: 5 }}
                  endIcon={<ListAltOutlinedIcon />}
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
