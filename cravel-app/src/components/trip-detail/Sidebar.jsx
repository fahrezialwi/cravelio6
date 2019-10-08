import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h5>Rp {this.props.trip.price}/pax</h5>
                            <p>4.7 (50 reviews)</p>
                            <h6>Dates</h6>
                            <input type="radio" name="date"/>October 10, 2019<br/>
                            <input type="radio" name="date"/>October 28, 2019<br/>
                            <input type="radio" name="date"/>November 9, 2019
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <Link to="/checkout">
                                <button className="btn btn-dark btn-block">Book</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar