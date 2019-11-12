import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import URL_API from '../../../configs/urlAPI'

class ManageTrip extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trips : [],
            currentPage: 1,
            tripsPerPage: 10
        }
    }

    componentDidMount() {
        document.title = 'Manage Trip - Cravelio Dashboard'
        this.getTripsData()
    }

    getTripsData = () => {
        axios.get (
            URL_API + 'trips'
        ).then((res)=> {
            this.setState({
                trips: res.data.results
            })
        })
    }

    onPageClick = (e) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        e.persist()
        setTimeout(() => { 
            this.setState({
                currentPage: Number(e.target.id)
            })
        }, 700)
    }

    onPreviousClick = () => {
        if (this.state.currentPage > 1) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })

            setTimeout(() => { 
                this.setState({
                    currentPage: this.state.currentPage - 1
                })
            }, 700)
        }
    }

    onNextClick = () => {
        if (this.state.currentPage < Math.ceil(this.state.trips.length / this.state.tripsPerPage)) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })

            setTimeout(() => { 
                this.setState({
                    currentPage: this.state.currentPage + 1
                })
            }, 700)
        }
    }

    onDeleteClick = (tripId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='alert-container'>
                        <p>Are you sure want to delete this trip?</p>
                        <button
                            onClick={() => {
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
                                        for (let i = 0; i < res.data.results.length; i++) {
                                            axios.delete(
                                                URL_API + `pictures/${res.data.results[i].picture_id}`,{
                                                    data: {
                                                        picture_link: res.data.results[i].picture_link
                                                    }
                                                }
                                            )
                                        }
                                        onClose()
                                        this.getTripsData()
                                    })
                                })
                            }}
                            className="btn-main"
                        >
                        Yes
                        </button>
                        <button onClick={onClose} className="btn-main ml-2">No</button>
                    </div>
                )
            }
        })
    }

    tripList = () => {
        const { trips, currentPage, tripsPerPage } = this.state
        const indexOfLastTrips = currentPage * tripsPerPage
        const indexOfFirstTrips = indexOfLastTrips - tripsPerPage
        const currentTrips = trips.slice(indexOfFirstTrips, indexOfLastTrips)

        return currentTrips.map((trip, index) => {
            return (
                <tr key={trip.trip_id}>
                    <td>{trip.trip_id}</td>
                    <td>{trip.trip_name}</td>
                    <td>{trip.meeting_point}</td>
                    <td>{trip.price}</td>
                    <td>{trip.category}</td>
                    <td>{trip.duration}</td>
                    <td><img src={URL_API + "files/trip/" + trip.picture_link} alt={trip.name} width="100"/></td>
                    <td><Link to={"/dashboard/manage-trips/edit-trip/" + trip.trip_id}><button className="btn-main">Edit</button></Link></td>
                    <td><button onClick = {() => this.onDeleteClick(trip.trip_id)} className="btn-main">Delete</button></td>
                </tr>
            )
        })
    }

    pageNumberList = () => {

        const { trips, tripsPerPage } = this.state
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(trips.length / tripsPerPage); i++) {
            pageNumbers.push(i)
        }
    
        return pageNumbers.map(number => {
            return (
                <li
                    className={"page-item" + (this.state.currentPage === number ? ' active' : '')}
                    key={number}
                >
                    <button
                        className="page-link"
                        id={number}
                        onClick={this.onPageClick}
                    >
                        {number}
                    </button>
                </li>

            )
        })
    }

    render() {
        return (
            <div className="row row-top row-bottom ml-0 mr-0">
                <div className="col-12 mb-3">
                    <h2>Manage Trips</h2>
                </div>
                <div className="col-12 mb-4">
                    <Link to="/dashboard/manage-trips/add-trip">
                        <button className="btn-main mr-2">Add New Trip</button>
                    </Link>
                </div>
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Trip ID</th>
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
                    {
                        this.state.trips.length === 0 ?
                        <div className="col-12 text-center">
                            No trips
                        </div>
                        :
                        null
                    }
                    <div className="col-12 mt-3">
                        <nav>
                            <ul className="pagination justify-content-center">
                                <li
                                    className={"page-item" + (this.state.currentPage === 1 ? ' disabled' : '')}
                                >
                                    <button
                                        className="page-link"
                                        onClick={this.onPreviousClick}
                                    >
                                        Newer
                                    </button>
                                </li>
                                {this.pageNumberList()}
                                <li
                                    className={"page-item" + (this.state.currentPage === Math.ceil(this.state.trips.length / this.state.tripsPerPage) ? ' disabled' : '')}
                                >
                                    <button className="page-link" onClick={this.onNextClick}>
                                        Older
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManageTrip