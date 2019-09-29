import React, { Component } from 'react'
import parse from 'html-react-parser'

class PriceIncludes extends Component {
    render() {
        return (
            <div className="row mt-4">
                <div className="col-12">
                    {parse(this.props.trip.price_includes)}
                </div>
            </div>
        )
    }
}

export default PriceIncludes