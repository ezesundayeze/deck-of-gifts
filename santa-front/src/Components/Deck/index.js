import React, { useState } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy'
import './deck.css'

export default function Deck (props) {
  const [status, setStatus] = useState('Deck')
  const { fullName, phoneNumber, address } = props.user
  console.log(status)

  return (
    <div className='deck'>
      <Flippy
        flipOnHover={false} // default false
        flipOnClick // default false
        flipDirection='horizontal' // horizontal or vertical
        // ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
        // if you pass isFlipped prop component will be controlled component.
        // and other props, which will go to div
        style={{ width: '200px', height: '200px' }}
      >
        <FrontSide
          style={{
            backgroundColor: '#41669d'
          }}
          onClick={() => setStatus({ status: 'New Deck' })}
        />
        <BackSide
          style={{ backgroundColor: '#175852' }}
        >
          <p>{fullName}</p>
          <p>{phoneNumber}</p>
          <p>{address}</p>
          <p>{status.status}</p>
        </BackSide>

      </Flippy>
    </div>
  )
}
