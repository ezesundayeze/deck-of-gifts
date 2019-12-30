import React from 'react'
import './App.css'
import Home from './Components/Home'
import { Route, Switch } from 'react-router-dom'
import DeckContainer from './Components/DeckContainer'
import Login from './Components/Login'
import NotFound from './Components/404/404'

function App () {
  return (

    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login/:id' component={Login} />
        <Route path='/campaign/:id' component={DeckContainer} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>

  )
}

export default App
