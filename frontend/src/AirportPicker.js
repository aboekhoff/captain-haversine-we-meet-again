import React from 'react'
import './AirportPicker.css'

export class AirportPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      airport: null,
      open: false,
    }
  }

  componentDidMount() {
    window.addEventListener('click', () => {
      this.setState({ open: false })
    })
  }

  handleClick = (e) => {
    this.setState({ open: !this.state.open })
    e.stopPropagation()
    e.preventDefault()
  }

  renderDropDown() {
    if (!this.state.open) {
      return null 
    }

    const options = this.props.airports.map(airport => {
      const handleClick = () => { 
        this.setState({ airport })
        this.props.handleClick(airport)
      }
      return (
        <div className='option' onClick={handleClick}>{airport.FacilityName}</div>
      )
    })

    return (
      <div className="dropdown">{options}</div>
    )
  }

  render() {
    const { airport, open } = this.state

    return (
      <div className="AirportPicker" onClick={this.handleClick}>
        <div>{airport ? airport.FacilityName : 'no airport selected'}</div>
        {open && this.renderDropDown()}
      </div>
    )
  }
}