import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import HeaderDashboard from '../../components/header/HeaderDashboard'
import Footer from '../../components/footer/Footer'
import Overview from './Overview'
import PaymentsPending from './PaymentsPending'
import TransactionHistory from './TransactionHistory'
import ManageTrips from './ManageTrips'
import AddTrip from './AddTrip'
import EditTrip from './EditTrip'
import Schedules from './Schedules'
import EditSchedule from './EditSchedule'
import Promos from './Promos'
import '../../styles/dashboard.css'

class Dashboard extends Component {

    render() {
        if (this.props.role === 'admin') {
            return (
                <div>
                    <HeaderDashboard/>
                    <div className="container-fluid container-height">
                        <div className="row">
                            <div className="col-3">
                                <div className="card-header">
                                    <div className="pt-2 pb-2 text-center">
                                        <h5>Admin Dashboard</h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <Link to="/dashboard" className={"list-dashboard" + (this.props.location.pathname === '/dashboard' ? ' list-active' : '')}>Overview</Link>
                                        </li>
                                        <li className="list-group-item">
                                            <Link to="/dashboard/payments-pending" className={"list-dashboard" + (this.props.location.pathname.split("/")[2] === 'payments-pending' ? ' list-active' : '')}>Payments Pending</Link>
                                        </li>
                                        <li className="list-group-item">
                                            <Link to="/dashboard/transaction-history" className={"list-dashboard" + (this.props.location.pathname.split("/")[2] === 'transaction-history' ? ' list-active' : '')}>Transaction History</Link>
                                        </li>
                                        <li className="list-group-item">
                                            <Link to="/dashboard/manage-trips" className={"list-dashboard" + (this.props.location.pathname.split("/")[2] === 'manage-trips' ? ' list-active' : '')}>Manage Trips</Link>
                                        </li>
                                        <li className="list-group-item">
                                            <Link to="/dashboard/schedules" className={"list-dashboard" + (this.props.location.pathname.split("/")[2] === 'schedules' ? ' list-active' : '')}>Schedules</Link>
                                        </li>
                                        <li className="list-group-item">
                                            <Link to="/dashboard/promos" className={"list-dashboard" + (this.props.location.pathname.split("/")[2] === 'promos' ? ' list-active' : '')}>Promos</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-9">
                                <Switch>
                                    <Route path='/dashboard' exact component={Overview}/>
                                    <Route path='/dashboard/payments-pending' component={PaymentsPending}/>
                                    <Route path='/dashboard/transaction-history' component={TransactionHistory}/>
                                    <Route path='/dashboard/manage-trips' exact component={ManageTrips}/>
                                    <Route path='/dashboard/manage-trips/add-trip' component={AddTrip}/>
                                    <Route path='/dashboard/manage-trips/edit-trip/:id' component={EditTrip}/>
                                    <Route path='/dashboard/schedules' exact component={Schedules}/>
                                    <Route path='/dashboard/schedules/edit-schedule/:id' component={EditSchedule}/>
                                    <Route path='/dashboard/promos' component={Promos}/>
                                </Switch>
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