import {
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React from 'react'
import { useValue } from '../../context/ContextProvider'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { getSeriegrafiaPrice } from '../../actions/utils/PrecioSeriegrafia'
const TablaPedidos = ({ pedido, printref }) => {
  const {
    state: {
      seriegrafiaManager: { AvaliableSeriegrafia },
      appManager: {
        theme: { light }
      }
    }
  } = useValue()

  return (
    <TableContainer
      component={Paper}
      sx={{ bgcolor: `var(--ihc-${light ? 'light' : 'dark'}-mode-table)` }}
      ref={printref}
    >
      <Table sx={{ minWidth: '100%' }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Miembro</TableCell>
            <TableCell align='right'>Artículo</TableCell>
            <TableCell align='right'>Seriegrafía</TableCell>
            <TableCell align='right'>Talla</TableCell>
            <TableCell align='right'>Cantidad</TableCell>
            <TableCell align='right'>Precio (€)</TableCell>
            <TableCell align='right'>Pagado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedido?.orders.map((order) => (
            <TableRow
              key={order?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {order.users.alias ? order.users.alias : order.users.nombre}
              </TableCell>
              <TableCell align='right'>
                {order.productos.Nombre}
                {order.seriegrafia ? ' +Seriegraf.' : ''}
              </TableCell>
              <TableCell align='right'>
                {order.seriegrafia !== '' ? order.seriegrafia : 'No'}
              </TableCell>
              <TableCell align='right'>{order.talla}</TableCell>
              <TableCell align='right'>{order.unidades + 'x'}</TableCell>
              <TableCell align='right'>
                {order.productos.Precio + '€'}
                {order.seriegrafia
                  ? '+' +
                    getSeriegrafiaPrice(
                      order.productos.Categoria,
                      AvaliableSeriegrafia
                    ) +
                    '€'
                  : ''}
              </TableCell>
              <TableCell align='right'>
                {order.pagado ? (
                  <Icon>
                    <DoneAllIcon sx={{ color: 'var(--ihc-jV-green)' }} />
                  </Icon>
                ) : (
                  <Icon>
                    <CloseOutlinedIcon
                      sx={{ color: 'var(--ihc-red-icons)' }}
                    ></CloseOutlinedIcon>
                  </Icon>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablaPedidos
