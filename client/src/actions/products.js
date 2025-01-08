import { useValue } from '../context/ContextProvider'
import fetchingData from './utils/fetchingData'
const baseUrl = import.meta.env.VITE_BaseName

export const getProducts = async (dispatch, token) => {
  dispatch({ type: 'START_LOADING' })
  const productos = await fetchingData(
    { url: `${baseUrl}/api/productos`, method: 'GET', token: token },
    dispatch
  )
  if (productos.success) {
    dispatch({ type: 'UPDATE_PRODUCTOS', payload: productos.result })
    dispatch({ type: 'END_LOADING' })
  }
  return productos
}

export const deleteProduct = async (dispatch, id, productoEliminado) => {
  dispatch({ type: 'START_LOADING' })

  const deleteProducto = await fetchingData(
    {
      url: `${baseUrl}/api/productos/${id}`,
      method: 'DELETE'
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
