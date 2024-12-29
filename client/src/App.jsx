import { useEffect } from 'react'
import './App.css'
import Loading from './components/Loading/Loading'
import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'
import Notis from './components/Notis/Notis'
import { useValue } from './context/ContextProvider'
import BottomNAv from './components/User/BottomNAv'
import LandingPage from './components/Landing/LandingPage'

function App() {
  const {
    state: { light, currentUser }
  } = useValue()

  return (
    <>
      {!currentUser && <LandingPage />}
      <Loading />
      <Notis />
      {/* TODO revisar otra forma de cambiar el color al background */}
      {/* <div
        className='app-body'
        style={{
          backgroundColor: `var(--ihc-${light ? 'light' : 'dark'}-mode-bg)`,
          color: `var(--ihc-${light ? 'light' : 'dark'}-mode-text)`,
          transition: 'all 0.5s',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100vh'
        }}
      ></div> */}
      <Login />
      <NavBar />
      {currentUser && <BottomNAv />}
    </>
  )
}

export default App
