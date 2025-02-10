import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'
import { Mail, Notifications } from '@mui/icons-material'
import UserMEnu from './UserMEnu'
import { useState } from 'react'
import { useValue } from '../../../../context/ContextProvider'
const UserIcon = () => {
  const {
    state: {
      userManager: { currentUser }
    }
  } = useValue()

  const [anchorUserMenu, setAnchorUserMenu] = useState(false)
  return (
    <Box>
      <Tooltip title='Open User Settings'>
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={currentUser?.user.img} alt={currentUser?.user.name}>
            {currentUser?.user.nombre?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMEnu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  )
}

export default UserIcon
