/*
To send a message to your bot, run these commands
in the root folder of the cloned repository in different terminals
npm run start-part-2

curl -X POST http://localhost:3333 -H "Content-Type: application/json" -d '{"message":"Is the McDonalds in Champs-Elysee in Paris opened?"}'
*/

// Import Expressjs module
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

// Create Express Server
const server = express()

// for parsing application/json
server.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }))

// Create a GET / route to show bot works
server.get('/', function (req, res) {
  res.send('Your bot works!')
})

// Create a POST / route to receive users message
server.post('/', function (req, res) {
  if (!req || !req.body || !req.body.message) {
    // If bot has not received any message
    res.json({ message: "Ouuups! Error" })
  }
  else if (req.body.message === "Is the McDonalds in Champs-Elysee in Paris opened?") {
    const googleUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=McDonalds+Champs-Elysee,Paris&key=WRITE_YOUR_GOOGLE_API_KEY_HERE"

    // It makes a call to Google Places API
    axios({
      method: 'GET',
      url: googleUrl,
    })
    .then(response => {
      if (response.data && response.data.results && response.data.results.length > 0) {
        // If Google Places API answered
        const place_found = response.data.results[0]

        if (place_found.opening_hours && place_found.opening_hours.open_now) {
          // If the place is opened
          res.json({ message: "Yes, it's open, you can go to eat a burger!" })
        } else {
          // If the place is closed
          res.json({ message: "Oh no, it's closed :(" })
        }
      } else {
        // If there is an error while calling Google Places API
        res.json({ message: "I can't find this place :(" })
      }
    })
    .catch(err => { res.json({ message: "Error while getting external information" }) })
  } else {
    // If user says other sentence
    res.json({ message: "I can't answer that yet :(" })
  }
})

// Make server listen on port 3333
server.listen(3333, function () {
  console.log('Bot code listening on port 3333!')
})
