import React, { useEffect } from 'react'
import { Container, ImageList } from '@mui/material'
import { getCategoriasAndGeneros, getProducts } from '../../actions/products'
import { useValue } from '../../context/ContextProvider'
import ProductCard from '../../components/ProductCard/ProductCard'
const Products = () => {
  const {
    state: {
      productsManager: { filterProducts, productoEliminado },
      userManager: { currentUser },
      seriegrafiaManager: { AvaliableSeriegrafia }
    },
    dispatch
  } = useValue()

  useEffect(() => {
    getProducts(dispatch, currentUser.token, AvaliableSeriegrafia)
  }, [productoEliminado])
  useEffect(() => {
    getCategoriasAndGeneros(filterProducts, dispatch)
  }, [filterProducts])
  return (
    <Container sx={{ padding: '5px' }}>
      <ImageList
        gap={50}
        sx={{
          mb: 8,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important'
        }}
      >
        {filterProducts &&
          filterProducts.map((producto) => (
            <ProductCard key={producto._id} {...{ producto }} />
          ))}
      </ImageList>
    </Container>
  )
}

export default Products
