import React, { useState, useEffect } from 'react'
import Deck from '../Deck'
const loading = require('./fluid-loader.gif')

export default function DeckContainer (props) {
  const [deck, setDeck] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const { id } = props.match.params

  useEffect(() => {
    console.log(id)
    fetch(`http://localhost:3001/campaign/${id}`).then((decks) => {
      return decks.json()
    }).then((decks) => {
      setDeck(decks)
      setIsFetching(false)
    }).catch((err) => {
      console.error('hello error', JSON.stringify(err))
    })
  }, []
  )
  return renderCampaign(isFetching, deck)
}

const renderCampaign = (isFetching, deck) => {
  if (isFetching === false) {
    return (
      deck.campaign.users.map((users) => <Deck key={users._id} user={users} />)
    )
  } else {
    return <img src={loading} alt='loading' />
  }
}
