import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import URL_API from '../../../configs/urlAPI'
import '../../styles/footer.css'

class Footer extends Component {
    
    render() {
        return (
            <div className="footer-background">
                <div className="container">
                    <div className="row pt-3">
                        <div className="col-12 col-md-6 col-lg-3 mt-3">
                            <Link to="/">
                                <img src={URL_API + 'files/general/cravelio-logo-white.png'} width="150" alt="cravelio-logo"/>
                            </Link>
                            <div className="partner-logo mt-4 mb-1">Official Partner</div>
                            <img src={URL_API + 'files/general/wonderful-indonesia-logo.png'} width="120" alt="wonderful-indonesia"/>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mt-3 footer-link">
                            <h4>About Cravelio</h4>
                            <Link to="/contact-us">Contact Us</Link>
                            <Link to="/">How to Book</Link>
                            <Link to="/">Help Center</Link>
                            <Link to="/">Careers</Link>
                            <Link to="/">About Us</Link>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mt-3 footer-link">
                            <h4>Products</h4>
                            <Link to="/">Open Trip</Link>
                            <Link to="/">Private Trip</Link>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mt-3 footer-link">
                            <h4>Others</h4>
                            <Link to="/privacy-policy">Privacy Policy</Link>
                            <Link to="/terms-and-conditions">Terms & Conditions</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-4 mb-4 copyright text-center">
                            Copyright 2019. Cravelio
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
}

export default Footer