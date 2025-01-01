export const extractDaysOf = (pedido) => {
  const oneDay = 24 * 60 * 60 * 1000

  const ExpireDate = pedido.ExpireDate.split('/')

  const dateOfExpiration = new Date(
    Number(ExpireDate[2]),
    Number(ExpireDate[1]) - 1,
    Number(ExpireDate[0])
  )
  const currentDate = new Date()
  const diffDays = Math.round((dateOfExpiration - currentDate) / oneDay)
  if (diffDays > 10) {
    pedido.severity = 'info'
    pedido.daysOff = diffDays
  } else if (diffDays < 10 && diffDays > 0) {
    pedido.severity = 'warning'
    pedido.daysOff = diffDays
  } else {
    pedido.severity = 'error'
    pedido.daysOff = '0'
  }
}
