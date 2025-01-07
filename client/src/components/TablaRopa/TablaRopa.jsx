import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React from 'react'

export const TablaRopa = ({ userOrders }) => {
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
              <TableCell align='right'>{order.productos.Nombre}</TableCell>
              <TableCell align='right'>{order.talla}</TableCell>
              <TableCell align='right'>{order.unidades + 'x'}</TableCell>
              <TableCell align='right'>
                {order.productos.Precio + ' €'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
