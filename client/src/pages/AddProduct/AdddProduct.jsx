import {
  Button,
  Container,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomTextField from '../../components/CustomTextField/CustomTextField'
const AdddProduct = () => {
  const [selectedGenero, setSelectedGenero] = useState('')
  const handleGeneroChange = (e) => {
    setSelectedGenero(e.target.value)
  }

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      Nombre: '',
      Categoria: '',
      Descripcion: '',
      Tallas: 'xs s m l xl 2xl',
      Genero: ''
    }
  })
  console.log(formState.errors)
  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <Container
      sx={{
        boxShadow:
          '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
        width: '60%',
        borderRadius: '10px'
      }}
    >
      <form
        className='formulario-nuevo-producto'
        onSubmit={handleSubmit(onSubmit)}
        style={{ margin: '20px' }}
      >
        <CustomTextField
          nombre='Nombre'
          tipo='text'
          register={register}
          formState={formState}
        />
        <CustomTextField
          nombre='Categoria'
          tipo='text'
          register={register}
          formState={formState}
        />
        <CustomTextField
          nombre='Descripcion'
          tipo='text'
          register={register}
          formState={formState}
        />
        <CustomTextField
          nombre='Tallas'
          tipo='text'
          register={register}
          formState={formState}
        />
        {/* precio */}
        {/* Imagen */}
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
          >
            <MenuItem value='Hombre'>Hombre</MenuItem>
            <MenuItem value='Mujer'>Mujer</MenuItem>
            <MenuItem value='unisex'>unisex</MenuItem>
            <MenuItem value='niñ@s'>niñ@s</MenuItem>
          </Select>
        </FormControl>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button type='submit' disabled={!formState.isDirty}>
            Register Product
          </Button>
        </DialogActions>
      </form>
    </Container>
  )
}

export default AdddProduct
