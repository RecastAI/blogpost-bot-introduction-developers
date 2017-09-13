/*
To send a message to your bot, run these commands
in the root folder of the cloned repository in different terminals
npm run start-part-1

curl -X POST http://localhost:3333 -H "Content-Type: application/json" -d '{"message":"Hello"}'
*/

// Import Expressjs module
const express = require('express')
const bodyParser = require('body-parser')

// Create Express Server
const server = express()

// Pparsing application/json
server.use(bodyParser.json());
// Parsing application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }))

// Create a GET / route to show bot works
server.get('/', function (req, res) {
  res.send('Your bot works!')
})

// Create a POST / route to receive users messages
server.post('/', function (req, res) {
  // If bot has not received any message
  if (!req || !req.body || !req.body.message) { res.json({ message: "Ouuups! Error" }) }
  // If user says Hello
  else if (req.body.message === "Hello") { res.json({ message: "Hello human" }) }
  // If user asks how the bot is
  else if (req.body.message === "How are you?") { res.json({ message: "Fine, and you?" }) }
  // If user says other sentence
  else { res.json({ message: "I can't answer that yet :(" }) }
})

// Make server listen on port 3333
server.listen(3333, function () {
  console.log('Bot code listening on port 3333!')
})
