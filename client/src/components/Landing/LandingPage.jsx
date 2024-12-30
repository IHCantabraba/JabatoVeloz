import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Collapse, CssBaseline, IconButton } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import Directions from './Directions'
import { Link as Scroll } from 'react-scroll'
const PREFIX = 'MyLanding'
const classes = {
  landing: `${PREFIX}-root`,
  title: `${PREFIX}-root`
}

const Landing = styled('div')(({ theme }) => ({
  [`&.${classes.landing}`]: {
    minHeight: '100vh',
    backgroundImage: `url('./assets/JV_bg.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    boxSizing: 'border-box',
    margin: '0',
    padding: '0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}))
const Title = styled('div')(({ theme }) => ({
  [`&.${classes.title}`]: {
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    fontSize: '5rem',
    fontFamily: 'Nunito'
  }
}))
const LandingPage = () => {
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(true)
  }, [])
  return (
    <>
      <Landing className={classes.landing} id='Landing'>
        {/* <CssBaseline /> */}

        <Collapse
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          collapsedHeight={50}
        >
          <Title className={classes.title}>
            Jabato Veloz <br />
            <span style={{ color: 'orange', fontWeight: 'bold' }}>
              Running Team
            </span>
          </Title>
          <Scroll to='contact' smooth={true}>
            <IconButton
              sx={{
                width: '50px',
                alignSelf: 'center',
                color: 'orange'
              }}
            >
              <ExpandMore sx={{ fontSize: '5rem' }} />
            </IconButton>
          </Scroll>
        </Collapse>
      </Landing>
      <Directions />
    </>
  )
}

export default LandingPage
