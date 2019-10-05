import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { URL_API } from '../../helpers'

class Sidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            schedules: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            URL_API + 'schedules', {
                params: {
                    trip_id: this.props.trip.trip_id
                }
            }
        ).then((res) => {    
            this.setState({
                schedules: res.data.results
            }) 
        })
    }

    scheduleList = () => {
        return this.state.schedules.map(schedule => {
            return (
                <div key={schedule.schedule_id}>
                    <input type="radio" className="mr-2" name="date"/>
                    {moment(schedule.date_start).format('MMM Do, YYYY')} - {moment(schedule.date_end).format('MMM Do, YYYY')}
                </div>
            )
        })
    }

    render() {
        return (
            <div className="sidebar">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h5>Rp {this.props.trip.price}/pax</h5>
                            <p>4.7 (50 reviews)</p>
                            <h6>Pick the date</h6>
                            {this.scheduleList()}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <button className="btn btn-dark btn-block">Book</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar