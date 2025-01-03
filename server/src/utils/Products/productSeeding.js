import fs from 'fs'
import csv from 'csv-parser'
import Productos from '../../api/models/productos.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const array = [
  {
    Nombre: 'Camiseta Trail Alpes',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '34',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    Foto: 'ALpes_Camiseta.png'
  },
  {
    Nombre: 'Camiseta Sin Mangas Alpes',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '31',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    Foto: 'camiseta_SM.png'
  },
  {
    Nombre: 'Camiseta Manga Corta Cross',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '30',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    Foto: 'avance_cross.png'
  },
  {
    Nombre: 'Camiseta Manga Corta Adv.',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '31',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Con Gorro Bolsillo espalda y menbrana',
    Foto: 'avance_cross.png'
  },
  {
    Nombre: 'Paravientos Sherpa',
    Categoria: 'Cortavientos',
    Sexo: 'unisex',
    Precio: '65',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    Foto: 'avance_cross.png'
  },
  {
    Nombre: 'Paravientos Terry',
    Categoria: 'Cortavientos',
    Sexo: 'unisex',
    Precio: '65',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Con Gorro y membrana',
    Foto: ''
  },
  {
    Nombre: 'Paravientos',
    Categoria: 'Cortavientos',
    Sexo: 'unisex',
    Precio: '48',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Sin Gorro 2 bosillos con cremallera',
    Foto: 'Paravientos.png'
  },
  {
    Nombre: 'Chaleco Challange',
    Categoria: 'Chaleco',
    Sexo: 'unisex',
    Precio: '39.5',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Bolsillo en la espalda',
    Foto: 'avance_cross.png'
  },
  {
    Nombre: 'Pantalon de Trail corto',
    Categoria: 'Pantalones',
    Sexo: 'mujer',
    Precio: '31.5',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    Foto: 'Pantalon_trail_chica.png'
  },
  {
    Nombre: 'Pantalon de Trail corto',
    Categoria: 'Pantalones',
    Sexo: 'hombre',
    Precio: '31.5',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Not available',
    Foto: 'Pantalon_trail.png'
  },
  {
    Nombre: 'Sudadera Alaska',
    Categoria: 'Sudaderas',
    Sexo: 'unisex',
    Precio: '48',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Sudadera con capucha',
    Foto: 'sudadera_alaska.png'
  },
  {
    Nombre: 'Pantaloneta',
    Categoria: 'Pantalones',
    Sexo: 'unisex',
    Precio: '29',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    Foto: 'Pantaloneta.png'
  },
  {
    Nombre: 'Pantalon largo',
    Categoria: 'Pantalones',
    Sexo: 'unisex',
    Precio: '25',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Chandal con logo bordado. Solo disponibl en color negro',
    Foto: 'Pantalon_largo.png'
  },
  {
    Nombre: 'Pantalon de Trail corto',
    Categoria: 'Pantalones',
    Sexo: 'unisex',
    Precio: '30',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    Foto: 'Malla_corta.png'
  },
  {
    Nombre: 'Falda',
    Categoria: 'Pantalones',
    Sexo: 'mujer',
    Precio: '317',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    Foto: 'Pantalon_trail_chica.png'
  },
  {
    Nombre: 'Manguitos Verano',
    Categoria: 'Complementos',
    Sexo: 'unisex',
    Precio: '12.10',
    Tallas: 'unica',
    Descripcion: 'Not available',
    Foto: 'manguitos.png'
  },
  {
    Nombre: 'Manguitos Invierno',
    Categoria: 'Complementos',
    Sexo: 'unisex',
    Precio: '13.5',
    Tallas: 'unica',
    Descripcion: 'Not available',
    Foto: 'manguitos.png'
  },
  {
    Nombre: 'Malliot manga corta Summun',
    Categoria: 'Malliots',
    Sexo: 'hombre',
    Precio: '52',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Not available',
    Foto: ''
  },
  {
    Nombre: 'Malliot manga corta Summun',
    Categoria: 'Malliots',
    Sexo: 'mujer',
    Precio: '52',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    Foto: ''
  },
  {
    Nombre: 'Culotte corto',
    Categoria: 'Culottes',
    Sexo: 'hombre',
    Precio: '70',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Culotte con tirantes',
    Foto: ''
  },
  {
    Nombre: 'Culotte corto',
    Categoria: 'Culottes',
    Sexo: 'mujer',
    Precio: '70',
    Tallas: 'xs s m l xl',
    Descripcion: 'Culotte con tirantes',
    Foto: ''
  },
  {
    Nombre: 'Top corto',
    Categoria: 'Camisetas',
    Sexo: 'mujer',
    Precio: '26',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    Foto: ''
  },
  {
    Nombre: 'Polo',
    Categoria: 'Camisetas',
    Sexo: 'unisex',
    Precio: '33',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Solo disponible en color negro',
    Foto: 'polo.png'
  },
  {
    Nombre: 'Personalización',
    Categoria: 'otros',
    Sexo: 'unisex',
    Precio: '2',
    Tallas: 'unica',
    Descripcion:
      'Personaliza la ropa que quieras adquirir con tu nombre o el de los tuyos.',
    Foto: ''
  },
  {
    Nombre: 'Camiseta Manga larga',
    Categoria: 'Camisetas',
    Sexo: 'mujer',
    Precio: '25',
    Tallas: 'xs s m l xl',
    Descripcion: 'Not available',
    Foto: ''
  },
  {
    Nombre: 'Camiseta Manga larga',
    Categoria: 'Camisetas',
    Sexo: 'hombre',
    Precio: '25',
    Tallas: 's m l xl 2xl',
    Descripcion: 'Not available',
    Foto: ''
  },
  {
    Nombre: 'Plumifero',
    Categoria: 'Plumas',
    Sexo: 'unisex',
    Precio: '47',
    Tallas: 'xs s m l xl 2xl',
    Descripcion: 'Not available',
    Foto: 'plumifero.png'
  },
  {
    Nombre: 'Gorra',
    Categoria: 'Complementos',
    Sexo: 'unisex',
    Precio: '15',
    Tallas: 's m l',
    Descripcion: 'Solo disponible en color blanco',
    Foto: 'gorra.png'
  },
  {
    Nombre: 'Camiseta',
    Categoria: 'Camisetas',
    Sexo: 'niñ@s',
    Precio: '18',
    Tallas: '2 4 6 8 10 12',
    Descripcion: 'Not available',
    Foto: ''
  },
  {
    Nombre: 'Sudadera',
    Categoria: 'Sudadera',
    Sexo: 'niñ@s',
    Precio: '45',
    Tallas: '2 4 6 8 10 12',
    Descripcion: 'Not available',
    Foto: ''
  }
]
dotenv.config()
/* de Array a CSV */
const Array2CSV = (array) => {
  let stringFinal = ``
  for (const key in array[0]) {
    stringFinal += `${key},`
  }
  stringFinal = stringFinal.slice(0, stringFinal.length - 1)
  stringFinal += '\n'

  for (const elemento of array) {
    stringFinal += `${elemento.Nombre},${elemento.Categoria},${elemento.Sexo},${elemento.Precio},${elemento.Tallas},${elemento.Descripcion},${elemento.Foto}\n`
  }
  fs.writeFile(
    './src/utils/Products/productos.csv',
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

const products = []
fs.createReadStream('./src/utils/Products/productos.csv')
  .pipe(csv())
  .on('data', (data) => products.push(data))
  .on('end', () => {
    console.log(products)
    /* TODO definir esquema de producto */
    mongoose
      .connect(process.env.DB_URL)
      .then(async () => {
        try {
          await Productos.collection.drop()
          console.log('Colección limpia')
        } catch (error) {
          console.log('No se ha podido limpiar la colección de los productos')
        }

        try {
          await Productos.insertMany(products)
          console.log('Todos los productos se han insertado ')
        } catch (error) {
          console.log('No se han podido insertar los productos')
        }
      })
      .finally(() => mongoose.disconnect())
  })
