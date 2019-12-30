const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const campaignRouter = require('./routes/campaign')
const userRouter = require('./routes/users')
const deckRouter = require('./routes/deck')
const loginRouter = require('./routes/login')
require('dotenv/config')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(passport.initialize())
app.use('/campaign', campaignRouter)
app.use('/user', userRouter)
app.use('/login', loginRouter)
app.use('/deck', deckRouter)

// connect
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to the database')
)
// listening to a port
app.listen(3001)
