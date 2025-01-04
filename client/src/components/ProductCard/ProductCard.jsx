import React from 'react'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'

const ProductCard = ({ producto, handleClickDelete, handleClickOpen }) => {
  const {
    state: { isAdmin },
    dispatch
  } = useValue()
  const Foto = `./clothesPics/${producto.Foto ? producto.Foto : 'NoPic.jpg'}`

  return (
    <Card elevation={3} sx={{ maxWidth: '300px' }}>
      <CardHeader
        action={
          isAdmin ? (
            <IconButton
              aerial-label='delete Product'
              onClick={() => handleClickDelete(producto._id)}
            >
              <Tooltip id='delete-button' title='Borrar Product'>
                <DeleteOutlined />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton onClick={() => handleClickOpen(producto._id)}>
              <Tooltip id='Detalles-button' title='Ver Detalles'>
                <RemoveRedEyeOutlinedIcon />
              </Tooltip>
            </IconButton>
          )
        }
        title={producto.Nombre}
        subheader={producto.Categoria + ' ' + producto.Sexo}
        //* TODO neceistamos marca de ropa */
        avatar={
          <Avatar sx={{ bgcolor: 'black' }} aria-label='recipe'>
            R
          </Avatar>
        }
      />

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
  )
}

export default ProductCard
