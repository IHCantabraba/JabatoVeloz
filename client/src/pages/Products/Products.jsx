import React, { useEffect, useState } from 'react'
import { Container, Grid2 } from '@mui/material'
import { deleteProduct, getProducts } from '../../actions/products'
import { useValue } from '../../context/ContextProvider'
import ProductCard from '../../components/ProductCard/ProductCard'
import ProductCard1 from '../../components/ProductCard/ProductCard1'
const Products = () => {
  const [eliminado, setEliminado] = useState(false)
  const {
    state: { filterProducts, light, productoEliminado },
    dispatch
  } = useValue()
  useEffect(() => {
    console.log('fetching products')
    getProducts(dispatch)
  }, [productoEliminado])
  const handleClickDelete = (id) => {
    deleteProduct(dispatch, id, productoEliminado)
    // setEliminado(!eliminado)
  }
  const handleClickOpen = (id, producto) => {
    console.log(`Openning ${id} product`)
  }
  return (
    <Container
      sx={{
        padding: 5
      }}
    >
      <Grid2 container spacing={3}>
        {filterProducts &&
          filterProducts.map((producto) => (
            <Grid2 item key={producto.id} md={6} lg={4}>
              <ProductCard1
                {...{ producto, handleClickDelete, handleClickOpen }}
              />
              {/* <ProductCard
                producto={producto}
                handleClickDelete={handleClickDelete}
                handleClickOpen={handleClickOpen}
              /> */}
            </Grid2>
          ))}
      </Grid2>
    </Container>
  )
}

export default Products
