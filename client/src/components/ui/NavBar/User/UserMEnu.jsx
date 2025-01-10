import { Settings } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { Logout } from '@mui/icons-material'
import Profile from '../Profile/Profile'
import { useValue } from '../../../../context/ContextProvider'

const UserMEnu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const {
    state: { currentUser, productPage },
    dispatch
  } = useValue()
  /* no element related to this menu */
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null)
  }

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() =>
            dispatch({
              type: 'UPDATE_PROFILE',
              payload: {
                open: true,
                file: null,
                photoURL: currentUser?.result.user.img
              }
            })
          }
        >
          <ListItemIcon>
            <Settings fontSize='small'>Profile</Settings>
          </ListItemIcon>
          Profile
        </MenuItem>
        {/* en logout click, actualizar el current user a null */}
        <MenuItem
          onClick={() => {
            dispatch({
              type: 'UPDATE_USER',
              payload: null
            })
            dispatch({ type: 'NOT_ADMIN' })
            dispatch({ type: 'HIDE_FILTERS' })
            dispatch({ type: 'HIDE_THEME_SWITCHER' })
          }}
        >
          <ListItemIcon>
            <Logout fontSize='small'>Logout</Logout>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile></Profile>
    </>
  )
}

export default UserMEnu
