import React, { useEffect, useRef, useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper
} from '@mui/material'
import { LocationOn } from '@mui/icons-material'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import ClusterMap from '../../pages/ClusterMap/ClusterMap'
import Carreras from '../../pages/Carreras/Carreras'
import Pedidos from '../../pages/Pedidos/Pedidos'
import AddPedido from '../../pages/AddPedido/AddPedido'
import { useValue } from '../../context/ContextProvider'
const BottomNAv = () => {
  /* estado que controla el click de cada icono de los existentes en lña barra de navegador. */
  const {
    state: { isAdmin }
  } = useValue()
  const [value, setValue] = useState(0)

  /* al cambiar entre páginas, hacer scroll al inicio  */
  const ref = useRef()
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0
  }, [value])

  return (
    <Box ref={ref}>
      {/* crear un switcher entre páginas en JSX */}

      {isAdmin
        ? {
            0: <ClusterMap />,
            1: <Carreras />,
            2: <Pedidos />,
            3: <AddPedido />
          }[value]
        : { 0: <ClusterMap />, 1: <Carreras />, 2: <Pedidos /> }[value]}
      <Paper
        elevation={3}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label='Map' icon={<LocationOn />} />
          <BottomNavigationAction
            label='Carreras'
            icon={<DirectionsRunIcon />}
          />
          <BottomNavigationAction label='Pedidos' icon={<ShoppingCartIcon />} />
          {isAdmin && (
            <BottomNavigationAction
              label='Añadir Pedido'
              icon={<AddLocationAltIcon />}
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default BottomNAv
