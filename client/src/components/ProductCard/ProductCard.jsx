import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Card,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
  Typography
} from '@mui/material'

import { useValue } from '../../context/ContextProvider'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ProductCardMenu from './ProductCardMenu'
import { getPedidos } from '../../actions/pedidos'

import RatingInfo from '../RatingInfo/RatingInfo'

const ProductCard = ({ producto }) => {
  const [anchorProductMenu, setAnchorProductMenu] = useState(false)
  const {
    state: {
      appManager: { isAdmin }
    },
    dispatch
  } = useValue()

  return (
    <Card
      key={producto._id}
      elevation={3}
      sx={{ height: '200px', width: '250px', justifySelf: 'center' }}
    >
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
              <IconButton sx={{ pointerEvents: 'none' }}>
                <Avatar src={producto.img}></Avatar>
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
        <ImageListItemBar title={<RatingInfo producto={producto} />} />
      </ImageListItem>
    </Card>
  )
}

export default ProductCard
