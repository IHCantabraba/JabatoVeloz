import { createContext, useContext, useEffect, useReducer, useRef } from 'react'

import RootReducer from './RootReducer'

const initialState = {
  appManager: {
    login: { openLogin: false },
    theme: { light: true },
    alert: { open: false, severity: 'info', message: '' },
    page: { productPage: false },
    loading: false,
    isAdmin: false,
    showThemes: false
  },
  userManager: {
    profile: { open: false, file: null, photoURL: '' },
    currentUser: null
  },
  productsManager: {
    productos: null,
    priceFilter: 100,
    filterProducts: [],
    productoEliminado: false,
    product: null,
    Categorias: null,
    Generos: null,
    Tallas: null,
    newProductPhoto: './assets/Prof.png'
  },
  seriegrafiaManager: {
    seriegrafia: null,
    AvaliableSeriegrafia: null
  },
  pedidosManager: {
    details: { title: '', description: '' },
    pedidos: null,
    FechaPedido: '',
    pedido: null,
    miRopa: null,
    OpenPedido: null
  }
}
/* crear un contexto */
const Context = createContext(initialState)
/* crear un custom hook */
export const useValue = () => {
  return useContext(Context)
}
/* crear un provider */
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RootReducer, initialState)
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const AdminState = localStorage.getItem('isAdmin')
    const showFilter = localStorage.getItem('showFilter')
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser })
    }
    /* evita que en page refresh se resetee el valor dela variable global */
    if (AdminState === 'true') {
      localStorage.setItem('isAdmin', 'true')
      dispatch({ type: 'IS_ADMIN' })
    } else {
      localStorage.setItem('isAdmin', 'false')
    }

    if (showFilter === 'true') {
      localStorage.setItem('showFilter', true)
    } else {
      localStorage.setItem('showFilter', false)
    }
  }, [])
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default ContextProvider
