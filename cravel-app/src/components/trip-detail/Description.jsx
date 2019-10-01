import React, { Component } from 'react'

class Description extends Component {
    render() {
        return (
            <div className="col-6">
                <p>
                    {this.props.trip.description}
                </p>
            </div>
        )
    }
}

export default Description