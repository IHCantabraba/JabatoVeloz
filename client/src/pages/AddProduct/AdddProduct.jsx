import {
  Avatar,
  Button,
  Container,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomTextField from '../../components/CustomTextField/CustomTextField'
import { useValue } from '../../context/ContextProvider'
import { addProduct } from '../../actions/products'
const AdddProduct = ({ setPage }) => {
  const [selectedGenero, setSelectedGenero] = useState('')

  const {
    state: { newProductPhoto, currentUser },
    dispatch
  } = useValue()
  const handleGeneroChange = (e) => {
    setSelectedGenero(e.target.value)
  }
  const handleChangePic = (e) => {
    const file = e.target.files[0]
    console.log(file)
    if (file) {
      const PhotoURL = URL.createObjectURL(file)
      dispatch({
        type: 'UPDATE_NEW_PROD_PHOTO',
        payload: { file: file, PhotoURL: PhotoURL }
      })
    }
  }

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      Nombre: '',
      Categoria: '',
      Descripcion: '',
      Tallas: 'xs s m l xl 2xl',
      Genero: '',
      Precio: 50
      // Image: ''
    }
  })

  const onSubmit = (values) => {
    values.Photo = newProductPhoto?.file
    console.log(values)
    addProduct(dispatch, currentUser, values, setPage)
  }
  return (
    <Container
      sx={{
        boxShadow:
          '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
        width: '40%',
        borderRadius: '10px',
        mb: 10
      }}
    >
      <form
        className='formulario-nuevo-producto'
        onSubmit={handleSubmit(onSubmit)}
        style={{ margin: '20px', p: 2 }}
      >
        <CustomTextField
          nombre='Nombre'
          tipo='text'
          register={register}
          formState={formState}
        />
        <CustomTextField
          nombre='Categoria'
          inputProps={{ type: 'text' }}
          register={register}
          formState={formState}
        />
        <CustomTextField
          nombre='Descripcion'
          inputProps={{ type: 'text' }}
          register={register}
          formState={formState}
        />
        <CustomTextField
          nombre='Tallas'
          inputProps={{ type: 'text' }}
          register={register}
          formState={formState}
        />
        {/* precio */}
        <FormControl sx={{ width: '100%' }}>
          <CustomTextField
            nombre='Precio'
            inputProps={{ type: 'number', min: 1, max: 300 }}
            register={register}
            formState={formState}
          />
        </FormControl>
        {/* Imagen */}
        <Stack
          direction='row'
          sx={{
            justifyContent: 'start',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 3
          }}
        >
          <Typography sx={{ color: 'grey' }}> Añadir Imagen </Typography>
          <label htmlFor='productPhoto'>
            <input
              // {...register('Image', { required: false })}
              accept='image/*'
              id='productPhoto'
              type='file'
              style={{ display: 'none' }}
              onChange={handleChangePic}
              label='Add image'
            />
            <Avatar
              src={
                newProductPhoto.PhotoURL
                  ? newProductPhoto.PhotoURL
                  : newProductPhoto
              }
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
          </label>
        </Stack>

        {/* Select sexo */}
        <FormControl fullWidth>
          <InputLabel id='Genero-label'>Genero</InputLabel>
          <Select
            {...register('Genero', {
              required: true,
              message: 'selecciona un genero'
            })}
            error={!!formState.errors.Genero}
            labelId='Genero-label'
            value={selectedGenero}
            label='Genero'
            nombre='Genero'
            id='Genero'
            onChange={handleGeneroChange}
            defaultValue
            size='samll'
          >
            <MenuItem value='Hombre'>Hombre</MenuItem>
            <MenuItem value='Mujer'>Mujer</MenuItem>
            <MenuItem value='unisex'>Unisex</MenuItem>
            <MenuItem value='niñ@s'>Niñ@s</MenuItem>
          </Select>
        </FormControl>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            type='submit'
            disabled={!formState.isDirty}
            sx={{ color: 'green' }}
          >
            Register Product
          </Button>
        </DialogActions>
      </form>
    </Container>
  )
}

export default AdddProduct
