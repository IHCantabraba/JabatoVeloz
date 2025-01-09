import React, { memo, useEffect } from 'react'
import { Container, ImageList } from '@mui/material'
import { getProducts } from '../../actions/products'
import { useValue } from '../../context/ContextProvider'
import ProductCard1 from '../../components/ProductCard/ProductCard1'
const Products1 = () => {
  const {
    state: { filterProducts, productoEliminado, currentUser },
    dispatch
  } = useValue()
  useEffect(() => {
    getProducts(dispatch, currentUser.result.token)
  }, [productoEliminado])
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
          filterProducts.map((producto) => <ProductCard1 {...{ producto }} />)}
      </ImageList>
    </Container>
  )
}

export default Products1
