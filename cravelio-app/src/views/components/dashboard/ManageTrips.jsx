import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import URL_API from '../../../configs/urlAPI'

class ManageTrip extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trips : []
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get (
            URL_API + 'trips'
        ).then((res)=> {
            this.setState({
                trips: res.data.results
            })
        })
    }

    onDeleteClick = (tripId) => {
        let conf = window.confirm("Are you sure want to delete this trip?")
        if(conf){
            axios.delete(
                URL_API + `trips/${tripId}`
            ).then(res => {
                axios.get(
                    URL_API + 'pictures', {
                        params: {
                            trip_id: tripId
                        }
                    }
                ).then(res => {
                    for (let i = 0; i < res.data.results.length; i++){
                        axios.delete(
                            URL_API + `pictures/${res.data.results[i].picture_id}`,{
                                data: {
                                    picture_link: res.data.results[i].picture_link
                                }
                            }
                        )
                    }

                    this.getData()
                })
            })
        }
    }

    tripList = () => {
        return this.state.trips.map((trip, index) => {
            return (
                <tr key={trip.trip_id}>
                    <td>{index+1}</td>
                    <td>{trip.trip_name}</td>
                    <td>{trip.meeting_point}</td>
                    <td>{trip.price}</td>
                    <td>{trip.category}</td>
                    <td>{trip.duration}</td>
                    <td><img src={URL_API + "files/trip/" + trip.picture_link} alt={trip.name} width="100"/></td>
                    <td><Link to={"/dashboard/manage-trips/edit-trip/" + trip.trip_id}><button className="btn btn-dark">Edit</button></Link></td>
                    <td><button onClick = {() => this.onDeleteClick(trip.trip_id)} className="btn btn-dark">Delete</button></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-12 text-right mb-3">
                        <Link to="/dashboard/manage-trips/add-trip">
                            <button className="btn btn-dark mr-2">Add Trip</button>
                        </Link>
                    </div>
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Meeting Point</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Duration</th>
                                        <th>Picture</th>
                                        <th colSpan="2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.tripList()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManageTrip