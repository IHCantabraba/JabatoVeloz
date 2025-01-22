import ExcelJS from 'exceljs'

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
  return formatedData
}

export const hedaerStyle = (headerRow) => {
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
      console.log(richText[richText.length - 1].text)

      fila.getCell(2).value = { richText }
      richText = []
    }
  })
}
export const columnsWidth = (ws) => {
  ws.getColumn(1).width = 20
  ws.getColumn(2).width = 80
  ws.getColumn(`S`).width = 15
}
export const bodyStyle = (ws) => {
  ws.eachRow((fila, numeroFila) => {
    if (numeroFila > 1) {
      fila.eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' }
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

export const createLink = (blob, sheetName) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  /* name when download */
  link.download = `${sheetName}_JABATO_VELOZ`
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

export const SummaryRow = (ws, date) => {
  //añadir fila
  const summaryRow = ws.addRow([])
  const summaryRowNumber = summaryRow.number
  // concatener columnas
  const range1 = `A${summaryRowNumber}:C${summaryRowNumber}`
  const range2 = `D${summaryRowNumber}:O${summaryRowNumber}`
  const range3 = `P${summaryRowNumber}:R${summaryRowNumber}`
  ws.mergeCells(range1)
  ws.mergeCells(range2)
  ws.mergeCells(range3)
  // insertar valore sy definir estilos
  const Cell1 = ws.getCell(`A${summaryRowNumber}`)
  const Cell2 = ws.getCell(`D${summaryRowNumber}`)
  const Cell3 = ws.getCell(`P${summaryRowNumber}`)
  // primera celda Fecha
  Cell1.value = date
  Cell1.alignment = { horizontal: 'center', vertical: 'middle' }
  Cell1.font = {
    bold: true,
    size: 12,
    name: 'Arial',
    color: { argb: 'FFFF0000' }
  }
  Cell1.border = {
    bottom: { style: 'thick' },
    left: { style: 'thick' },
    right: { style: 'thick' }
  }
  // BASE IMPONINBLE
  Cell3.value = 'BASE IMPONIBLE'
  Cell3.alignment = { horizontal: 'center', vertical: 'middle' }
  Cell3.font = {
    bold: true,
    size: 12,
    name: 'Arial'
  }
  Cell3.border = {
    bottom: { style: 'thick' },
    left: { style: 'thick' },
    right: { style: 'thick' }
  }
  Cell2.border = {
    bottom: { style: 'thick' },
    left: { style: 'thick' },
    right: { style: 'thick' }
  }
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
  Cell4.font = {
    bold: true,
    size: 12,
    name: 'Arial'
  }
  Cell4.alignment = { horizontal: 'center', vertical: 'middle' }
  Cell4.border = {
    bottom: { style: 'thick' },
    left: { style: 'thick' },
    right: { style: 'thick' }
  }
}

export const IvaRow = (ws, pedido) => {
  const ivaRow = ws.addRow([])
  const ivaRowNumber = ivaRow.number
  const range1 = `Q${ivaRowNumber}:R${ivaRowNumber}`
  ws.mergeCells(range1)
  const IvaCell = ws.getCell(`Q${ivaRowNumber}`)
  IvaCell.value = '21%IVA'
  IvaCell.font = { bold: true, size: 12, name: 'Arial' }
  IvaCell.alignment = { horizontal: 'right', vertical: 'middle' }
  IvaCell.border = {
    bottom: { style: 'thick' },
    left: { style: 'thick' },
    right: { style: 'thick' }
  }

  let Iva = 0
  pedido?.orders.map((order) => (Iva += Number(order.precio) * 0.21))
  const totalIva = ws.getCell(`S${ivaRowNumber}`)
  totalIva.value = Iva
  totalIva.font = { bold: true, size: 12, name: 'Arial' }
  totalIva.alignment = { horizontal: 'center', vertical: 'middle' }
  totalIva.border = {
    bottom: { style: 'thick' },
    left: { style: 'thick' },
    right: { style: 'thick' }
  }

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

  const range1 = `Q${totalRowNumber}:R${totalRowNumber}`
  ws.mergeCells(range1)
  const TotalCell = ws.getCell(`Q${totalRowNumber}`)
  TotalCell.value = 'TOTAL'
  TotalCell.font = {
    bold: true,
    size: 12,
    name: 'Arial',
    color: { argb: 'FFFF0000' }
  }
  TotalCell.alignment = { horizontal: 'right', vertical: 'middle' }
  TotalCell.border = {
    bottom: { style: 'thick' },
    left: { style: 'thick' },
    right: { style: 'thick' }
  }

  // obtener base e iva
  const base = ws.getCell(`S${totalRowNumber - 2}`)
  const iva = ws.getCell(`S${totalRowNumber - 1}`)
  const total = Number(base) + Number(iva)
  const totalCellPrice = ws.getCell(`S${totalRowNumber}`)
  totalCellPrice.value = total.toFixed(2) + ' €'
  totalCellPrice.font = {
    bold: true,
    size: 12,
    name: 'Arial',
    color: { argb: 'FFFF0000' }
  }
  totalCellPrice.alignment = { horizontal: 'center', vertical: 'middle' }

  totalCellPrice.border = {
    bottom: { style: 'thick' },
    left: { style: 'thick' },
    right: { style: 'thick' }
  }

  const portes = ws.getCell(`G${totalRowNumber}`)
  portes.value = '*Portes pagados a partir de 600 € Base Imponible.'
  portes.font = {
    color: { argb: 'FFFF0000' },
    name: 'Arial'
  }
}
