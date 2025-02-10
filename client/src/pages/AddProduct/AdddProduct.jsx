import {
  Avatar,
  Button,
  Container,
  DialogActions,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomTextField from '../../components/CustomTextField/CustomTextField'
import { useValue } from '../../context/ContextProvider'
import { addProduct } from '../../actions/products'
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu'
import DropDownMultiple from '../../components/DropDownMultipe/DropDownMultiple'
import { CheckBox, ProductionQuantityLimits } from '@mui/icons-material'

const AdddProduct = ({ setPage }) => {
  const [selectedGenero, setSelectedGenero] = useState('')
  const [selectedCategoria, setCategoriaSelected] = useState('')
  const [selectedTallas, setTallasSelected] = useState([])

  const {
    state: {
      userManager: { currentUser },
      appManager: {
        theme: { light }
      },
      productsManager: { newProductPhoto, Categorias, Generos, Tallas }
    },
    dispatch
  } = useValue()
  const handleGeneroChange = (e) => {
    setSelectedGenero(e.target.value)
  }
  const handleCategoriaChange = (e) => {
    setCategoriaSelected(e.target.value)
  }

  const handleTallasChange = (e) => {
    const {
      target: { value }
    } = e
    setTallasSelected(typeof value === 'string' ? value.split(',') : value)
  }
  const handleChangePic = (e) => {
    const file = e.target.files[0]

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
      Tallas: [],
      Genero: '',
      Precio: 50
    }
  })

  const onSubmit = (values) => {
    values.Photo = newProductPhoto?.file
    if (newProductPhoto.file) {
      values.originalIMG = true
    } else {
      values.originalIMG = false
    }

    addProduct(dispatch, currentUser, values, setPage)
  }
  return (
    <Container sx={{ py: 2, pb: 100 }}>
      <Container
        maxWidth='md'
        sx={{
          boxShadow:
            '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
          borderRadius: '10px',
          mt: 4,
          bgcolor: `var(--ihc-${light ? 'light' : 'dark'}-mode-bg-form)`,
          '&.MuiContainer-maxWidthMd': {
            maxWidth: '600px'
          }
        }}
      >
        <form
          className='formulario-nuevo-producto'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ py: 6 }}
        >
          <CustomTextField
            nombre='Nombre'
            tipo='text'
            register={register}
            formState={formState}
            light={light}
          />

          <DropDownMenu
            name='Categoria'
            register={register}
            value={selectedCategoria}
            handler={handleCategoriaChange}
            formState={formState}
            selections={Categorias}
          />
          <CustomTextField
            nombre='Descripcion'
            inputProps={{ type: 'text' }}
            register={register}
            formState={formState}
            light={light}
          />

          <DropDownMultiple
            name='Tallas'
            register={register}
            value={selectedTallas}
            handler={handleTallasChange}
            formState={formState}
            selections={Tallas}
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
          <DropDownMenu
            name='Genero'
            register={register}
            value={selectedGenero}
            handler={handleGeneroChange}
            formState={formState}
            selections={Generos}
          />
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button
              type='submit'
              disabled={!formState.isDirty}
              sx={{ color: 'var(--ihc-jV-green)' }}
            >
              Register Product
            </Button>
          </DialogActions>
        </form>
      </Container>
    </Container>
  )
}

export default AdddProduct
