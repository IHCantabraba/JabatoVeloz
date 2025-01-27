import React, { useEffect, useRef, useState } from 'react'
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
import { AddRate } from '../../actions/products'
import { getAverage } from '../ProductDialog/utils/getRateAverage'

let SCORE = 0
const ProductCard = ({ producto }) => {
  const [anchorProductMenu, setAnchorProductMenu] = useState(false)
  const {
    state: { isAdmin, currentUser, filterProducts },
    dispatch
  } = useValue()
  // useEffect(() => {
  //   if (producto?.Puntuacion?.length > 0) {
  //     const ratingData = getAverage(producto.Puntuacion)
  //     SCORE = ratingData.average
  //   }
  // }, [])
  // const [RateValue, setRateValue] = useState(0)
  // const addRate = (id, mark) => {
  //   setRateValue(mark)
  //   AddRate(dispatch, id, mark, currentUser.result.user._id)
  //   setRateValue(0)
  // }
  // asegurarse que se recoge el producto más actualizado
  const getUpdatedProduct = () => {
    const product = filterProducts.filter(
      (product) => product._id === producto._id
    )
    console.log(product)
    return product
  }
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
              <IconButton
                onClick={() => {
                  dispatch({
                    type: 'UPDATE_PRODUCT',
                    payload: getUpdatedProduct
                  })
                  getPedidos(dispatch)
                }}
              >
                <Tooltip
                  id='Detalles-button'
                  title='Ver Detalles'
                  sx={{ mr: '5px' }}
                >
                  <Avatar src={producto.img}></Avatar>
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
              size='small'
              sx={{ mr: '5px' }}
              name='product-rating'
              value={getAverage(producto?.Puntuacion)}
              precision={0.5}
              readOnly
              emptyIcon={
                <StarBorder
                  sx={{ height: '18px', color: 'rgba(255, 255, 255, 0.8)' }}
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
