import { useEffect } from 'react'
import './App.css'
import Loading from './components/Loading/Loading'
import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'
import Notis from './components/Notis/Notis'
import { useValue } from './context/ContextProvider'

function App() {
  const {
    state: { light }
  } = useValue()

  return (
    <>
      {/* TODO revisar otra forma de cambiar el color al background */}
      <Loading />
      <Notis />
      <div
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
      ></div>
      <Login />
      <NavBar />
    </>
  )
}

export default App
