export const filterPedidos = (pedidos) => {
  if (pedidos) {
    pedidos = pedidos.filter((pedido) => pedido.daysOff > 0 && pedido.open)
  } else {
    return pedidos
  }
  return pedidos
}
