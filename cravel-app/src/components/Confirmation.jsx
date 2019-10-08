import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Confirmation extends Component {
    render() {
        return (
            <div className="navbar-spacing">
                <div className="container">
                    <div className="row">
                        Confirmation Page
                    </div>
                    <div className="row">
                        <div className="col-3 ml-auto">
                            <Link to={`/payment`}>
                                <button className="btn btn-dark btn-block">Next</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirmation