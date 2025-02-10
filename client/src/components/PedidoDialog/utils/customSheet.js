const getCurrentDate = () => {
  const date = new Date()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()
  const today = `${month}_${year}`
  return today
}
const customStyle = (
  color = 'FF000000',
  size = 14,
  horizontal = 'center',
  border = true
) => {
  const style = {
    font: { bold: true, name: 'Arial', size: size, color: { argb: color } },
    alignment: { horizontal: horizontal, vertical: 'middle' }
  }
  if (border) {
    style.border = {
      top: { style: 'thick' },
      left: { style: 'thick' },
      right: { style: 'thick' },
      bottom: { style: 'thick' }
    }
  }

  return style
}
export const customHeaders = [
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
export const FormatedData = (orders) => {
  const formatedData = orders.map((data) => ({
    codigo: data._id,
    prenda: ` ${
      data.seriegrafia
        ? data.productos.Nombre + '- CON NOMBRE'
        : data.productos.Nombre
    } ${
      data.productos.Categoria === 'Camisetas' ? '- DISEÑO PATROCINADOR' : ''
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
  return formatedData
}

export const headerStyle = (headerRow) => {
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
}

export const productNameColor = (ws) => {
  ws.eachRow((fila, numeroFila) => {
    if (numeroFila > 1) {
      const nombrePrenda = fila.getCell(2).value.split('-')
      fila.getCell(2).alignment = { horizontal: 'left', vertical: 'top' }
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
      richText[richText.length - 1].text = richText[
        richText.length - 1
      ].text.slice(0, -3)

      fila.getCell(2).value = { richText }
      richText = []
    }
  })
}
export const columnsWidth = (ws) => {
  ws.getColumn(1).width = 40
  ws.getColumn(2).width = 80
  ws.getColumn(`S`).width = 15
}
export const bodyStyle = (ws) => {
  ws.eachRow((fila, numeroFila) => {
    if (numeroFila > 1) {
      let horizontal = 'center'
      fila.eachCell((cell, colNumber) => {
        if (colNumber === 2) {
          horizontal = 'left'
        }
        cell.alignment = { horizontal: horizontal, vertical: 'middle' }
        cell.font = { bold: true, size: 11, name: 'Arial' }
      })
    }
  })
}

export const lastRowStyle = (ws) => {
  const lastRowSheet = ws.lastRow
  if (lastRowSheet) {
    lastRowSheet.eachCell((cell) => {
      cell.border = { bottom: { style: 'thick' } }
    })
  }
}

export const createLink = (blob) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  /* name when download */
  link.download = `Pedido_${getCurrentDate()}_JABATO_VELOZ`
  /* click de link */
  link.click()
  return link
}
export const fillSheet = (ws, formatedData) => {
  ws.addRow(customHeaders)
  formatedData.forEach((row) => {
    ws.addRow(Object.values(row))
  })
}

export const SummaryRow = (ws) => {
  //añadir fila
  const summaryRow = ws.addRow([])
  const summaryRowNumber = summaryRow.number

  // primera celda Fecha
  const Cell1 = ws.getCell(`A${summaryRowNumber}`)
  Cell1.style = customStyle('FFFF0000', '12', 'center', true)

  const range1 = `A${summaryRowNumber}:C${summaryRowNumber}`
  ws.mergeCells(range1)
  // celdas intermedias vacias
  const Cell2 = ws.getCell(`D${summaryRowNumber}`)
  Cell2.style = customStyle()

  const range2 = `D${summaryRowNumber}:O${summaryRowNumber}`
  ws.mergeCells(range2)
  //   // BASE IMPONINBLE
  const Cell3 = ws.getCell(`P${summaryRowNumber}`)
  Cell3.value = 'BASE IMPONIBLE'
  Cell3.style = customStyle('FF000000', 12, 'center', true)

  const range3 = `P${summaryRowNumber}:R${summaryRowNumber}`
  ws.mergeCells(range3)

  // total precio sin IVA cantidad del pedido
  const Cell4 = ws.getCell(`S${summaryRowNumber}`)
  let totalPrice = 0
  ws.eachRow((fila, numeroFila) => {
    if (numeroFila > 1 && numeroFila < ws.lastRow.number) {
      const precioSinIva = fila.getCell(`S`)
      totalPrice += Number(precioSinIva)
    }
  })
  Cell4.value = totalPrice
  Cell4.style = customStyle('FF000000', 12, 'center', true)
}

export const IvaRow = (ws, pedido) => {
  const ivaRow = ws.addRow([])
  const ivaRowNumber = ivaRow.number
  //iva cell
  const IvaCell = ws.getCell(`Q${ivaRowNumber}`)
  IvaCell.value = '21%IVA'
  IvaCell.style = customStyle('FF000000', 12, 'right', true)
  const range1 = `Q${ivaRowNumber}:R${ivaRowNumber}`
  ws.mergeCells(range1)

  let Iva = 0
  pedido?.orders.map((order) => (Iva += Number(order.precio) * 0.21))
  const totalIva = ws.getCell(`S${ivaRowNumber}`)
  totalIva.value = Iva
  totalIva.style = customStyle('FF000000', 12, 'center', true)

  const portes = ws.getCell(`G${ivaRowNumber}`)
  portes.value = 'PORTES NO INCLUIDOS'
  portes.font = {
    bold: true,
    color: { argb: 'FFFF0000' },
    underline: true,
    name: 'Arial'
  }
}

export const TotalPrice = (ws) => {
  const totalRow = ws.addRow([])
  const totalRowNumber = totalRow.number

  // TOTAL
  const TotalCell = ws.getCell(`Q${totalRowNumber}`)
  TotalCell.value = 'TOTAL'
  TotalCell.style = customStyle('FFFF0000', 12, 'right', true)
  const range1 = `Q${totalRowNumber}:R${totalRowNumber}`
  ws.mergeCells(range1)

  // obtener base e iva
  const base = ws.getCell(`S${totalRowNumber - 2}`)
  const iva = ws.getCell(`S${totalRowNumber - 1}`)
  const total = Number(base) + Number(iva)
  const totalCellPrice = ws.getCell(`S${totalRowNumber}`)
  totalCellPrice.value = total.toFixed(2) + ' €'
  totalCellPrice.style = customStyle('FFFF0000', 12, 'center', true)

  const portes = ws.getCell(`G${totalRowNumber}`)
  portes.value = '*Portes pagados a partir de 600 € Base Imponible.'
  portes.font = {
    color: { argb: 'FFFF0000' },
    name: 'Arial'
  }

  // Observaciones
  const observacionesCell = ws.getCell(`B${totalRowNumber}`)
  observacionesCell.value = 'OBSERVACIONES'
  observacionesCell.style = customStyle()
}
export const insertObservation = (ws, orders) => {
  const filterOrder = orders.filter((order) => order.seriegrafia)
  filterOrder.map((order) => {
    const newRow = ws.addRow([])
    const newRowNumber = newRow.number
    const newRowCell = ws.getCell(`B${newRowNumber}`)
    newRowCell.value = `${
      order.productos.Nombre
    }: ${order.talla.toUpperCase()}-> ${order.seriegrafia}`
    newRowCell.style = customStyle('FFFF0000', 12, 'left', false)
  })
}

export const TotalPrendas = (ws, orders) => {
  const totalPrendas = ws.addRow([])
  const totalPrendasNumber = totalPrendas.number
  const totalCell = ws.getCell(`B${totalPrendasNumber}`)
  totalCell.value = 'TOTAL PRENDAS'
  totalCell.style = customStyle('FF000000', 14, 'right', true)
  //Cantidad
  const cantidad = ws.getCell(`G${totalPrendasNumber}`)
  cantidad.value = orders.length
  cantidad.style = customStyle()
  const range1 = `G${totalPrendasNumber}:J${totalPrendasNumber}`
  ws.mergeCells(range1)
  // Fecha
  const fecha = ws.getCell(`L${totalPrendasNumber}`)
  fecha.value = 'FECHA'
  fecha.style = customStyle()
  const range2 = `L${totalPrendasNumber}:N${totalPrendasNumber}`
  ws.mergeCells(range2)
  // valor fecha
  const fechaValue = ws.getCell(`O${totalPrendasNumber}`)
  fechaValue.style = customStyle()
  const range3 = `O${totalPrendasNumber}:S${totalPrendasNumber}`
  ws.mergeCells(range3)
}

export const JabatoRow = (ws) => {
  const jabatoRow = ws.addRow([])
  const jabatoRowNumber = jabatoRow.number
  const jabatoCell = ws.getCell(`B${jabatoRowNumber}`)
  jabatoCell.value = 'JABATO VELOZ'
  jabatoCell.style = customStyle()
  jabatoCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF92D050' }
  }
  //orden
  const otCell = ws.getCell(`L${jabatoRowNumber}`)
  otCell.value = 'OT'
  otCell.style = customStyle()
  const range = `L${jabatoRowNumber}:N${jabatoRowNumber}`
  ws.mergeCells(range)

  //orden value
  const otValueCell = ws.getCell(`O${jabatoRowNumber}`)
  otValueCell.style = customStyle()
  const rangeValue = `O${jabatoRowNumber}:S${jabatoRowNumber}`
  ws.mergeCells(rangeValue)
}

export const AddEmptyRow = (ws) => {
  ws.addRow([])
}

export const customExcel = (ws, pedido) => {
  const formatedData = FormatedData(pedido.orders)
  // insertar datos
  fillSheet(ws, formatedData)
  // style for header
  headerStyle(ws.getRow(1))
  /* asignar color a la celda de la prenda */
  productNameColor(ws)
  /* asignar color a todos */
  bodyStyle(ws)
  // ancho de las columnas Código y Prenda
  columnsWidth(ws)
  //line style las row
  lastRowStyle(ws)
  // summary Row
  SummaryRow(ws)
  // Iva row
  IvaRow(ws, pedido)
  // TOTAL rpice
  TotalPrice(ws)
  // insertar observaciones
  insertObservation(ws, pedido.orders)
  //empy
  AddEmptyRow(ws)
  // Total prendas
  TotalPrendas(ws, pedido.orders)
  //empy
  AddEmptyRow(ws)
  AddEmptyRow(ws)
  // JV row
  JabatoRow(ws)
}
