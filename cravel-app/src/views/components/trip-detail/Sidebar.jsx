import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../../configs/urlAPI'
import '../../styles/sidebar.css'

// window.onscroll = function() {
//     let sidebar = document.getElementById("sidebar")
//     let height = document.body.clientHeight-700

//     if (window.scrollY > 600 && window.scrollY < height ) {
//         sidebar.classList.add("sidebar-fixed");
//         sidebar.removeAttribute("style")
//     } else if (window.scrollY < 600) {
//         sidebar.classList.remove("sidebar-fixed");
//     } else if (window.scrollY > height) {
//         sidebar.classList.remove("sidebar-fixed");
//         sidebar.style.marginTop = `${height-610}px`
//     }
// }

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
                    <input 
                        type="radio"
                        className="mr-2"
                        name="date"
                        onClick={() => this.props.date(schedule.date_start, schedule.date_end)}
                    />
                    {moment(schedule.date_start).format('MMM Do, YYYY')} - {moment(schedule.date_end).format('MMM Do, YYYY')}
                </div>
            )
        })
    }

    render() {
        return (
            <div id="sidebar">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h5>Rp {this.props.trip.price}/pax</h5>
                            <p>4.7 (50 reviews)</p>
                            <h6>Pick the date</h6>
                            {this.scheduleList()}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <h6>Pax</h6>
                            <input type="number" className="form-control" onChange={e => this.props.pax(parseInt(e.target.value))}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Link to="/checkout">
                                <button onClick={() => this.props.bookClick()} className="btn btn-dark btn-block">Book</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Sidebar