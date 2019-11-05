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
            quota: '',
            schedule: []
        }
    }

    componentDidMount() {
        this.getTripData()
        this.getScheduleData()
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
                tripName: res.data.results[0].trip_name,
                quota: res.data.results[0].quota
            })
        })
    }

    getScheduleData = () => {
        axios.get (
            URL_API + 'schedules', {
                params: {
                    trip_id: this.props.match.params.id
                }
            }
        ).then((res)=> {
            this.setState({
                schedule: res.data.results
            })
        })
    }

    onStartDateChange = (index, date) => {
        let newSchedule = [...this.state.schedule]
        newSchedule[index].start_date = moment(date).local().format()
        this.setState({
            schedule: newSchedule
        })
    }

    onEndDateChange = (index, date) => {
        let newSchedule = [...this.state.schedule]
        newSchedule[index].end_date = moment(date).local().format()
        this.setState({
            schedule: newSchedule
        })
    }

    scheduleList = () => {
        if (this.state.schedule.length > 0) {
            return this.state.schedule.map((schedule, index) => {
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>
                            <input
                                type="date"
                                onChange={e => this.onStartDateChange(index, e.target.value)}
                                defaultValue={moment(schedule.start_date).format('YYYY-MM-DD')}
                                className="form-control"
                            />
                        </td>
                        <td>
                            <input
                                type="date"
                                onChange={e => this.onEndDateChange(index, e.target.value)}
                                defaultValue={moment(schedule.end_date).format('YYYY-MM-DD')}
                                className="form-control"
                            />
                        </td>
                        <td>
                            <button onClick={() => this.onDeleteClick(schedule.schedule_id)} className="btn btn-dark">Delete</button>
                        </td>
                    </tr>
                )
            })
        }
    }

    onAddClick = () => {
        let newSchedule = [...this.state.schedule, {
            start_date: moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).format('YYYY-MM-DD'),
            quota_left: this.state.quota
        }]
        this.setState({
            schedule: newSchedule
        })
    }

    onDeleteClick = (scheduleId) => {
        let conf = window.confirm("Are you sure want to delete this schedule?")
        if (conf) {
            axios.delete(
                URL_API + `schedules/${scheduleId}`
            ).then(res => {
                this.getScheduleData()
            })
        }
    }

    onSaveClick = () => {
        for (let i = 0; i < this.state.schedule.length ; i++) {
            if ('schedule_id' in this.state.schedule[i]) {
                axios.patch(
                    URL_API + `schedules/${this.state.schedule[i].schedule_id}`, {
                        start_date: moment(this.state.schedule[i].start_date).format('YYYY-MM-DD'),
                        end_date: moment(this.state.schedule[i].end_date).format('YYYY-MM-DD')
                    }
                )
            } else {
                axios.post(
                    URL_API + 'schedules', {
                        start_date: moment(this.state.schedule[i].start_date).format('YYYY-MM-DD'),
                        end_date: moment(this.state.schedule[i].end_date).format('YYYY-MM-DD'),
                        trip_id: this.state.tripId,
                        quota_left: this.state.schedule[i].quota_left
                    }
                )
            }
        }
        
        alert("Schedule saved")
        this.props.history.push("/dashboard/schedules")
    }

    onBackClick = () => {
        this.props.history.push("/dashboard/schedules")
    }

    render() {
        console.log(this.state.schedule)
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <h2>Edit Schedule for {this.state.tripName}</h2>
                            <p>Showing only schedule that haven't yet started</p>
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.scheduleList()}
                                </tbody>
                            </table>
                        </div>
                        {
                            this.state.schedule.length === 0 ?
                            <div className="col-12 text-center">
                                No schedules
                            </div>
                            :
                            null
                        }
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