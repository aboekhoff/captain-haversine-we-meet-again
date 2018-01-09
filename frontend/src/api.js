const sortByName = (a, b) => {
  const n1 = a.FacilityName.toLowerCase()
  const n2 = b.FacilityName.toLowerCase()
  return n1 < n2 ? -1 : n2 < n1 ? 1 : 0
}

export function fetchAirports() {
  return fetch('/airports').then(airports => airports.json()).then(json => json.sort(sortByName))
}

export function fetchNearest(airportId) {
  return fetch(`/nearest?id=${airportId}`).then(res => {
    return res.json()
  })
}

export function fetchDistance(airportId1, airportId2) {
  return fetch(`/distance?id1=${airportId1}&id2=${airportId2}`).then(res => {
    return res.json()
  })
}

