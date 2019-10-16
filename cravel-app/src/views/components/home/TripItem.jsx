import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class  TripItem extends Component {
    render() {
        let {trip_id, path, trip_name, price, duration, category, picture_main} = this.props.trip
        return (
            <div className="col-lg-3 col-md-6 col-sm-12 list-padding" key={trip_id}>
                <Link to={`/trip/${path}`}>
                    <div className="card-decoration">
                        <img src={picture_main} alt={trip_name} className="card-image"/>
                        <div className="pt-2">
                            <div className="card-tag">{duration}</div>
                            <div className="card-tag ml-2">{category}</div>
                            <h6 className="card-title mt-2 mb-1">{trip_name}</h6>
                            <div className="card-price">Rp {price}</div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default TripItem