import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class Confirmation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            proceed: false,
        }
    }

    proceedPayment = () => {
        this.setState({
            proceed: true
        })
        setTimeout(() => {
            this.props.history.push('/payment')
        }, 3000)
    }

    render() {
        if(!this.state.proceed){
            return (
                <div>
                    <Header/>
                    <div className="navbar-spacing">
                        <div className="container container-height">
                            <div className="row row-top">
                                <div className="col-12">
                                    <h2>Confirmation</h2>
                                    <p>Please check your order</p>
                                </div>
                            </div>
                            <div className="row pb-3">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <p>Trip Name: Bromo Adventure</p>
                                            <p>Date: Nov 18, 2019  - Nov 20, 2019</p>
                                            <p>Price Total: Rp 600.000</p>
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
                            <div className="row row-bottom">
                                <div className="col-3 ml-auto">
                                    <button onClick={this.proceedPayment} className="btn btn-dark btn-block">Proceed to Payment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            return(
                <div>
                    <Header/>
                    <div className="navbar-spacing">
                        <div className="container container-height">
                            <div className="text-center row-top row-bottom">
                                <h4 className="mb-4">Processing your order</h4>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
  
    }
}

export default withRouter(Confirmation)