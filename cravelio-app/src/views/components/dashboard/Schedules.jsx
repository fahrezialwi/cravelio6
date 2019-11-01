import React, { Component } from 'react'
import axios from 'axios'
import URL_API from '../../../configs/urlAPI'

class Schedules extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trips: [],
            schedules: []
        }
    }

    componentDidMount(){
        this.getData()
        this.getSchedule()
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

    getSchedule= () => {
        axios.get (
            URL_API + 'schedules'
        ).then((res)=> {
            this.setState({
                schedules: res.data.results
            })
        })
    }

    tripList = () => {
        return this.state.trips.map((trip, index) => {
            return (
                <tr key={trip.trip_id}>
                    <td>{index+1}</td>
                    <td>{trip.trip_name}</td>

                </tr>
            )
        })
    }

    render() {
        return (
            <div className="row row-top">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.tripList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Schedules