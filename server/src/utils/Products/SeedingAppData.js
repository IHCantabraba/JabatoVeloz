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
import Seriegrafias from '../../api/models/seriegrafia.js'

dotenv.config()
cloudinaryConfig()
/* create path to end file */
const __file = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__file)
let NOPIC = 'NoPic.jpg'
/* insertar datos en DB */
/* subir imagen de producto a cloudinary */
const uploadPic = async (img, NoPic) => {
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
      { folder: `${process.env.PRJ_NAME}/Products` }
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
    console.log('keeping the Nopic url from cloudinary')
    cloudPhotURL = NoPicture
  }
  return { cloud: cloudPhotURL, nopic: NoPicture }
}
/* funcines para insertar datos */
const populateUsers = async (sheetData, sheetName) => {
  if (sheetData.length > 0) {
    console.log(`Inserting data from sheet: ${sheetName}`)
    await User.collection.drop()
    for (const user of sheetData) {
      const newUser = new User(user)
      await newUser.save(newUser)
    }
    console.log('Data successfully inserted into DB')
  } else {
    console.log(`sheet ${sheetName}is empty. Nothing to do`)
  }
}
const populateSeriegrafias = async (sheetData, sheetName) => {
  if (sheetData.length > 0) {
    console.log(`Inserting data from sheet: ${sheetName}`)
    await Seriegrafias.collection.drop()
    await Seriegrafias.insertMany(sheetData)
    console.log('Data successfully inserted into DB')
  } else {
    console.log(`sheet ${sheetName}is empty. Nothing to do`)
  }
}
const populateProductos = async (sheetData, sheetName) => {
  if (sheetData.length > 0) {
    console.log(`Inserting data from sheet: ${sheetName}`)
    await Productos.collection.drop()
    for (const product of sheetData) {
      const result = await uploadPic(product.img, NOPIC)
      NOPIC = result.nopic
      console.log(`NoPIC has been reseted to: ${NOPIC}`)
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
const populatePedidos = async (sheetData, sheetName) => {
  if (sheetData.length > 0) {
    console.log(`Inserting data from sheet: ${sheetName}`)
    await Pedidos.collection.drop()
    for (const pedido of sheetData) {
      const user = await User.findOne({ dni: pedido.users })
      if (user) {
        pedido.users = user._id
      }
      const newPedido = new Pedidos(pedido)
      await newPedido.save()
    }
    console.log('Data successfully inserted into DB')
  } else {
    console.log(`sheet ${sheetName}is empty. Nothing to do`)
  }
}
const populateOrders = async (sheetData, sheetName) => {
  if (sheetData.length > 0) {
    console.log(`Inserting data from sheet: ${sheetName}`)
    await Orders.collection.drop()
    for (const order of sheetData) {
      /* obtener el usuario que hizo la order */
      const user = await User.findOne({ dni: order.users })
      if (user) {
        /* obeten prducto ordenado */
        const producto = await Productos.findOne({
          Nombre: order.productos
        })
        /* obtener en qué pedido está la orden */
        const pedido = await Pedidos.findOne({
          ExpireDate: order.pedidos
        })
        /* insertar en la order los _id de usuario, producto y pedido para usar depsues .populate() */
        order.users = user._id
        order.productos = producto?._id
        order.pedidos = pedido?._id
        const newOrder = new Orders(order)
        await newOrder.save()
        /* actualizar las ordenes del pedido */
        pedido.orders.push(newOrder._id)
        await Pedidos.findByIdAndUpdate(pedido._id, pedido, {
          new: true
        })
        /* actualizar las ordenes del usuario */
        user.orders.push(newOrder._id)
        await User.findByIdAndUpdate(user._id, user, { new: true })
      } else {
        console.log(`no user found ${order.users}`)
      }
    }
    console.log('Data successfully inserted into DB')
  } else {
    console.log(`sheet ${sheetName}is empty. Nothing to do`)
  }
}
/* recorrer el libro excel con hojas y popularizar */
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
      //   await populateUsers(sheetData, sheetName)
      // }
      // if (sheetName === 'seriegrafias') {
      //   await populateSeriegrafias(sheetData, sheetName)
      // }
      if (sheetName === 'productos') {
        await populateProductos(sheetData, sheetName)
      }
      // if (sheetName === 'pedidos') {
      //   await populatePedidos(sheetData, sheetName)
      // }
      // if (sheetName === 'orders') {
      //   await populateOrders(sheetData, sheetName)
      // }
    }
  } catch (error) {
    console.error('Error while populating MongoDB:', error)
  } finally {
    await mongoose.disconnect()
  }
}
populateData(path.join(__dirname, 'datosApp.xlsx'))
