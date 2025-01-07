import { useEffect } from 'react'
import './App.css'
import Loading from './components/Loading/Loading'
import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'
import Notis from './components/Notis/Notis'
import { useValue } from './context/ContextProvider'
import BottomNAv from './components/User/BottomNAv'
import LandingPage from './components/Landing/LandingPage'
import ProductDialog from './components/ProductDialog/ProductDialog'
import PedidoDialog from './components/PedidoDialog/PedidoDialog'

function App() {
  const {
    state: { currentUser }
  } = useValue()

  return (
    <>
      {!currentUser && <LandingPage />}
      <Loading />
      <Notis />
      <Login />
      <NavBar />
      <ProductDialog />
      <PedidoDialog />

      {currentUser && <BottomNAv />}
    </>
  )
}

export default App
