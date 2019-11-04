import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class AboutUs extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row pt-5">
                        About Us Component
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default AboutUs