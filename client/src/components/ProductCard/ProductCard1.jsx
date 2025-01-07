import React, { useState } from 'react'
import {
  Avatar,
  Card,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
  Typography
} from '@mui/material'
import { StarBorder } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ProductCardMenu from './ProductCardMenu'
import { getPedidos } from '../../actions/pedidos'

const ProductCard1 = ({ producto }) => {
  const [anchorProductMenu, setAnchorProductMenu] = useState(false)
  const {
    state: { isAdmin },
    dispatch
  } = useValue()
  /* TODO fix this */
  const Foto = [
    `./clothesPics/${producto.Foto ? producto.Foto : 'NoPic.jpg'}
  `,
    `./clothesPics/${producto.Foto ? producto.Foto : 'NoPic.jpg'}`
  ]
  const id = producto._id

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
                  <Avatar>
                    <RemoveRedEyeOutlinedIcon />
                  </Avatar>
                  {/* <Avatar src={Foto[0]} /> */}
                </Tooltip>
              </IconButton>
            )
          }
          position='top'
        />
        <img
          src={Foto[0]}
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
          title={producto.Precio + '€'}
          actionIcon={
            <Rating
              sx={{ color: 'rgba(255,255,255,0.8)', mr: '5px' }}
              name='product-rating'
              defaultValue={3.6}
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

export default ProductCard1
