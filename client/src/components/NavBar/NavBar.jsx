import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import { useValue } from '../../context/ContextProvider'
import { Menu, Lock } from '@mui/icons-material'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import LightModeIcon from '@mui/icons-material/LightMode'
import UserIcon from '../User/UserIcon'
import Sidebar from '../Sidebar/Sidebar'
import { useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    state: { currentUser, light, productPage, showThemes },
    dispatch
  } = useValue()

  return (
    <>
      <AppBar
        style={{
          backgroundColor: `var(--ihc-toolbar-${
            !currentUser ? 'none' : light ? 'light' : 'dark'
          }-mode)`,
          // justifyContent: 'space-between'
          flexGrow: '1'
        }}
      >
        <Container maxWidth='lg' sx={{ mr: 0, ml: 0 }}>
          <Toolbar disableGutters style={{ width: '95vw', margin: '0 auto' }}>
            <Box sx={{ mr: 1 }}>
              {productPage && currentUser && (
                <IconButton
                  size='large'
                  color='inherit'
                  onClick={() => setIsOpen(true)}
                >
                  <TuneIcon
                    style={{
                      color: `var(--ihc-${
                        !currentUser ? 'white' : light ? 'light' : 'dark'
                      }-mode-text)`
                    }}
                  />
                </IconButton>
              )}
            </Box>
            <Typography
              variant='h6'
              component='h1'
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
              style={{
                color: `var(--ihc-${
                  !currentUser ? 'white' : light ? 'light' : 'dark'
                }-mode-text)`
              }}
            >
              Jabato
              <span style={{ color: 'orange', fontWeight: 'bold' }}>Veloz</span>
            </Typography>
            <Typography
              variant='h6'
              component='h1'
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              style={{
                color: `var(--ihc-${
                  !currentUser ? 'white' : light ? 'light' : 'dark'
                }-mode-text)`
              }}
            >
              JV
            </Typography>
            {!currentUser ? (
              <Button
                color='inherit'
                startIcon={<Lock />}
                onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
                style={{
                  color: `var(--ihc-${
                    !currentUser ? 'white' : light ? 'light' : 'dark'
                  }-mode-text)`
                }}
              >
                Login
              </Button>
            ) : (
              <UserIcon />
            )}
            {!currentUser ? (
              ''
            ) : light ? (
              <LightModeIcon
                style={{
                  fontSize: '40px',
                  paddingLeft: '0.5rem',
                  color: `var(--ihc-${
                    !currentUser ? 'white' : light ? 'light' : 'dark'
                  }-mode-text)`
                }}
                onClick={() => dispatch({ type: 'DARK_THEME', payload: false })}
              />
            ) : (
              <ModeNightIcon
                style={{
                  fontSize: '30px',
                  color: `var(--ihc-${
                    !currentUser ? 'white' : light ? 'light' : 'dark'
                  }-mode-text)`
                }}
                onClick={() => dispatch({ type: 'LIGHT_THEME', payload: true })}
              />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Sidebar {...{ isOpen, setIsOpen }} />
    </>
  )
}

export default NavBar
