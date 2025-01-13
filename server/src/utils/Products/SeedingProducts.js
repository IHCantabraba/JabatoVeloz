import fs from 'fs'
import csv from 'csv-parser'
import Productos from '../../api/models/productos.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cloudinaryConfig from '../../config/cloudinary.js'
import cloudinary from 'cloudinary'

dotenv.config()
cloudinaryConfig()
const array = [
  {
    Nombre: 'Camiseta Trail Alpes',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '34',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'ALpes_Camiseta.png'
  },
  {
    Nombre: 'Paravientos Terry',
    Categoria: 'Cortavientos',
    Sexo: 'unisex',
    Precio: '65',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Con Gorro y membrana',
    img: ''
  },
  {
    Nombre: 'Camiseta Sin Mangas Alpes',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '31',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'camiseta_SM.png'
  },
  {
    Nombre: 'Camiseta Manga Corta Cross',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '30',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'avance_cross.png'
  },
  {
    Nombre: 'Camiseta Manga Corta Adv.',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '31',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Con Gorro Bolsillo espalda y menbrana',
    img: 'avance_cross.png'
  },
  {
    Nombre: 'Paravientos Sherpa',
    Categoria: 'Cortavientos',
    Sexo: 'unisex',
    Precio: '65',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'Paravientos.png'
  },
  {
    Nombre: 'Paravientos',
    Categoria: 'Cortavientos',
    Sexo: 'unisex',
    Precio: '48',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Sin Gorro 2 bosillos con cremallera',
    img: 'Paravientos.png'
  },
  {
    Nombre: 'Chaleco Challange',
    Categoria: 'Chaleco',
    Sexo: 'unisex',
    Precio: '39.5',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Bolsillo en la espalda',
    img: 'chaleco.png'
  },
  {
    Nombre: 'Pantalon de Trail corto',
    Categoria: 'Pantalones',
    Sexo: 'mujer',
    Precio: '31.5',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: 'Pantalon_trail_chica.png'
  },
  {
    Nombre: 'Pantalon de Trail corto',
    Categoria: 'Pantalones',
    Sexo: 'hombre',
    Precio: '31.5',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Not available',
    img: 'Pantalon_trail.png'
  },
  {
    Nombre: 'Sudadera Alaska',
    Categoria: 'Sudaderas',
    Sexo: 'unisex',
    Precio: '48',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Sudadera con capucha',
    img: 'sudadera_alaska.png'
  },
  {
    Nombre: 'Pantaloneta',
    Categoria: 'Pantalones',
    Sexo: 'unisex',
    Precio: '29',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'Pantaloneta.png'
  },
  {
    Nombre: 'Pantalon largo',
    Categoria: 'Pantalones',
    Sexo: 'unisex',
    Precio: '25',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Chandal con logo bordado. Solo disponibl en color negro',
    img: 'Pantalon_largo.png'
  },
  {
    Nombre: 'Pantalon de Trail corto',
    Categoria: 'Pantalones',
    Sexo: 'unisex',
    Precio: '30',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'Malla_corta.png'
  },
  {
    Nombre: 'Falda',
    Categoria: 'Pantalones',
    Sexo: 'mujer',
    Precio: '31',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: 'Pantalon_trail_chica.png'
  },
  {
    Nombre: 'Manguitos Verano',
    Categoria: 'Complementos',
    Sexo: 'unisex',
    Precio: '12.10',
    Tallas: 'unica',
    Descripcion: 'Not available',
    img: 'manguitos.png'
  },
  {
    Nombre: 'Manguitos Invierno',
    Categoria: 'Complementos',
    Sexo: 'unisex',
    Precio: '13.5',
    Tallas: 'unica',
    Descripcion: 'Not available',
    img: 'manguitos.png'
  },
  {
    Nombre: 'Malliot manga corta Summun',
    Categoria: 'Malliots',
    Sexo: 'hombre',
    Precio: '52',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Not available',
    img: ''
  },
  {
    Nombre: 'Malliot manga corta Summun',
    Categoria: 'Malliots',
    Sexo: 'mujer',
    Precio: '52',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: ''
  },
  {
    Nombre: 'Culotte corto',
    Categoria: 'Culottes',
    Sexo: 'hombre',
    Precio: '70',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Culotte con tirantes',
    img: ''
  },
  {
    Nombre: 'Culotte corto',
    Categoria: 'Culottes',
    Sexo: 'mujer',
    Precio: '70',
    Tallas: 'xs s m l xl',
    Descripcion: 'Culotte con tirantes',
    img: ''
  },
  {
    Nombre: 'Top corto',
    Categoria: 'Camisetas',
    Sexo: 'mujer',
    Precio: '26',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: ''
  },
  {
    Nombre: 'Polo',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '33',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Solo disponible en color negro',
    img: 'polo.png'
  },
  {
    Nombre: 'Camiseta Manga larga',
    Categoria: 'Camisetas',
    Sexo: 'mujer',
    Precio: '25',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    img: ''
  },
  {
    Nombre: 'Camiseta Manga larga',
    Categoria: 'Camisetas',
    Sexo: 'hombre',
    Precio: '25',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Not available',
    img: ''
  },
  {
    Nombre: 'Plumifero',
    Categoria: 'Plumas',
    Sexo: 'unisex',
    Precio: '47',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    img: 'plumifero.png'
  },
  {
    Nombre: 'Gorra',
    Categoria: 'Complementos',
    Sexo: 'unisex',
    Precio: '15',
    Tallas: 's m l',
    Descripcion: 'Solo disponible en color blanco',
    img: 'gorra.png'
  },
  {
    Nombre: 'Camiseta',
    Categoria: 'Camisetas',
    Sexo: 'niñ@s',
    Precio: '18',
    Tallas: '2 4 6 8 10 12',
    Descripcion: 'Not available',
    img: ''
  },
  {
    Nombre: 'Sudadera',
    Categoria: 'Sudadera',
    Sexo: 'niñ@s',
    Precio: '45',
    Tallas: '2 4 6 8 10 12',
    Descripcion: 'Not available',
    img: ''
  }
]

/* de Array a CSV */
const Array2CSV = (array) => {
  let stringFinal = ``
  for (const key in array[0]) {
    stringFinal += `${key},`
  }
  stringFinal = stringFinal.slice(0, stringFinal.length - 1)
  stringFinal += '\n'

  for (const elemento of array) {
    stringFinal += `${elemento.Nombre},${elemento.Categoria},${elemento.Sexo},${elemento.Precio},${elemento.Tallas},${elemento.Descripcion},${elemento.img}\n`
  }
  fs.writeFile(
    './src/utils/Products/ImageProducts.csv',
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
const resultCSV = Array2CSV(array)
const seedProducts = async (productos) => {
  const options = { folder: 'Jveloz/Products' }
  let Nopic = 'NoPic.jpg'
  let Foto
  let cloudPhotURL
  try {
    await mongoose.connect(process.env.DB_URL)
    await Productos.collection.drop()
    for (const producto of productos) {
      console.log(producto.img)
      if (producto.img !== '') {
        Foto = producto.img
      } else {
        Foto = Nopic
      }
      if (!Foto.includes('https')) {
        const result = await cloudinary.v2.uploader.upload(
          `./clothesPics/${Foto}`,
          options
        )
        if (Foto === 'NoPic.jpg') {
          if (result) {
            Nopic = result.secure_url
            console.log('reasigned Nopic path to cloudinary image path')
          }
        }
        if (result) {
          console.log('photo uploaded')
          console.log(`secure_url is: ${result.secure_url}`)
          cloudPhotURL = result.secure_url
        }
      } else {
        cloudPhotURL = Nopic
      }

      const newProduct = new Productos({
        Nombre: producto.Nombre,
        Categoria: producto.Categoria,
        Sexo: producto.Sexo,
        Precio: producto.Precio,
        Tallas: producto.Tallas,
        Descripcion: producto.Descripción,
        img: cloudPhotURL
      })
      await newProduct.save()
    }
    mongoose.disconnect()
  } catch (error) {
    console.log(error)
    mongoose.disconnect()
  }
}

const productos = []
fs.createReadStream('./src/utils/Products/ImageProducts.csv')
  .pipe(csv())
  .on('data', (data) => productos.push(data))
  .on('end', () => seedProducts(productos))
