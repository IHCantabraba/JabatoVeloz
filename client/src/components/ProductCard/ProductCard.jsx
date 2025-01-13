import React, { useState } from 'react'
import {
  Avatar,
  Card,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip
} from '@mui/material'
import { StarBorder } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ProductCardMenu from './ProductCardMenu'
import { getPedidos } from '../../actions/pedidos'

const ProductCard = ({ producto }) => {
  const [anchorProductMenu, setAnchorProductMenu] = useState(false)
  const {
    state: { isAdmin },
    dispatch
  } = useValue()

  return (
    <Card key={producto._id} elevation={3} sx={{ maxWidth: '300px' }}>
      <ImageListItem sx={{ height: '100% !important' }}>
        <ImageListItemBar
          sx={{
            background:
              'linear-gradiant(to bottom, rgba(174, 172, 172, 0.7)0%, rgba(174, 172, 172, 0.3)70%, rgba(174, 172, 172)100%'
          }}
          title={producto.Nombre}
          actionIcon={
            isAdmin ? (
              <>
                <IconButton aerial-label='Opciones'>
                  <Tooltip title='Opciones' sx={{ mr: '5px' }}>
                    <Avatar
                      onClick={(e) => setAnchorProductMenu(e.currentTarget)}
                    >
                      <MoreVertIcon />
                    </Avatar>
                  </Tooltip>
                </IconButton>
                <ProductCardMenu
                  {...{
                    anchorProductMenu,
                    setAnchorProductMenu,
                    producto
                  }}
                />
              </>
            ) : (
              <IconButton
                onClick={() => {
                  dispatch({ type: 'UPDATE_PRODUCT', payload: producto })
                  getPedidos(dispatch)
                }}
              >
                <Tooltip
                  id='Detalles-button'
                  title='Ver Detalles'
                  sx={{ mr: '5px' }}
                >
                  <Avatar src={producto.img}>
                    {/* <RemoveRedEyeOutlinedIcon /> */}
                  </Avatar>
                </Tooltip>
              </IconButton>
            )
          }
          position='top'
        />
        <img
          src={
            producto.img !== 'undefined' ? producto.img : './assets/NoPic.jpg'
          }
          alt={producto.Nombre}
          loading='lazy'
          style={{ cursor: 'pointer' }}
          onClick={() => {
            dispatch({ type: 'UPDATE_PRODUCT', payload: producto })
            getPedidos(dispatch)
          }}
        />
        {/* Rate area */}
        <ImageListItemBar
          title={producto.Precio + '€' + ' ' + producto.Sexo}
          actionIcon={
            <Rating
              sx={{ color: 'rgba(255,255,255,0.8)', mr: '5px' }}
              name='product-rating'
              defaultValue={3.5}
              precision={0.5}
              emptyIcon={
                <StarBorder
                  sx={{ color: 'rgba(255,255,255,0.8)' }}
                ></StarBorder>
              }
            />
          }
        />
      </ImageListItem>
    </Card>
  )
}

export default ProductCard
