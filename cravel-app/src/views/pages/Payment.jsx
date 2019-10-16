import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class Payment extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="navbar-spacing">
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-12">
                                <h2>Invoice #1</h2>
                                <p>Due Amount: Rp. 600.000</p>
                                <p>Status: Unpaid</p>
                                <p>Please pay before November 1, 2019</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <p>Trip Name: Bromo Adventure</p>
                                        <p>Date: Nov 18, 2019  - Nov 20, 2019</p>
                                        <p>Pax: 2 person(s)</p>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Name</th>
                                                    <th>Identification</th>
                                                    <th>Identification No.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Fahrezi Alwi</td>
                                                    <td>KTP</td>
                                                    <td>3124567890123456</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Fahrezi Alwi</td>
                                                    <td>KTP</td>
                                                    <td>3124567890123456</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                Select Bank
                                <select className="form-control mb-2">
                                    <option>BCA</option>
                                    <option>Mandiri</option>
                                </select>
                                <input type="file" className="form-control"/>
                            </div>
                        </div>
                        <div className="row row-bottom">
                            <div className="col-3 ml-auto">
                                <Link to="/complete">
                                    <button className="btn btn-dark btn-block">Submit</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Payment