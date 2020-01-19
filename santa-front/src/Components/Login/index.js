import React, { useState, useEffect } from 'react'
import './index.css'
import { Redirect } from 'react-router-dom'
import { render } from 'react-dom'
const loading = require('../DeckContainer/fluid-loader.gif')

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/login/',
      {
        method: 'post',
        body: JSON.stringify({ campaignUrl: props.match.params.id, phoneNumber: '8912748274812', password: 'password' }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then((data) => {
      return data.json()
    }).then((response) => {
      if (response.message === 'Campaign does not exist') {
        props.history.push('/404')
      }
    }).catch((error) => {
      console.error(JSON.stringify(error))
    })
  }, [])

  const validateForm = () => {
    return phoneNumber.length > 0 && password.length > 0
  }

  const handleSubmit = (event) => {
    if (phoneNumber.length > 5 && password.length > 5) {
      setIsLoading(true)
      setMessage('')
      fetch('http://localhost:3001/login/',
        {
          method: 'post',
          body: JSON.stringify({ phoneNumber: phoneNumber, password: password, campaignUrl: props.match.params.id }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      ).then((data) => {
        return data.json()
      }).then((response) => {
        response.message && setMessage(response.message)
        if (response.success) {
          props.history.push(`/campaign/${props.match.params.id}`)
          localStorage.setItem('token', response.token)
        }
        setIsLoading(false)
      }).catch((error) => {
        setIsLoading(false)
        console.error(JSON.stringify(error))
      })
    } else {
      setMessage('Phone number and password must contain more than 5 characters')
    }
    event.preventDefault()
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} method='post'>
        <h1>
            Sign in
        </h1>
        <div className='form-content'>
          <input id='user-name' name='user-name' placeholder='Phone Number' type='text' onChange={(e) => setPhoneNumber(e.target.value)} />
          <input id='password' name='password' placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button className='button' disabled={!validateForm()} type='submit'>
            Log in
          </button>
          <br />
          {isLoading === true && <img className='loading' src={loading} width='100px' alt='loading...' />}
          <div className='signup-message'> {message} </div>
        </div>
      </form>
    </div>

  )
}

export default Login
