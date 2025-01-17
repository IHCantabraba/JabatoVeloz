import React from 'react'
import LandingCards from '../../../LandingCard/LandingCards'
import cardInfomation from '../utils/cardsInfo'
import useWindowPosition from '../hook/useWindowPosition'
import './Directions.css'

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
        <LandingCards key={card.id} cardInfo={card} checked={checked} />
      ))}
    </div>
  )
}

export default Directions
