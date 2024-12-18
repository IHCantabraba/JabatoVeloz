import { Settings } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'

const UserMEnu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const { dispatch } = useValue()
  /* no element related to this menu */
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null)
  }

  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={handleCloseUserMenu}
      onClick={handleCloseUserMenu}
    >
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize='small'>Profile</Settings>
        </ListItemIcon>
      </MenuItem>
      <MenuItem
        onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}
      >
        <ListItemIcon>
          <Logout fontSize='small'>Logout</Logout>
        </ListItemIcon>
      </MenuItem>
    </Menu>
  )
}

export default UserMEnu
