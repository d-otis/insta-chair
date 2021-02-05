const http = require('http')
const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const api = require('instagram-node').instagram()

api.use({
  client_id: process.env.IG_APP_ID,
  client_secret: process.env.IG_APP_SECRET
})

const redirectURI = process.env.REDIRECT_URI

exports.authorize_user = (req, res) => {
  res.redirect(api.get_authorization_url(redirectURI, {scope: ['user_media']}))
}

exports.handleAuth = (req, res) => {
  api.authorize_user(req.query.code, redirect_uri, (err, results) => {
    if (err) {
      console.log(err.body)
      res.send("Didn't work")
    } else {
      console.log("Yay! Access token is: " + result.access_token)
      res.send('You made it!')
    }
  })
}

app.get('/authorize_user', exports.authorize_user)

app.get('/handle_auth', exports.handleAuth)

app.get('/:message', (req, res) => {
  console.log(req)
  res.send(req.params.message)
})

app.get("/", (req,res) => {
  res.send('root')
})

app.listen('3000', () => {
  console.log('listening opn port')
})