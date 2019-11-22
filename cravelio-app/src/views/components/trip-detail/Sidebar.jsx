import React, { Component } from 'react'
import moment from 'moment'
import formatCurrency from '../../../helpers/formatCurrency'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
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
            return this.props.schedule.map((schedule, index) => {
                return (
                    <div key={schedule.schedule_id}>
                        <label className={"mb-2 row" + (!schedule.quota_left ? ' label-disabled' : '')}>
                            <div className="col-1 pr-0">
                                <input 
                                    type="radio"
                                    className="mr-3"
                                    name="date"
                                    disabled={!schedule.quota_left}
                                    onClick={() => this.props.pickDate(schedule.schedule_id, schedule.start_date, schedule.end_date, schedule.quota_left)}
                                />
                            </div>
                            <div className="col-11">
                                <div>{moment(schedule.start_date).format('MMM Do, YYYY')} - {moment(schedule.end_date).format('MMM Do, YYYY')}</div>
                                <div className="quota-left">({schedule.quota_left} pax left)</div>
                            </div>
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
                            <p><FontAwesomeIcon icon={faStar} className="star-rating"/> {this.props.reviewAvg} ({this.props.reviewCount} reviews)</p>
                            <h6>Pick the date</h6>
                            {this.scheduleList()}
                        </div>
                    </div>
                    {
                        this.props.date ?
                        <div className="row mb-3">
                            <div className="col-12">
                                <h6>Pax</h6>
                                <div className="row">
                                    <div className="col-2 pr-0">
                                        <button onClick={this.props.paxSubtract} className="btn-pax">−</button>
                                    </div>
                                    <div className="col-2 pl-2 pt-2">{this.props.paxValue}</div>
                                    <div className="col-2 pl-0">
                                        <button onClick={this.props.paxAdd} className="btn-pax">+</button>
                                    </div>
                                </div>
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