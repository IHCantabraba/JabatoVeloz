import { ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../../actions/products'
import { DeleteOutlined, StarBorder } from '@mui/icons-material'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'

const ProductCardMenu = ({
  anchorProductMenu,
  setAnchorProductMenu,
  id,
  dispatch,
  handleClickOpen,
  setEliminado,
  eliminado
}) => {
  const handleCloseProductMenu = () => {
    setAnchorProductMenu(null)
  }
  // const [eliminado, setEliminado] = useState(false)

  const handleClickDelete = (id) => {
    deleteProduct(dispatch, id)
    setEliminado(!eliminado)
  }
  return (
    <>
      {/* vincular el menu al botón del Productcard1 */}
      <Menu
        anchorEl={anchorProductMenu}
        open={Boolean(anchorProductMenu)}
        onClose={handleCloseProductMenu}
        onClick={handleCloseProductMenu}
        sx={{
          '& .MuiPaper-root': { backgroundColor: 'lightgrey' }
        }}
      >
        {/* crear las opciones del menú */}
        <MenuItem onClick={() => handleClickDelete(id)}>
          <Tooltip title='Eliminar'>
            <ListItemIcon>
              <DeleteOutlined />
            </ListItemIcon>
          </Tooltip>
        </MenuItem>
        <MenuItem onClick={() => handleClickOpen(id)}>
          <Tooltip title='Detalles'>
            <ListItemIcon>
              <RemoveRedEyeOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
        </MenuItem>
      </Menu>
    </>
  )
}

export default ProductCardMenu
