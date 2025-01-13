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
  },
  {
    nombre: 'Cristian',
    apellidos: 'Ochoa Menéndez',
    alias: 'CristianPresi',
    dni: '09418309Q',
    email: 'cristianflash2000@yahoo.es',
    password: 'Cristian2024',
    birthDate: '1982/01/26',
    rol: 'admin',
    img: null
  },
  {
    nombre: 'Cova',
    apellidos: 'Diego Alonso',
    alias: 'Cova',
    dni: '11111111Q',
    email: 'cova@cova.es',
    password: 'Cova2024',
    birthDate: '1992/08/16',
    rol: 'admin',
    img: null
  },
  {
    nombre: 'Agustin',
    apellidos: 'Fernandez Fernandez',
    alias: 'AgusP',
    dni: '22222222J',
    email: 'Agus@Agus.es',
    password: 'Agus2024',
    birthDate: '1983/05/22',
    rol: 'user',
    img: null
  },
  {
    nombre: 'Angel',
    apellidos: 'Diaz Suearez',
    alias: 'Amgel',
    dni: '33333333N',
    email: 'Angel@Angel.com',
    password: 'Angel2024',
    birthDate: '1986/02/10',
    rol: 'user',
    img: null
  },
  {
    nombre: 'Nuria',
    apellidos: 'Bravo Torres',
    alias: 'Nuri',
    dni: '44444444P',
    email: 'Nuri@Nuri.com',
    password: 'Nuri2024',
    birthDate: '1987/11/28',
    rol: 'user',
    img: null
  },
  {
    nombre: 'Eva',
    apellidos: 'Moreno Garcia',
    alias: 'Evi',
    dni: '55555555D',
    email: 'evi@evi.com',
    password: 'Evi2024',
    birthDate: '1984/06/21',
    rol: 'user',
    img: null
  },
  {
    nombre: 'Fernando',
    apellidos: 'Antunez Perez',
    alias: 'Nando',
    dni: '66666666D',
    email: 'nando@nando.com',
    password: 'Nando2024',
    birthDate: '1987/12/10',
    rol: 'user',
    img: null
  },
  {
    nombre: 'Juan',
    apellidos: 'Suarez Lena',
    alias: 'Xuan',
    dni: '77777777J',
    email: 'xuan@xuan.com',
    password: 'Xuan2024',
    birthDate: '1978/03/05',
    rol: 'user',
    img: null
  },
  {
    nombre: 'Adela',
    apellidos: 'San Simon',
    alias: 'Adela',
    dni: '88888888J',
    email: 'adela@adela.com',
    password: 'auan2024',
    birthDate: '1989/07/018',
    rol: 'user',
    img: null
  }
]

const dataProductos = [
  {
    Nombre: 'Camiseta Trail Alpes',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '34',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'ALpes_Camiseta.png',
    originalIMG: true
  },
  {
    Nombre: 'Paravientos Terry',
    Categoria: 'Cortavientos',
    Sexo: 'unisex',
    Precio: '65',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Con Gorro y membrana',
    img: '',
    originalIMG: false
  },
  {
    Nombre: 'Camiseta Sin Mangas Alpes',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '31',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'camiseta_SM.png',
    originalIMG: true
  },
  {
    Nombre: 'Camiseta Manga Corta Cross',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '30',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'avance_cross.png',
    originalIMG: true
  },
  {
    Nombre: 'Camiseta Manga Corta Adv.',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '31',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Con Gorro Bolsillo espalda y menbrana',
    img: 'avance_cross.png',
    originalIMG: true
  },
  {
    Nombre: 'Paravientos Sherpa',
    Categoria: 'Cortavientos',
    Sexo: 'unisex',
    Precio: '65',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'Paravientos.png',
    originalIMG: true
  },
  {
    Nombre: 'Paravientos',
    Categoria: 'Cortavientos',
    Sexo: 'unisex',
    Precio: '48',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Sin Gorro 2 bosillos con cremallera',
    img: 'Paravientos.png',
    originalIMG: true
  },
  {
    Nombre: 'Chaleco Challange',
    Categoria: 'Chaleco',
    Sexo: 'unisex',
    Precio: '39.5',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Bolsillo en la espalda',
    img: 'chaleco.png',
    originalIMG: true
  },
  {
    Nombre: 'Pantalon de Trail corto',
    Categoria: 'Pantalones',
    Sexo: 'mujer',
    Precio: '31.5',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: 'Pantalon_trail_chica.png',
    originalIMG: true
  },
  {
    Nombre: 'Pantalon de Trail corto',
    Categoria: 'Pantalones',
    Sexo: 'hombre',
    Precio: '31.5',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Not available',
    img: 'Pantalon_trail.png',
    originalIMG: true
  },
  {
    Nombre: 'Sudadera Alaska',
    Categoria: 'Sudaderas',
    Sexo: 'unisex',
    Precio: '48',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Sudadera con capucha',
    img: 'sudadera_alaska.png',
    originalIMG: true
  },
  {
    Nombre: 'Pantaloneta',
    Categoria: 'Pantalones',
    Sexo: 'unisex',
    Precio: '29',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'Pantaloneta.png',
    originalIMG: true
  },
  {
    Nombre: 'Pantalon de Trail corto',
    Categoria: 'Pantalones',
    Sexo: 'unisex',
    Precio: '30',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'Malla_corta.png',
    originalIMG: true
  },
  {
    Nombre: 'Falda',
    Categoria: 'Pantalones',
    Sexo: 'mujer',
    Precio: '31',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: 'Pantalon_trail_chica.png',
    originalIMG: true
  },
  {
    Nombre: 'Manguitos Verano',
    Categoria: 'Complementos',
    Sexo: 'unisex',
    Precio: '12.10',
    Tallas: 'unica',
    Descripcion: 'Not available',
    img: 'manguitos.png',
    originalIMG: true
  },
  {
    Nombre: 'Manguitos Invierno',
    Categoria: 'Complementos',
    Sexo: 'unisex',
    Precio: '13.5',
    Tallas: 'unica',
    Descripcion: 'Not available',
    img: 'manguitos.png',
    originalIMG: true
  },
  {
    Nombre: 'Malliot manga corta Summun',
    Categoria: 'Malliots',
    Sexo: 'hombre',
    Precio: '52',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Not available',
    img: '',
    originalIMG: false
  },
  {
    Nombre: 'Malliot manga corta Summun',
    Categoria: 'Malliots',
    Sexo: 'mujer',
    Precio: '52',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: '',
    originalIMG: false
  },
  {
    Nombre: 'Culotte corto',
    Categoria: 'Culottes',
    Sexo: 'hombre',
    Precio: '70',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Culotte con tirantes',
    img: '',
    originalIMG: false
  },
  {
    Nombre: 'Culotte corto',
    Categoria: 'Culottes',
    Sexo: 'mujer',
    Precio: '70',
    Tallas: 'xs s m l xl',
    Descripcion: 'Culotte con tirantes',
    img: '',
    originalIMG: false
  },
  {
    Nombre: 'Top corto',
    Categoria: 'Camisetas',
    Sexo: 'mujer',
    Precio: '26',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: '',
    originalIMG: false
  },
  {
    Nombre: 'Polo',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '33',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Solo disponible en color negro',
    img: 'polo.png',
    originalIMG: true
  },
  {
    Nombre: 'Camiseta Manga larga',
    Categoria: 'Camisetas',
    Sexo: 'mujer',
    Precio: '25',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: '',
    originalIMG: false
  },
  {
    Nombre: 'Camiseta Manga larga',
    Categoria: 'Camisetas',
    Sexo: 'hombre',
    Precio: '25',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Not available',
    img: '',
    originalIMG: false
  },
  {
    Nombre: 'Plumifero',
    Categoria: 'Plumas',
    Sexo: 'unisex',
    Precio: '47',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'plumifero.png',
    originalIMG: true
  },
  {
    Nombre: 'Gorra',
    Categoria: 'Complementos',
    Sexo: 'unisex',
    Precio: '15',
    Tallas: 's m l',
    Descripcion: 'Solo disponible en color blanco',
    img: 'gorra.png',
    originalIMG: true
  },
  {
    Nombre: 'Camiseta',
    Categoria: 'Camisetas',
    Sexo: 'niñ@s',
    Precio: '18',
    Tallas: '2 4 6 8 10 12',
    Descripcion: 'Not available',
    img: '',
    originalIMG: false
  },
  {
    Nombre: 'Sudadera',
    Categoria: 'Sudadera',
    Sexo: 'niñ@s',
    Precio: '45',
    Tallas: '2 4 6 8 10 12',
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
