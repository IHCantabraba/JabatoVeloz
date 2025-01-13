import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cloudinaryConfig from '../../config/cloudinary.js'
import cloudinary from 'cloudinary'
import Productos from '../../api/models/productos.js'
import User from '../../api/models/users.js'
import Pedidos from '../../api/models/pedidos.js'
import Orders from '../../api/models/orders.js'

dotenv.config()
cloudinaryConfig()
/* create path to end file */
const __file = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__file)
const xlsxPath = path.join(__dirname, '/datosApp.xlsx')
let NoPic = 'NoPic.jpg'
const dataUsers = [
  {
    nombre: 'Iñigo',
    apellidos: 'Hidalgo Cantabrana',
    alias: 'Iñigo',
    dni: '71657311Y',
    email: 'inigocanta@gmail.com',
    password: 'Inigo2024',
    birthDate: '1988/04/18',
    rol: 'admin',
    img: null
  }
]

const dataProductos = [
  {
    Nombre: 'PruebaConFoto',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '34',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'ALpes_Camiseta.png',
    originalIMG: true
  },
  {
    Nombre: 'pruebaSinFoto',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '34',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: '',
    originalIMG: false
  }
]
const dataPedidos = [
  {
    ExpireDate: '25/4/2025',
    title: 'Pedido Marzo 2025',
    description: 'Se abre pedido de marzo',
    users: '71657311Y'
  },
  {
    ID: 2,
    ExpireDate: '20/8/2025',
    title: 'Pedido Julio 2025',
    descripcion: 'Se abre pedido de Julio',
    users: '71657311Y'
  }
]
const dataOrders = [
  {
    users: '71657311Y',
    productos: 'Camiseta Trail Alpes',
    talla: 'l',
    pedidos: '25/4/2025',
    unidades: 1,
    precio: '34',
    pagado: false,
    seriegraia: null
  },
  {
    ID: 2,
    users: '71657311Y',
    productos: 'Camiseta Trail Alpes',
    talla: 'm',
    pedidos: '20/8/2025',
    unidades: 4,
    precio: '34',
    pagado: true,
    seriegrafía: 'juanito'
  }
]
/* array to csv */
/* de Array a CSV */
const Array2CSV = (array, fileName) => {
  let stringFinal = ``
  for (const key in array[0]) {
    stringFinal += `${key},`
  }
  stringFinal = stringFinal.slice(0, stringFinal.length - 1)
  stringFinal += '\n'

  for (const elemento of array) {
    let line = ``
    for (const key in elemento) {
      line += `${elemento[key]},`
    }

    stringFinal += `${line}\n`
    line = ``
  }
  fs.writeFile(
    path.join(__dirname, `${fileName}`),
    stringFinal,
    (err, data) => {
      if (err !== null) {
        console.log('Escrito!')
      }
      if (data) {
        console.log(data)
      }
    }
  )
  return stringFinal
}
//Array2CSV(dataUsers, 'users.csv')
//Array2CSV(dataProductos, 'productos.csv')
//Array2CSV(dataPedidos, 'pedidos.csv')
// Array2CSV(dataOrders, 'orders.csv')
/* concatenar csv creado para cada array de objetos */
/* array de ficheros csv y nombre de a sheet */
const csvFiles = [
  { path: 'productos.csv', sheetName: 'productos' },
  { path: 'users.csv', sheetName: 'user' },
  { path: 'pedidos.csv', sheetName: 'pedidos' },
  { path: 'orders.csv', sheetName: 'orders' }
]

const csvToXLSX = (csvFiles, workbook, xlsxPath) => {
  csvFiles.map((file) => {
    const csvData = fs.readFileSync(path.join(__dirname, file.path), 'utf8')
    const worksheet = XLSX.utils.aoa_to_sheet(
      csvData.split('\n').map((row) => row.split(','))
    )

    XLSX.utils.book_append_sheet(workbook, worksheet, file.sheetName)
  })
  XLSX.writeFile(workbook, xlsxPath)
  console.log(`data merged at ${xlsxPath}`)
}
/* crear el libro excel */
const workbook = XLSX.utils.book_new()
// csvToXLSX(csvFiles, workbook, xlsxPath)

/* subir imagen de producto a cloudinary */
const uploadPic = async (img, NoPic) => {
  const options = { folder: 'Jveloz/Products' }
  let Foto
  let cloudPhotURL
  let NoPicture = NoPic
  /* si no tiene foto, se asigna la genérica "NoPic" */
  if (img !== '') {
    Foto = img
  } else {
    Foto = NoPicture
  }
  console.log(Foto)
  /* si la foto NO es la de Nopic ya subida a cloudinary, se sube la foto */
  if (!Foto.includes('https')) {
    const result = await cloudinary.v2.uploader.upload(
      `./clothesPics/${Foto}`,
      options
    )
    /* si la foto es NOpic, se sube por primera vez esa foto a  */
    if (Foto === 'NoPic.jpg') {
      if (result) {
        NoPicture = result.secure_url
        console.log('reasigned Nopic path to cloudinary image path')
      }
    }
    if (result) {
      console.log('photo uploaded')
      console.log(`secure_url is: ${result.secure_url}`)
      cloudPhotURL = result.secure_url
    }
  } else {
    cloudPhotURL = NoPicture
  }
  return { cloud: cloudPhotURL, nopic: NoPicture }
}

/* insertar datos en DB */
/* obtener las distintas hojas */

const populateData = async (file) => {
  try {
    await mongoose.connect(process.env.DB_URL)
    const workbook = XLSX.readFile(file)
    const sheetNames = workbook.SheetNames
    for (const sheetName of sheetNames) {
      const sheet = workbook.Sheets[sheetName]
      const sheetData = XLSX.utils.sheet_to_json(sheet)
      sheetData.pop()
      // if (sheetName === 'user') {
      //   if (sheetData.length > 0) {
      //     console.log(`Inserting data from sheet: ${sheetName}`)
      //     console.log(sheetData)
      //     await User.insertMany(sheetData)
      //     console.log('Data successfully inserted into DB')
      //   } else {
      //     console.log(`sheet ${sheetName}is empty. Nothing to do`)
      //   }
      // }
      if (sheetName === 'productos') {
        if (sheetData.length > 0) {
          console.log(`Inserting data from sheet: ${sheetName}`)
          for (const product of sheetData) {
            const result = await uploadPic(product.img, NoPic)
            NoPic = result.nopic
            /* asiganr url de cloudinary a la imagen del producto */
            product.img = result.cloud
            const newProduct = new Productos(product)
            await newProduct.save()
          }
          console.log('Data successfully inserted into DB')
        } else {
          console.log(`sheet ${sheetName}is empty. Nothing to do`)
        }
      }
      // if (sheetName === 'pedidos') {
      //   if (sheetData.length > 0) {
      //     console.log(`Inserting data from sheet: ${sheetName}`)
      //     for (const pedido of sheetData) {
      //       const user = await User.findOne({ dni: pedido.users })
      //       if (user) {
      //         pedido.users = user._id
      //       }
      //       const newPedido = new Pedidos(pedido)
      //       await newPedido.save()
      //     }
      //     console.log('Data successfully inserted into DB')
      //   } else {
      //     console.log(`sheet ${sheetName}is empty. Nothing to do`)
      //   }
      // }
      // if (sheetName === 'orders') {
      //   if (sheetData.length > 0) {
      //     console.log(`Inserting data from sheet: ${sheetName}`)
      //     for (const order of sheetData) {
      //       /* obtener el usuario que hizo la order */
      //       const user = await User.findOne({ dni: order.users })
      //       if (user) {
      //         /* obeten prducto ordenado */
      //         const producto = await Productos.findOne({
      //           Nombre: order.productos
      //         })
      //         /* obtener en qué pedido está la orden */
      //         const pedido = await Pedidos.findOne({
      //           ExpireDate: order.pedidos
      //         })
      //         /* insertar en la order los _id de usuario, producto y pedido para usar depsues .populate() */
      //         order.users = user._id
      //         order.productos = producto?._id
      //         order.pedidos = pedido?._id
      //         const newOrder = new Orders(order)
      //         await newOrder.save()
      //         /* actualizar las ordenes del pedido */
      //         pedido.orders.push(newOrder._id)
      //         await Pedidos.findByIdAndUpdate(pedido._id, pedido, {
      //           new: true
      //         })
      //       } else {
      //         console.log('no user found')
      //       }
      //     }
      //     console.log('Data successfully inserted into DB')
      //   } else {
      //     console.log(`sheet ${sheetName}is empty. Nothing to do`)
      //   }
      // }
    }
  } catch (error) {
    console.error('Error while populating MongoDB:', error)
  } finally {
    await mongoose.disconnect()
  }
}
populateData(path.join(__dirname, 'datosApp.xlsx'))
