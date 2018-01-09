import React from 'react'
import { fetchNearest } from './api'
import './AirportDetail.css'

export class AirportDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nearest: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.airport !== nextProps.airport && nextProps.airport) {
      fetchNearest(nextProps.airport.id).then(nearest => {
        this.setState({ nearest })
      })
    }
  }

  render() {
    if (this.state.nearest == null) { return null }

    return (
      <div className="AirportDetail">
        {this.state.nearest && this.state.nearest.map(a => (
          <div>
          <div>{`name: ${a.destination.FacilityName}`}</div>
          <div>{`distance: ${a.distance}`}</div>
          </div>
        ))}
      </div>
    )
  }
}