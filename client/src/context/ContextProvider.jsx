import { createContext, useContext, useEffect, useReducer, useRef } from 'react'
import Reducer from './Reducer'

const initialState = {
  currentUser: null,
  light: true,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false, file: null, photoURL: '' },
  details: { title: '', description: '' },
  FechaPedido: '',
  isAdmin: false,
  pedidos: null,
  productos: null,
  priceFilter: 100,
  filterProducts: [],
  product: null,
  productoEliminado: false
}
/* crear un contexto */
const Context = createContext(initialState)
/* crear un custom hook */
export const useValue = () => {
  return useContext(Context)
}
/* crear un provider */
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const containerRef = useRef()
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const AdminState = localStorage.getItem('isAdmin')
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
  }, [])
  return (
    <Context.Provider value={{ state, dispatch, containerRef }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
