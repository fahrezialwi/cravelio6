import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class HelpCenter extends Component {

    componentDidMount() {
        document.title = 'About Us - Cravelio'
    }
    
    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row pt-5">
                        Help Center Component
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default HelpCenter