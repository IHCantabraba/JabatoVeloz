import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'

const ProductCard = ({ producto, handleClick }) => {
  const {
    state: { isAdmin },
    dispatch
  } = useValue()
  const Foto = `./clothesPics/${producto.Foto ? producto.Foto : 'NoPic.jpg'}`

  return (
    <div>
      <Card elevation={3} sx={{ maxWidth: '300px' }}>
        {isAdmin ? (
          <CardHeader
            action={
              <IconButton onClick={() => handleClick(producto._id)}>
                <DeleteOutlined />
              </IconButton>
            }
            title={producto.Nombre}
            subheader={producto.Categoria + ' ' + producto.Sexo}
          />
        ) : (
          <CardHeader
            title={producto.Nombre}
            subheader={producto.Categoria + ' ' + producto.Sexo}
          />
        )}
        <CardMedia
          component='img'
          height='194'
          image={Foto}
          alt={producto.Foto}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            <span style={{ fontWeight: 'bold' }}>Tallas: </span>
            {producto.Tallas}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductCard
