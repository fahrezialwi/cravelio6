import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Overview from '../components/dashboard/Overview'
import PaymentsPending from '../components/dashboard/PaymentsPending'
import TransactionHistory from '../components/dashboard/TransactionHistory'
import ManageTrips from '../components/dashboard/ManageTrips'
import Schedules from '../components/dashboard/Schedules'
import Promos from '../components/dashboard/Promos'
import '../styles/dashboard.css'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: 'overview',
        }
    }

    contentSection = () => {
        if(this.state.content === 'overview'){
            return <Overview/>
        } else if(this.state.content === 'payment'){
            return <PaymentsPending/>
        } else if(this.state.content === 'transaction'){
            return <TransactionHistory/>
        } else if(this.state.content === 'manage'){
            return <ManageTrips/>
        } else if(this.state.content === 'schedule'){
            return <Schedules/>
        } else if(this.state.content === 'promo'){
            return <Promos/>
        }
    }

    render() {
        if(this.props.role === 'admin'){
            return (
                <div>
                    <Header/>
                    <div>
                        <div className="container container-height">
                            <div className="row row-top row-bottom">
                                <div className="col-3">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="pt-2 pb-2 text-center">
                                                <h5>Admin Dashboard</h5>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className={"list-group-item list-dashboard" + (this.state.content === 'overview' ? ' list-active' : '')} onClick={() => this.setState({content: 'overview'})}>Overview</li>
                                                <li className={"list-group-item list-dashboard" + (this.state.content === 'payment' ? ' list-active' : '')} onClick={() => this.setState({content: 'payment'})}>Payments Pending</li>
                                                <li className={"list-group-item list-dashboard" + (this.state.content === 'transaction' ? ' list-active' : '')} onClick={() => this.setState({content: 'transaction'})}>Transaction History</li>
                                                <li className={"list-group-item list-dashboard" + (this.state.content === 'manage' ? ' list-active' : '')} onClick={() => this.setState({content: 'manage'})}>Manage Trips</li>
                                                <li className={"list-group-item list-dashboard" + (this.state.content === 'schedule' ? ' list-active' : '')} onClick={() => this.setState({content: 'schedule'})}>Schedules</li>
                                                <li className={"list-group-item list-dashboard" + (this.state.content === 'promo' ? ' list-active' : '')} onClick={() => this.setState({content: 'promo'})}>Promos</li>
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
                    <Footer/>
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