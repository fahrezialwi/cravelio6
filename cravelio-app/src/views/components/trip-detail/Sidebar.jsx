import React, { Component } from 'react'
import moment from 'moment'
import formatCurrency from '../../../helpers/formatCurrency'
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

    scheduleList = () => {
        if (this.props.schedule.length > 0) {
            return this.props.schedule.map(schedule => {
                return (
                    <div key={schedule.schedule_id}>
                        <input 
                            type="radio"
                            className="mr-2"
                            name="date"
                            onClick={() => this.props.pickDate(schedule.start_date, schedule.end_date, schedule.quota_left)}
                            id={schedule.schedule_id}
                        />
                        <label className="mb-0" htmlFor={schedule.schedule_id}>
                            {moment(schedule.start_date).format('MMM Do, YYYY')} - {moment(schedule.end_date).format('MMM Do, YYYY')}<br/>
                            ({schedule.quota_left} pax left)
                        </label>
                    </div>
                )
            })
        } else {
            return (
                <div className="col-12 text-center">
                    No schedules
                </div>
            )
        }
    }

    render() {
        return (
            <div id="sidebar">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-12">
                            <div>
                                <span className="price-tag">{formatCurrency(this.props.trip.price)}</span>
                                <span className="per-pax">/pax</span>
                            </div>
                            <p>{this.props.reviewAvg} ({this.props.reviewCount} reviews)</p>
                            <h6>Pick the date</h6>
                            {this.scheduleList()}
                        </div>
                    </div>
                    {
                        this.props.date ?
                        <div className="row mb-3">
                            <div className="col-12">
                                <h6>Pax</h6>
                                <input type="number" className="form-control" defaultValue="1" min="1" max={this.props.quotaLeft} onChange={e => this.props.pax(parseInt(e.target.value))}/>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div className="row">
                        <div className="col-12">
                            <button onClick={() => this.props.bookClick()} className="btn-main btn-block" disabled={!this.props.date}>Book</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar