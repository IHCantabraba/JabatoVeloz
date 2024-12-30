import React from 'react'
import LandingCards from './LandingCards'
import cardInfomation from './cardsInfo'
import useWindowPosition from './hook/useWindowPosition'
const Directions = () => {
  const checked = useWindowPosition('Landing')
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      id='contact'
    >
      {cardInfomation.map((card) => (
        <LandingCards cardInfo={card} checked={checked} />
      ))}
    </div>
  )
}

export default Directions
