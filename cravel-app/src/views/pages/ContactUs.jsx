import React, { Component } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class ContactUs extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="navbar-spacing">
                    <div className="container container-height">
                        <div className="row pt-5">
                            Contact Us Component
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ContactUs