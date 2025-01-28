import { Box, Rating, Typography } from '@mui/material'
import React from 'react'
import { getAverage } from '../ProductDialog/utils/getRateAverage'
import { StarBorder } from '@mui/icons-material'

const RatingInfo = ({ producto }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <Typography>
        {producto.Precio + '€' + ' ' + producto.Sexo + ' '}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Typography variant='body2'>
          {getAverage(producto?.Puntuacion) === 'NaN'
            ? '-'
            : `${getAverage(producto?.Puntuacion)}/5 `}
        </Typography>
        <Rating
          size='small'
          sx={{ mr: '5px' }}
          name='product-rating'
          value={getAverage(producto?.Puntuacion)}
          precision={0.1}
          max={1}
          readOnly
          emptyIcon={
            <StarBorder
              sx={{ height: '18px', color: 'rgba(255, 255, 255, 0.8)' }}
            ></StarBorder>
          }
        />
        <Typography variant='body2'>
          {producto?.Puntuacion ? `(${producto.Puntuacion.length}) ` : '(0) '}
        </Typography>
      </Box>
    </Box>
  )
}

export default RatingInfo
