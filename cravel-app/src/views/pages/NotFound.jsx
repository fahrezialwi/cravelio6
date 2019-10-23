import React, { Component } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class NotFound extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row row-top row-bottom">
                        <div className="col-12">
                            404: Page Not Found
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default NotFound