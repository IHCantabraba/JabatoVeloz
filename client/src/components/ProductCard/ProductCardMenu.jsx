import { ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import { deleteProduct } from '../../actions/products'
import { DeleteOutlined } from '@mui/icons-material'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { useValue } from '../../context/ContextProvider'
import { getPedidos } from '../../actions/pedidos'

const ProductCardMenu = ({
  anchorProductMenu,
  setAnchorProductMenu,
  producto
}) => {
  const {
    state: { productoEliminado },
    dispatch
  } = useValue()
  const handleCloseProductMenu = () => {
    setAnchorProductMenu(null)
  }

  const handleClickDelete = (id) => {
    deleteProduct(dispatch, id, productoEliminado)
    // setEliminado(!eliminado)
  }
  return (
    <>
      {/* vincular el menu al botón del Productcard */}
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
        <MenuItem onClick={() => handleClickDelete(producto._id)}>
          <Tooltip title='Eliminar'>
            <ListItemIcon>
              <DeleteOutlined />
            </ListItemIcon>
          </Tooltip>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch({ type: 'UPDATE_PRODUCT', payload: producto })
            getPedidos(dispatch)
          }}
        >
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
