import { createContext, useContext, useEffect, useReducer } from 'react'
import Reducer from './Reducer'

const initialState = {
  currentUser: null,
  light: true,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false, file: null, photoURL: '' }
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
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser })
    }
  })
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default ContextProvider
