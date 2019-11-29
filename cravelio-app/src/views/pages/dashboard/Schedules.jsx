import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import createSlot from 'react-tackle-box/Slot'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../../configs/urlAPI'
import "react-big-calendar/lib/css/react-big-calendar.css"
import "../../styles/schedules.css"

const localizer = momentLocalizer(moment)
const ExampleControlSlot = createSlot()

class Schedules extends Component {

    constructor(props) {
        super(props)
        this.state = {
            events: [],
            trips: [],
            selectedTrip: 1
        }
    }

    componentDidMount() {
        document.title = 'Schedules - Cravelio Dashboard'
        this.getSchedulesData()
        this.getTripsData()
    }

    getSchedulesData = () => {
        axios.get(
            URL_API + 'schedules'
        ).then(res => {
            let events = res.data.results.map(schedule => {
                return ({
                    id: schedule.schedule_id,
                    title: schedule.trip_name,
                    start: new Date(schedule.start_date),
                    end: new Date(schedule.end_date)
                })
            })
            this.setState({
                events
            })
        })
    }

    getTripsData = () => {
        axios.get(
            URL_API + 'trips'
        ).then(res => {
            this.setState({
                trips: res.data.results
            })
        })
    }

    tripList = () => {
        return this.state.trips.map(trip => {
            return (
                <option value={trip.trip_id} key={trip.trip_id}>{trip.trip_name}</option>
            )
        })
    }

    onEditClick = (selectedTrip) => {
        this.props.history.push(`/dashboard/schedules/edit-schedule/${selectedTrip}`)
    }

    render() {
        return (
            <div className="row row-top row-bottom ml-0 mr-0">
                <div className="col-12 mb-3">
                    <h2>Schedules</h2>
                </div>
                <div className="col-12 mb-4">
                    <h5>Edit Schedule</h5>
                    <div className="input-group">
                        <select
                            onChange={e => this.setState({selectedTrip: e.target.value})}
                            className="form-control"
                            defaultValue={this.state.selectedTrip}
                        >
                            {this.tripList()}
                        </select>
                        <div className="ml-3">
                            <button onClick={() => this.onEditClick(this.state.selectedTrip)} className="btn-main">Edit</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-5">
                    <h5>All Schedules</h5>
                    <ExampleControlSlot.Entry waitForOutlet>
                    </ExampleControlSlot.Entry>
                    <Calendar
                        popup
                        defaultDate={new Date()}
                        defaultView="month"
                        views={["month", "agenda"]}
                        showMultiDayTimes={true} 
                        events={this.state.events}
                        localizer={localizer}
                        resizable
                        style={{height: "100vh"}}
                    />
                </div>
            </div>
        )
    }
}

export default Schedules