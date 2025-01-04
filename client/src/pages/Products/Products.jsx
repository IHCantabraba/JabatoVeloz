import React, { useEffect, useState } from 'react'
import { Container, Grid2 } from '@mui/material'
import { deleteProduct, getProducts } from '../../actions/products'
import { useValue } from '../../context/ContextProvider'
import ProductCard from '../../components/ProductCard/ProductCard'
const Products = () => {
  const [eliminado, setEliminado] = useState(false)
  const {
    state: { productos },
    dispatch
  } = useValue()
  useEffect(() => {
    getProducts(dispatch)
  }, [eliminado])
  const handleClick = (id) => {
    console.log(`deleting ${id} product`)
    deleteProduct(dispatch, id)
    setEliminado(!eliminado)
  }
  return (
    <Container sx={{ paddingBottom: 10 }}>
      <Grid2 container spacing={3}>
        {productos &&
          productos.map((producto) => (
            <Grid2 item key={producto.id} md={6} lg={4}>
              <ProductCard producto={producto} handleClick={handleClick} />
            </Grid2>
          ))}
      </Grid2>
    </Container>
  )
}

export default Products
