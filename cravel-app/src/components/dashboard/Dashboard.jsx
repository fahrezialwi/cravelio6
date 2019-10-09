import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PaymentPending from './PaymentPending'
import Transaction from './Transaction'
import ManageTrip from './ManageTrip'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: 'payment',
        }
    }

    contentSection = () => {
        if(this.state.content === 'payment'){
            return <PaymentPending/>
        } else if(this.state.content === 'transaction'){
            return <Transaction/>
        } else if(this.state.content === 'manage'){
            return <ManageTrip/>
        }
    }

    render() {
        if(this.props.role === 'admin'){
            return (
                <div className="navbar-spacing">
                    <div className="container container-height">
                        <div className="row pt-5 pb-5">
                            <div className="col-3">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="pt-2 pb-2 text-center">
                                            <h5>Admin Dashboard</h5>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item" onClick={() => this.setState({content: 'payment'})}>Payment Pending</li>
                                            <li className="list-group-item" onClick={() => this.setState({content: 'transaction'})}>Transaction</li>
                                            <li className="list-group-item" onClick={() => this.setState({content: 'manage'})}>Manage Trip</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="card">
                                    <div className="card-body">
                                        {this.contentSection()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to='/'/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.auth.role
    }
}

export default connect(mapStateToProps)(Dashboard)