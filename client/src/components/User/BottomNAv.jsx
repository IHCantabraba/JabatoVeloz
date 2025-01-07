import React, { useEffect, useRef, useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper
} from '@mui/material'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import Carreras from '../../pages/Carreras/Carreras'
import Pedidos from '../../pages/Pedidos/Pedidos'
import AddPedido from '../../pages/AddPedido/AddPedido'
import Products from '../../pages/Products/Products'
import { useValue } from '../../context/ContextProvider'

import CheckroomIcon from '@mui/icons-material/Checkroom'
import Products1 from '../../pages/Products/Products1'
const BottomNAv = () => {
  /* estado que controla el click de cada icono de los existentes en lña barra de navegador. */
  const {
    state: { isAdmin, light, productPage },
    dispatch
  } = useValue()
  const [value, setValue] = useState(3)

  /* al cambiar entre páginas, hacer scroll al inicio  */
  const ref = useRef()
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0
  }, [value])

  return (
    <Box
      ref={ref}
      sx={{ bgcolor: `var(--ihc-${light ? 'light' : 'dark'}-mode-bg-app)` }}
    >
      {/* crear un switcher entre páginas en JSX */}
      {
        {
          // 0: <ClusterMap />,
          0: <Carreras />,
          1: <Pedidos />,
          2: <AddPedido setPage={setValue} />,
          3: <Products1 />
        }[value]
      }
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ bgcolor: `var(--ihc-${light ? 'light' : 'dark'}-mode-bg-nav)` }}
        >
          {/* <BottomNavigationAction label='Map' icon={<LocationOn />} /> */}
          <BottomNavigationAction
            label='Carreras'
            icon={<DirectionsRunIcon />}
            onClick={() => {
              if (productPage) {
                dispatch({ type: 'HIDE_FILTERS' })
              }
            }}
          />
          {isAdmin && (
            <BottomNavigationAction
              label='Pedidos'
              icon={<ShoppingCartIcon />}
              onClick={() => {
                if (productPage) {
                  dispatch({ type: 'HIDE_FILTERS' })
                }
              }}
            />
          )}
          {isAdmin && (
            <BottomNavigationAction
              label='Añadir Pedido'
              icon={<AddLocationAltIcon />}
              onClick={() => {
                if (productPage) {
                  dispatch({ type: 'HIDE_FILTERS' })
                }
              }}
            />
          )}
          <BottomNavigationAction
            label='Ropa'
            icon={<CheckroomIcon />}
            onClick={() => dispatch({ type: 'SHOW_FILTERS' })}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default BottomNAv
