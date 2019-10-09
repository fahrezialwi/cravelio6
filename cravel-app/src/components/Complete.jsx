import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Complete extends Component {
    render() {
        return (
            <div className="navbar-spacing">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Booking Completed</h2>
                            <p>We're processing your request. Please check email soon for invoice.</p>
                        </div>
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