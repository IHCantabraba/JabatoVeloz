import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Collapse } from '@mui/material'
import { useValue } from '../../context/ContextProvider'

export default function LandingCards({ cardInfo, checked }) {
  const { dispatch } = useValue()
  const handleLogin = () => {
    dispatch({ type: 'OPEN_LOGIN' })
  }
  const handleContact = () => {
    /* TODO create Contact Card */
    console.log('contact')
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: 'currently not available'
      }
    })
  }
  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card
        sx={{ width: 450, background: cardInfo.background, margin: '20px' }}
      >
        <CardMedia sx={{ height: 340 }} image={cardInfo.url} title='Team' />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{ fontFamily: 'Nunito', color: 'white' }}
          >
            {cardInfo.title}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: '#ddd',
              fontFamily: 'Nunito',
              fontWeight: 'bold'
            }}
          >
            {cardInfo.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            size='small'
            sx={{ color: 'orange' }}
            onClick={
              cardInfo.clickFunction === 'login' ? handleLogin : handleContact
            }
          >
            {cardInfo.btnName}
          </Button>
        </CardActions>
      </Card>
    </Collapse>
  )
}
