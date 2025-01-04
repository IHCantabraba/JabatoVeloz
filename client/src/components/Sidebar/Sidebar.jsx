import React from 'react'
import { Box, Drawer, IconButton, styled, Typography } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import PriceFilter from './PriceFilter'
const DraweHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))
const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer variant='persistent' hideBackdrop={true} open={isOpen}>
      <DraweHeader>
        <Typography>Filtrar Productos</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize='large' />
        </IconButton>
      </DraweHeader>
      <Box sx={{ width: 240, p: 3 }}>
        <PriceFilter />
      </Box>
    </Drawer>
  )
}

export default Sidebar
