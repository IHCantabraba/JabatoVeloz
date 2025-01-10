import './App.css'
import Loading from './components/Loading/Loading'
import Login from './components/ui/Login/Login'
import NavBar from './components/ui/NavBar/NavBar'
import Notis from './components/Notis/Notis'
import { useValue } from './context/ContextProvider'

import LandingPage from './components/ui/Landing/LandingPage'
import ProductDialog from './components/ProductDialog/ProductDialog'
import PedidoDialog from './components/PedidoDialog/PedidoDialog'
import BottomNAv from './components/ui/BottomNAv/BottomNAv'

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
