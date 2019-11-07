import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import formatCurrency from '../../../helpers/formatCurrency'
import URL_API from '../../../configs/urlAPI'
import '../../styles/trip-item.css'

class TripItem extends Component {

    render() {
        let {trip_id, path, trip_name, price, duration, category, picture_link, schedule} = this.props.trip

        return (
            <div className="col-lg-3 col-md-6 col-sm-12 list-padding" key={trip_id}>
                <Link to={`/trip/${path}`}>
                    <div className="card-decoration">
                        <div className="card-image">
                            <img src={`${URL_API}files/trip/${picture_link}`} alt={trip_name} className="image-cover"/>
                            {
                                schedule === 0 ?
                                <div className="card-tag-alert ml-2">NOT AVAILABLE</div>
                                :
                                null
                            }
                        </div>
                        <div className="pt-2">
                            <div className="card-tag text-pink">{duration.toUpperCase()}</div>
                            <div className="card-tag ml-2 text-pink">{category.toUpperCase()}</div>
                            <h6 className="card-title mt-1 mb-1">{trip_name}</h6>
                            <div className="card-price">{formatCurrency(price)}</div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default TripItem