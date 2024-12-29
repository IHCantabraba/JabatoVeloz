import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'
import { Mail, Notifications } from '@mui/icons-material'

import { useValue } from '../../context/ContextProvider'
import UserMEnu from './UserMEnu'
import { useState } from 'react'
const UserIcon = () => {
  const {
    state: { currentUser }
  } = useValue()

  const [anchorUserMenu, setAnchorUserMenu] = useState(false)
  return (
    <Box>
      <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={5}>
          <Mail></Mail>
        </Badge>
      </IconButton>
      {/* iconos de emails, notifcaciones y avatar cuando se ha logueado */}
      <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={10}>
          <Notifications />
        </Badge>
      </IconButton>
      <Tooltip title='Open User Settings'>
        <IconButton>
          <Avatar
            src={currentUser?.result.user.img}
            alt={currentUser?.name}
            onClick={(e) => setAnchorUserMenu(e.currentTarget)}
          >
            {currentUser?.result.user.nombre?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMEnu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  )
}

export default UserIcon
