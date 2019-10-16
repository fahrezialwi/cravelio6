import React, { Component } from 'react'
import parse from 'html-react-parser'

class Itinerary extends Component {
    render() {
        return (
            <div className="row mt-4">
                <div className="col-12">
                    {parse(this.props.trip.itinerary)}     
                </div>
            </div>
        )
    }
}

export default Itinerary