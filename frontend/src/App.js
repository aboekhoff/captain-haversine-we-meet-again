import React, { Component } from 'react'
import logo from './aero.png'
import './App.css'

import { fetchAirports, fetchDistance } from './api'
import { AirportPicker } from './AirportPicker' 
import { AirportDetail } from './AirportDetail'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airports: null,
      airport1: null,
      airport2: null,
    }
  }

  componentDidMount() {
    fetchAirports().then(airports => {
      this.setState({ airports })
    })
  }

  updateDistance() {
    const { airport1, airport2 } = this.state
    if (airport1 && airport2) {
      this.setState({ distance: null })
      fetchDistance(airport1.id, airport2.id).then(res => {
        this.setState({ distance: res })
      })
    }
  }

  setAirport1 = (airport) => { 
    this.setState({ airport1: airport }, () => this.updateDistance()) 
  }

  setAirport2 = (airport) => { 
    this.setState({ airport2: airport }, () => this.updateDistance()) 
  }

  render() {
    const { airports, airport1, airport2, distance } = this.state
    
    let distanceNode = null

    if (distance != null) {
      distanceNode = (
        <div className="distance">
          {`distance from ${airport1.FacilityName} to ${airport2.FacilityName}: ${distance}`}
        </div>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-content">
          <div className="pickers">
            <AirportPicker handleClick={this.setAirport1} airports={airports}/>
            <AirportPicker handleClick={this.setAirport2} airports={airports}/>
          </div>
          <div className="details">
            <AirportDetail airport={airport1}/>
            <AirportDetail airport={airport2}/>
          </div>
          {distanceNode}
        </div>
      </div>
    );
  }
}

export default App;
