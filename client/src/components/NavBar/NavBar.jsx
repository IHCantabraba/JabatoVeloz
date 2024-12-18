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
const img = 'Prog.png'
const user = { name: 'text', img }
const NavBar = () => {
  // const { light } = useContext(ThemeContext)
  const {
    state: { light }
  } = useValue()
  const {
    state: { currentUser },
    dispatch
  } = useValue()

  return (
    <AppBar
      style={{
        backgroundColor: `var(--ihc-toolbar-${light ? 'light' : 'dark'}-mode)`,
        justifyContent: 'space-between'
      }}
    >
      <Container maxWidth='lg' sx={{ mr: 0, ml: 0 }}>
        <Toolbar disableGutters style={{ width: '95vw' }}>
          <Box sx={{ mr: 1 }}>
            <IconButton size='medium'>
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            style={{
              color: `var(--ihc-${light ? 'light' : 'dark'}-mode-text)`
            }}
          >
            Jabato veloz
          </Typography>
          <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            style={{
              color: `var(--ihc-${light ? 'light' : 'dark'}-mode-text)`
            }}
          >
            JV
          </Typography>
          {!currentUser ? (
            <Button
              color='inherit'
              startIcon={<Lock />}
              onClick={() => dispatch({ type: 'UPDATE_USER', payload: user })}
              style={{
                color: `var(--ihc-${light ? 'light' : 'dark'}-mode-text)`
              }}
            >
              Login
            </Button>
          ) : (
            <UserIcon />
          )}
          {light ? (
            <LightModeIcon
              style={{
                fontSize: '40px',
                paddingLeft: '0.5rem',
                color: `var(--ihc-${light ? 'light' : 'dark'}-mode-text)`
              }}
              onClick={() => dispatch({ type: 'DARK_THEME', payload: false })}
            />
          ) : (
            <ModeNightIcon
              style={{
                fontSize: '30px',
                color: `var(--ihc-${light ? 'light' : 'dark'}-mode-text)`
              }}
              onClick={() => dispatch({ type: 'LIGHT_THEME', payload: true })}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
