import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Complete extends Component {
    render() {
        return (
            <div className="navbar-spacing">
                <div className="container">
                    <div className="row">
                        Booking Completed
                    </div>
                    <div className="row">
                        <div className="col-3 ml-auto">
                            <Link to={`/`}>
                                <button className="btn btn-dark btn-block">Back to Home</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Complete