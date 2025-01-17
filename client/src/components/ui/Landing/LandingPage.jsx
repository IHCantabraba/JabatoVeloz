import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Collapse, IconButton } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import Directions from './Directions/Directions'
import { Link as Scroll } from 'react-scroll'

const PREFIX = 'MyLanding'
const classes = {
  landing: `${PREFIX}-root`,
  title: `${PREFIX}-root`
}

const Landing = styled('div')(({ theme }) => ({
  [`&.${classes.landing}`]: {
    minHeight: '100vh',
    backgroundImage: `url('./assets/JV_night.jpg')`,
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
    justifyContent: 'center',
    alignItems: 'center'
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
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    setChecked(true)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Landing className={classes.landing} id='Landing'>
        {/* <CssBaseline /> */}

        <Collapse
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          collapsedheight={50}
        >
          <Title sx={{ textAlign: 'center' }} className={classes.title}>
            Jabato Veloz <br />
            <span style={{ color: 'var(--ihc-JV-orange)', fontWeight: 'bold' }}>
              Running Team
            </span>
          </Title>
          <Scroll
            to='contact'
            smooth={true}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <IconButton
              sx={{
                width: '50px',
                alignSelf: 'center',
                color: 'var(--ihc-JV-orange)'
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
