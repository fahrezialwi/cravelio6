import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class PrivacyPolicy extends Component {

    componentDidMount() {
        document.title = 'Privacy Policy - Cravelio'
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row pt-5">
                        Privacy Policy Component
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default PrivacyPolicy