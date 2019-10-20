import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class Complete extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div>
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-12 text-center">
                                <h2>Booking Completed</h2>
                                <p>We're processing your request. Please check email soon for invoice.</p>
                            </div>
                        </div>
                        <div className="row row-bottom">
                            <div className="col-3 ml-auto">
                                <Link to={`/`}>
                                    <button className="btn btn-dark btn-block">Back to Home</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Complete