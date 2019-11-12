import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
// import HeaderDashboard from '../../components/header/HeaderDashboard'
// import FooterDashboard from '../../components/footer/FooterDashboard'
import Overview from './Overview'
import PendingPayments from './PendingPayments'
import TransactionHistory from './TransactionHistory'
import ManageTrips from './ManageTrips'
import AddTrip from './AddTrip'
import EditTrip from './EditTrip'
import Schedules from './Schedules'
import EditSchedule from './EditSchedule'
import Promos from './Promos'
import Chats from './Chats'
import '../../styles/dashboard.css'

class Dashboard extends Component {

    render() {
        if (this.props.role === 'admin') {
            return (
                <div>
                    <div className="container-fluid container-height">
                        <div className="row">
                            <div className="col-3 d-none d-md-block sidebar pl-0 pr-0">
                                <div className="sidebar-sticky">
                                    <div className="card-header card-header-dashboard">
                                        <div className="pt-3 pb-1 text-center">
                                            <Link to="/">
                                                <h2 className="dashboard-logo">cravelio</h2>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body card-body-dashboard">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <Link to="/dashboard" className={"list-dashboard" + (this.props.location.pathname === '/dashboard' ? ' list-active' : '')}>Overview</Link>
                                            </li>
                                            <li className="list-group-item">
                                                <Link to="/dashboard/pending-payments" className={"list-dashboard" + (this.props.location.pathname.split("/")[2] === 'pending-payments' ? ' list-active' : '')}>Pending Payments</Link>
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
                                            <li className="list-group-item">
                                                <Link to="/dashboard/chats" className={"list-dashboard" + (this.props.location.pathname.split("/")[2] === 'chats' ? ' list-active' : '')}>Chats</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9 pl-4 pr-4">
                                <Switch>
                                    <Route path='/dashboard' exact component={Overview}/>
                                    <Route path='/dashboard/pending-payments' component={PendingPayments}/>
                                    <Route path='/dashboard/transaction-history' component={TransactionHistory}/>
                                    <Route path='/dashboard/manage-trips' exact component={ManageTrips}/>
                                    <Route path='/dashboard/manage-trips/add-trip' component={AddTrip}/>
                                    <Route path='/dashboard/manage-trips/edit-trip/:id' component={EditTrip}/>
                                    <Route path='/dashboard/schedules' exact component={Schedules}/>
                                    <Route path='/dashboard/schedules/edit-schedule/:id' component={EditSchedule}/>
                                    <Route path='/dashboard/promos' component={Promos}/>
                                    <Route path='/dashboard/chats' component={Chats}/>
                                </Switch>
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