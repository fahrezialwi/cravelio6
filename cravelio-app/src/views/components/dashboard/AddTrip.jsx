import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL_API from '../../../configs/urlAPI'

class AddTrip extends Component {

    constructor(props) {
        super(props)
        this.state = {
            path: '',
            tripName: '',
            pictureLink: '',
            meetingPoint: '',
            price: 0,
            duration: '',
            category: '',
            region: '',
            quota: 0,
            description: '',
            itinerary: '',
            priceIncludes: '',
            priceExcludes: '',
            faq: ''
        }
    }

    onAddClick = () => {
        axios.post(
            URL_API + 'trips', {
                path: this.state.path,
                trip_name: this.state.tripName,
                picture_link: this.state.pictureLink,
                meeting_point: this.state.meetingPoint,
                price: this.state.price,
                duration: this.state.duration,
                category: this.state.category,
                region: this.state.region,
                quota: this.state.quota,
                description: this.state.description,
                itinerary: this.state.itinerary,
                price_includes: this.state.priceIncludes,
                price_excludes: this.state.priceExcludes,
                faq: this.state.faq
            }
        ).then(res => {
            alert("Trip added")
        })
    }

    render() {
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <Link to="/dashboard/manage-trips">
                            <button className="btn btn-dark">Back</button>
                        </Link>
                    </div>
                    <div className="col-12 mb-3">
                        <h2>Add Trip</h2>
                    </div>
                    <div className="col-8 mb-3">
                        Trip Name
                        <input
                            type="text"
                            onChange={e => this.setState({tripName: e.target.value})}
                            className="form-control"
                        />
                        <div className="row">
                            <div className="col-4 pr-0">
                                <p className="mt-1">http://localhost:3000/trip/</p>
                            </div>
                            <div className="col-8 pl-0">
                                <input
                                    type="text"
                                    onChange={e => this.setState({path: e.target.value})}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8 mb-3">
                        Description
                        <textarea
                            onChange={e => this.setState({description: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Meeting Point
                        <input
                            type="text"
                            onChange={e => this.setState({meetingPoint: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Price
                        <input
                            type="text"
                            onChange={e => this.setState({price: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Category
                        <input
                            type="text"
                            onChange={e => this.setState({category: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Region
                        <input
                            type="text"
                            onChange={e => this.setState({region: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Duration
                        <input
                            type="text"
                            onChange={e => this.setState({duration: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Quota
                        <input
                            type="text"
                            onChange={e => this.setState({quota: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Itinerary
                        <textarea
                            onChange={e => this.setState({itinerary: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Price Includes
                        <textarea
                            onChange={e => this.setState({priceIncludes: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Price Excludes
                        <textarea
                            onChange={e => this.setState({priceExcludes: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        FAQ
                        <textarea
                            onChange={e => this.setState({faq: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-5">
                        <button onClick={() => this.onAddClick()} className="btn btn-dark">Add Trip</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddTrip