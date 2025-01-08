import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import React from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import CheckIcon from '@mui/icons-material/Check'
import { updateOrder } from '../../actions/orders'
import { useValue } from '../../context/ContextProvider'
export const TablaRopa = ({ userOrders }) => {
  const {
    state: { currentUser },
    dispatch
  } = useValue()
  const handleUpdatePagado = (order) => {
    console.log(`actualizando estado de ${order._id}`)
    updateOrder(dispatch, order, currentUser?.result.token)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Fecha Lanzamiento</TableCell>
            <TableCell align='right'>Artículo</TableCell>
            <TableCell align='right'>Talla</TableCell>
            <TableCell align='right'>Cantidad</TableCell>
            <TableCell align='right'>Precio (€)</TableCell>
            <TableCell align='right'>Pagado</TableCell>
            <TableCell align='right'>Pagar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrders?.orders.map((order) => (
            <TableRow
              key={order?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {order.pedidos.ExpireDate}
              </TableCell>
              <TableCell align='right'>{order.productos?.Nombre}</TableCell>
              <TableCell align='right'>{order.talla}</TableCell>
              <TableCell align='right'>{order.unidades + 'x'}</TableCell>
              <TableCell align='right'>
                {order.productos?.Precio + ' €'}
              </TableCell>
              <TableCell align='right'>{order.pagado ? 'Si' : 'No'}</TableCell>
              <TableCell align='right'>
                {order.pagado ? (
                  <DoneAllIcon sx={{ color: 'green' }} />
                ) : (
                  <Tooltip title='Marcar como pagado'>
                    <Button
                      sx={{ m: 0, width: '20px' }}
                      onClick={() => handleUpdatePagado(order)}
                    >
                      <CheckIcon sx={{ color: 'green' }} />
                    </Button>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
