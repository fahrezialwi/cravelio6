import React, { Component } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class PrivacyPolicy extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="navbar-spacing">
                    <div className="container container-height">
                        <div className="row pt-5">
                            Privacy Policy Component
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default PrivacyPolicy