import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import formatCurrency from '../../helpers/formatCurrency'
import URL_API from '../../configs/urlAPI'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class Invoice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transaction: ''
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get (
            URL_API + `transactions/${this.props.match.params.id}`
        ).then((res)=> {
            this.setState({
                transaction: res.data.results[0]
            })
        })
    }

    participantsList = () => {
        return this.state.transaction.participants.map((participant, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{participant.first_name} {participant.last_name}</td>
                    <td>{participant.identification_type}</td>
                    <td>{participant.identification_number}</td>
                </tr>
            )
        })
    }

    renderUpload = () => {
        if(!this.state.transaction.transfer_proof){
            return (
                <div className="col-4">
                    Select Bank
                    <select className="form-control mb-2">
                        <option>BCA</option>
                        <option>Mandiri</option>
                    </select>
                    Account Holder Name
                    <input type="text" className="form-control mb-2"/>
                    Proof of Transfer
                    <input type="file" className="form-control"/>
                </div>
            )
        } else {
            return (
                <div className="col-12">
                    <p>You already upload your proof</p>
                    <div className="row">
                        <div className="col-2">
                            <a href={this.state.transaction.transfer_proof} target="_blank" rel="noopener noreferrer">
                                <img src={this.state.transaction.transfer_proof} alt={this.state.transaction.transaction_id} width="150"/>
                            </a>
                        </div>
                        <div className="col-10">
                            <div>Bank Name: {this.state.transaction.transfer_bank_name}</div>
                            <div>Account Holder Name: {this.state.transaction.transfer_account_holder}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderButton = () => {
        if(!this.state.transaction.transfer_proof){
            return (
                <Link to="/complete">
                    <button className="btn btn-dark btn-block">Submit</button>
                </Link>
            )
        } else {
            return null
        }
    }

    render() {
        if(this.state.transaction){
            if(this.props.userId === this.state.transaction.user_id){
                return (
                    <div>
                        <Header/>
                        <div className="navbar-spacing">
                            <div className="container container-height">
                                <div className="row row-top">
                                    <div className="col-12">
                                        <h2>Invoice #{this.state.transaction.transaction_id}</h2>
                                        <p className="mb-1">Due Amount: {formatCurrency(this.state.transaction.total_payment)}</p>
                                        <p className="mb-1">Status: {this.state.transaction.status}</p>
                                        <p>
                                            Please pay before {moment(this.state.transaction.created_at).add(1, 'days').format('MMMM DD, YYYY')} at {moment(this.state.transaction.created_at).add(1, 'days').format('HH:mm')}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <p className="mb-1">Trip Name: {this.state.transaction.trip_name}</p>
                                                <p className="mb-1">Date: {moment(this.state.transaction.start_date).format('MMMM DD, YYYY')}  - {moment(this.state.transaction.end_date).format('MMMM DD, YYYY')}</p>
                                                <p>Pax: {this.state.transaction.pax} person(s)</p>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Name</th>
                                                            <th>ID Type</th>
                                                            <th>ID Number</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.participantsList()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.renderUpload()}
                                </div>
                                <div className="row row-bottom">
                                    <div className="col-3 ml-auto">
                                        {this.renderButton()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
            } else {
                return (
                    <Redirect to="/"/>
                )
            }
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Invoice)