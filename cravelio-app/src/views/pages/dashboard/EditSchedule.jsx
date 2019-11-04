import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../../configs/urlAPI'

class EditSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tripId: '',
            tripName: '',
            schedules: []
        }
    }

    componentDidMount(){
        this.getTripData()
        this.getSchedulesData()
    }

    getTripData = () => {
        axios.get(
            URL_API + 'trips', {
                params: {
                    trip_id: this.props.match.params.id
                }
            }
        ).then(res => {
            this.setState({
                tripId: res.data.results[0].trip_id,
                tripName: res.data.results[0].trip_name
            })
        })
    }

    getSchedulesData = () => {
        axios.get (
            URL_API + 'schedules', {
                params: {
                    trip_id: this.props.match.params.id
                }
            }
        ).then((res)=> {
            this.setState({
                schedules: res.data.results
            })
        })
    }

    scheduleList = () => {
        return this.state.schedules.map((schedule, index) => {
            return (
                <tr key={schedule.schedule_id}>
                    <td>{index+1}</td>
                    <td>
                        <input
                            type="date"
                            defaultValue={moment(schedule.start_date).format('YYYY-MM-DD')}
                            className="form-control"
                        />
                    </td>
                    <td>
                        <input
                            type="date"
                            defaultValue={moment(schedule.end_date).format('YYYY-MM-DD')}
                            className="form-control"
                        />
                    </td>
                </tr>
            )
        })
    }

    onAddClick = () => {

    }

    onSaveClick = () => {

    }

    onBackClick = () => {
        this.props.history.push("/dashboard/schedules")
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <h2>Edit Schedule for {this.state.tripName}</h2>
                        </div>
                        <div className="col-12 text-right mb-2">
                            <button onClick={() => this.onAddClick()} className="btn btn-dark">Add New Schedule</button>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.scheduleList()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12">
                            <button onClick={() => this.onSaveClick()} className="btn btn-dark mr-3">Save</button>
                            <button onClick={() => this.onBackClick()} className="btn btn-dark">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditSchedule