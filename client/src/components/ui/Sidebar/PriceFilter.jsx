import { Box, Slider, Typography } from '@mui/material'
import React from 'react'
import { useValue } from '../../../context/ContextProvider'

const marks = [
  { value: 0, label: '$0' },
  { value: 50, label: '$50' },
  { value: 100, label: '$100' }
]
const PriceFilter = () => {
  // const { containerRef } = useValue()
  const {
    state: { priceFilter },
    dispatch
  } = useValue()
  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Precio max:{'$ ' + priceFilter}</Typography>
      {/* <Box ref={containerRef}></Box> */}
      <Slider
        min={0}
        max={100}
        default={100}
        valueLabelDisplay='auto'
        marks={marks}
        value={priceFilter}
        onChange={(e, price) =>
          dispatch({ type: 'FILTER_PRICE', payload: price })
        }
      />
    </Box>
  )
}

export default PriceFilter
