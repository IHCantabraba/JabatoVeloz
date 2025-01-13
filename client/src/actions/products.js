import fetchingData from './utils/fetchingData'
const baseUrl = import.meta.env.VITE_BaseName

export const getProducts = async (dispatch, token, seriegrafias) => {
  dispatch({ type: 'START_LOADING' })
  const productos = await fetchingData(
    { url: `${baseUrl}/api/productos`, method: 'GET', token: token },
    dispatch
  )
  if (productos.success) {
    dispatch({ type: 'UPDATE_PRODUCTOS', payload: productos.result })
  }
  /* obtener las seriegrafias exitentes para los productos si no se han cargado aún */
  if (!seriegrafias) {
    const seriegrafias = await fetchingData(
      { url: `${baseUrl}/api/seriegrafias`, method: 'GET', token: token },
      dispatch
    )
    if (seriegrafias.success) {
      dispatch({ type: 'UPDATE_SERIEGRAFIAS', payload: seriegrafias.result })
    }
  }
  dispatch({ type: 'END_LOADING' })

  return productos
}

export const deleteProduct = async (dispatch, id, productoEliminado, token) => {
  dispatch({ type: 'START_LOADING' })

  const deleteProducto = await fetchingData(
    {
      url: `${baseUrl}/api/productos/${id}`,
      method: 'DELETE',
      token: token
    },
    dispatch
  )
  if (deleteProducto.success) {
    if (productoEliminado === 'yes') {
      console.log('productoEliminado es true')
      dispatch({ type: 'PRODUCTO_ELIMINADO', payload: 'no' })
    } else {
      console.log('productoEliminado es false')
      dispatch({ type: 'PRODUCTO_ELIMINADO', payload: 'yes' })
    }
    dispatch({ type: 'END_LOADING' })
  }
  return deleteProduct
}
export const addProduct = async (dispatch, currentUser, data, setPage) => {
  dispatch({ type: 'START_LOADING' })

  const {
    Nombre,
    Categoria,
    Descripcion,
    Tallas,
    Genero,
    Precio,
    Photo,
    originalIMG
  } = data
  const productInfo = new FormData()
  productInfo.append('Nombre', Nombre)
  productInfo.append('Categoria', Categoria)
  productInfo.append('Sexo', Genero.toLowerCase())
  productInfo.append('Precio', Precio)
  productInfo.append('Tallas', Tallas.toString().replace(',', ' '))
  productInfo.append('Descripcion', Descripcion)
  productInfo.append('img', Photo)
  productInfo.append('originalIMG', originalIMG)

  const addedProduct = await fetch(`${baseUrl}/api/productos/producto`, {
    headers: { Authorization: `Bearer ${currentUser.result.token}` },
    method: 'POST',
    body: productInfo
  })
  const result = await addedProduct.json()
  if (result.success) {
    console.log('success')
    /* TODO fix reset form */
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'Producto añadido correctamente'
      }
    })
    dispatch({ type: 'UPDATE_NEW_PROD_PHOTO', payload: './Prof.png' })
    setPage(3)
  }
  dispatch({ type: 'END_LOADING' })
}

export const getCategoriasAndGeneros = (filterProducts, dispatch) => {
  const Categorias = []
  const Generos = []
  const Tallas = []
  filterProducts.map((product) => {
    const productTallas = product.Tallas.split(' ')
    if (!Categorias.includes(product.Categoria)) {
      Categorias.push(product.Categoria)
    }
    for (const talla of productTallas) {
      if (!Tallas.includes(talla)) Tallas.push(talla)
    }
    if (!Generos.includes(product.Sexo)) {
      Generos.push(product.Sexo)
    }
  })
  if (Categorias.length > 0) {
    dispatch({ type: 'UPDATE_CATEGORIAS', payload: Categorias })
  }

  if (Generos.length > 0) {
    dispatch({ type: 'UPDATE_GENEROS', payload: Generos })
  }
  if (Tallas.length > 0) {
    dispatch({ type: 'UPDATE_TALLAS', payload: Tallas })
  }

  return Categorias
}
