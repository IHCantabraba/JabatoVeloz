import React from 'react'
import { styled } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const PREFIX = 'MyLanding'
const classes = {
  landing: `${PREFIX}-root`
}

const Landing = styled('div')(({ theme }) => ({
  [`&.${classes.landing}`]: {
    minHeight: '100vh',
    backgroundImage: `url('./assets/JV_bg.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    transition: 'all 0.5s',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh'
  }
}))

const LandingPage = () => {
  return (
    <Landing className={classes.landing}>
      <CssBaseline />
    </Landing>
  )
}

export default LandingPage
