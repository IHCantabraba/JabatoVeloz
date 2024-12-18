import { createContext, useContext, useReducer } from 'react'
import Reducer from './Reducer'

const initialState = {
  currentUser: null,
  light: true,
  openLogin: false
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
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default ContextProvider
