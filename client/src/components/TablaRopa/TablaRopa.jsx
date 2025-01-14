import {
  IconButton,
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
import { updateOrder, deleteOrder } from '../../actions/orders'
import { useValue } from '../../context/ContextProvider'
import PaymentIcon from '@mui/icons-material/Payment'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
export const TablaRopa = ({ userOrders }) => {
  const {
    state: { currentUser, light },
    dispatch
  } = useValue()
  const handleUpdatePagado = (order) => {
    console.log(`actualizando estado de ${order._id}`)
    updateOrder(
      dispatch,
      order,
      currentUser?.result.user._id,
      currentUser?.result.token
    )
  }
  const handleDeleteOrder = (order) => {
    console.log(`deleting order ${order._id}`)
    deleteOrder(
      dispatch,
      order,
      currentUser?.result.user._id,
      currentUser?.result.token
    )
  }
  return (
    <TableContainer
      component={Paper}
      sx={{ bgcolor: `var(--ihc-${light ? 'light' : 'dark'}-mode-table)` }}
    >
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
            <TableCell align='right'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrders?.orders.map((order) => (
            <TableRow
              key={order?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {order.pedidos.ExpireDate} {order.pedidos.open ? '' : 'Cerrado'}
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
                  <DoneAllIcon sx={{ color: 'var(--ihc-jV-green)' }} />
                ) : (
                  <Tooltip title='Marcar como pagado'>
                    <IconButton
                      sx={{ m: 0, width: '20px', color: 'inherit' }}
                      onClick={() => handleUpdatePagado(order)}
                      disabled={!order.pedidos.open}
                    >
                      <PaymentIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell align='center'>
                {!order.pagado && (
                  <IconButton
                    sx={{
                      ml: 3,
                      width: '20px',
                      color: 'var(--ihc-red-icons)',
                      '&:disabled': { color: 'var(--ihc-disabled-icon)' }
                    }}
                    onClick={() => handleDeleteOrder(order)}
                    disabled={!order.pedidos.open}
                  >
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
