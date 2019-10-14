import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/checkout.css'

const participants = [0, 1]

class Checkout extends Component {

    renderForm = () => {
        return participants.map((val, index) => {
            return (
                <div className="row mb-5" key={index}>
                    <div className="col-12 mb-3">
                        <h4>Participant {index+1}</h4>
                    </div>
                    <div className="col-2 mb-3">
                        <h6>Title</h6>
                        <select className="form-control">
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                        </select>
                    </div>
                    <div className="col-5 mb-3">
                        <h6>First Name</h6>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="col-5 mb-3">
                        <h6>Last Name</h6>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="col-4 mb-3">
                        <h6>Identification</h6>
                        <select className="form-control">
                            <option>KTP</option>
                            <option>SIM</option>
                            <option>Passport</option>
                        </select>
                    </div>
                    <div className="col-8 mb-3">
                        <h6>Identification Number</h6>
                        <input type="text" className="form-control"/>
                    </div>  
                </div>
            )
        })
    }

    render() {
        return (
            <div className="navbar-spacing">
                <div className="container container-height">
                    <div className="row row-top pb-3">
                        <div className="col-7">
                            {this.renderForm()}
                        </div>
                        <div className="col-5">
                            <div className="card mb-5">
                                <div className="card-header">
                                    Summary
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="mb-0">Bromo Adventure</p>
                                                    <p className="mb-0">(2 pax @Rp 400.000)</p>
                                                </div>
                                                <div className="col-6 text-right">
                                                    Rp 800.000
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-6">
                                                    Promo
                                                </div>
                                                <div className="col-6 text-right">
                                                    - Rp 200.000
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-6">
                                                    Total
                                                </div>
                                                <div className="col-6 text-right">
                                                    Rp 600.000
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    Have Promo Code?
                                </div>
                                <div className="card-body input-group">
                                    <input type="text" className="form-control"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-dark btn-block">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-bottom">
                        <div className="col-3 ml-auto">
                            <Link to={`/confirmation`}>
                                <button className="btn btn-dark btn-block">Next</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Checkout