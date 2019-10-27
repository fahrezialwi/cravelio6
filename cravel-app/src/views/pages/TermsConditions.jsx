import React, { Component } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class TermsConditions extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row pt-5">
                        Terms & Conditions Component
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default TermsConditions