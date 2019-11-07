import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class Careers extends Component {

    componentDidMount() {
        document.title = 'Careers - Cravelio'
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row pt-5">
                        Careers Component
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Careers