import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class ContactUs extends Component {

    componentDidMount() {
        document.title = 'Contact Us - Cravelio'
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row pt-5">
                        Contact Us Component
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ContactUs