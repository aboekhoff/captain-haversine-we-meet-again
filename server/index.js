const express = require('express')
const app = express()
const fs = require('fs')

const airports = JSON.parse(fs.readFileSync('alaska_airports_II.json', 'utf8'))

// add id to each airport for client

airports.forEach((airport, id) => {
  airport.id = id
})

const serializedAirports = JSON.stringify(airports)

function toRadians(seconds) {
  return (seconds / 3600) * (Math.PI / 180)
}

function haversine(lat1, lon1, lat2, lon2) {
  var R = 6371e3; // metres
  var φ1 = toRadians(lat1)
  var φ2 = toRadians(lat2)
  var Δφ = toRadians(lat2-lat1)
  var Δλ = toRadians(lon2-lon1)
  
  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  
  var d = R * c

  return d
}

// precompute the nearest airports so api can just return the result

let nearest = []

airports.forEach((airport1, id1) => {
  const row = []
  nearest.push(row)

  airports.forEach((airport2, id2) => {
    if (id1 === id2) { 
      return 
    }

    const entry = {
      destination: airport2,
      distance: haversine(airport1.Lat, airport1.Lon, airport2.Lat, airport2.Lon),
    }

    row.push(entry)
    row.sort((a, b) => a.distance - b.distance)
    if (row.length > 3) { row.pop() }
  })
})

nearest = nearest.map(JSON.stringify)

app.get('/airports', (req, res) => {
  res.send(serializedAirports) 
})

app.get('/distance', (req, res) => {
  const id1 = req.query.id1
  const id2 = req.query.id2

  const airport1 = airports[id1]
  const airport2 = airports[id2]

  console.log(req.query, airport1, airport2)

  if (airport1 == null || airport2 == null) { 
    throw Error('bad request') 
  }
  
  res.send(haversine(airport1.Lat, airport1.Lon, airport2.Lat, airport2.Lon).toString())
})

app.get('/nearest', (req, res) => {
  const id = req.query.id
  res.send(nearest[id])
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))