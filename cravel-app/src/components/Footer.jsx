import React, { Component } from 'react'
import '../styles/footer.css'

class Footer extends Component {
    
    render() {
        return (   
            <div className="footer-background">
                <div className="container pt-5 pb-4">
                    <div className="row mb-5">
                        <div className="col-3">
                            <h1 className="footer-logo">cravel</h1>
                        </div>
                        <div className="col-3 footer-link">
                            <h5>About Cravel</h5>
                            <a href="/" rel="nofollow norefferer">Contact Us</a>
                            <a href="/" rel="nofollow norefferer">How to Book</a>
                            <a href="/" rel="nofollow norefferer">Help Center</a>
                            <a href="/" rel="nofollow norefferer">Careers</a>
                            <a href="/" rel="nofollow norefferer">About Us</a>
                        </div>
                        <div className="col-3 footer-link">
                            <h5>Products</h5>
                            <a href="/" rel="nofollow norefferer">Open Trip</a>
                            <a href="/" rel="nofollow norefferer">Private Trip</a>
                        </div>
                        <div className="col-3 footer-link">
                            <h5>Others</h5>
                            <a href="/" rel="nofollow norefferer">Privacy Policy</a>
                            <a href="/" rel="nofollow norefferer">Terms & Conditions</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 copyright text-center">
                            Copyright 2019. Cravel
                        </div>
                    </div>
                </div>
            </div>     

        )
    } 
}

export default Footer