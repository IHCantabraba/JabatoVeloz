import React, { useEffect, useState } from 'react'
import { Container, Grid2, ImageList } from '@mui/material'
import { deleteProduct, getProducts } from '../../actions/products'
import { useValue } from '../../context/ContextProvider'
import ProductCard from '../../components/ProductCard/ProductCard'
import ProductCard1 from '../../components/ProductCard/ProductCard1'
const Products1 = () => {
  const [eliminado, setEliminado] = useState(false)
  const {
    state: { filterProducts, delProduct, light },
    dispatch
  } = useValue()
  useEffect(() => {
    getProducts(dispatch)
  }, [eliminado]) /*eliminado */

  const handleClickOpen = (id) => {
    console.log(`Openning ${id} product`)
  }
  return (
    <Container sx={{ padding: '5px' }}>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important'
        }}
      >
        {filterProducts &&
          filterProducts.map((producto) => (
            <ProductCard1
              {...{ producto, handleClickOpen, setEliminado, eliminado }}
            />
          ))}
      </ImageList>
    </Container>
  )
}

export default Products1
