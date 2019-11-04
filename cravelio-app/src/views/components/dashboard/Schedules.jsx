import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../../configs/urlAPI'
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment)

class Schedules extends Component {

    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
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

    render() {
        return (
            <div className="row row-top">
                <div className="col-12">
                    <Calendar
                        defaultDate={new Date()}
                        defaultView="month"
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