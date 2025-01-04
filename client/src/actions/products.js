import { useValue } from '../context/ContextProvider'
import fetchingData from './utils/fetchingData'
const baseUrl = import.meta.env.VITE_BaseName

export const getProducts = async (dispatch) => {
  dispatch({ type: 'START_LOADING' })
  const productos = await fetchingData(
    { url: `${baseUrl}/api/productos`, method: 'GET' },
    dispatch
  )
  if (productos.success) {
    dispatch({ type: 'UPDATE_PRODUCTOS', payload: productos.result })
    dispatch({ type: 'END_LOADING' })
  }
  return productos
}

export const deleteProduct = async (dispatch, id) => {
  dispatch({ type: 'START_LOADING' })

  const deleteProducto = await fetchingData(
    {
      url: `${baseUrl}/api/productos/${id}`,
      method: 'DELETE'
    },
    dispatch
  )
  if (deleteProducto.success) {
    /* TODO actualizar productos una vez eliminado uno.*/
    // dispatch({ type: 'UPDATE_PRODUCTOS', payload: productosFiltrados })
    dispatch({ type: 'END_LOADING' })
  }

  return deleteProduct
}
