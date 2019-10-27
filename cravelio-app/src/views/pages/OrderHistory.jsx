import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../configs/urlAPI'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class OrderHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactions : []
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get (
            URL_API + 'transactions', {
                params: {
                    user_id: this.props.userId
                }
            }
        ).then((res)=> {
            this.setState({
                transactions: res.data.results
            })
        })
    }

    transactionList = () => {
        return this.state.transactions.map((transaction) => {
            return (
                <tr key={transaction.transaction_id}>
                    <td><Link to={`/invoice/${transaction.transaction_id}`}>#{transaction.transaction_id}</Link></td>
                    <td>{transaction.trip_name}</td>
                    <td>{transaction.contact_first_name} {transaction.contact_last_name}</td>
                    <td>{transaction.contact_phone_number}</td>
                    <td>{transaction.pax}</td>
                    <td>{transaction.status}</td>
                    <td>{transaction.transfer_bank_name ? transaction.transfer_bank_name : '(not yet upload)'}</td>
                    <td>{transaction.transfer_account_holder ? transaction.transfer_account_holder : '(not yet upload)'}</td>
                    <td>
                        {
                            transaction.transfer_proof ?
                            <a href={transaction.transfer_proof} target="_blank" rel="noopener noreferrer">
                                <img src={transaction.transfer_proof} alt={transaction.transaction_id} width="100"/>
                            </a> :
                            '(not yet upload)'
                        }
                    </td>
                    <td>{moment(transaction.created_at).format('MMM Do YYYY, HH:mm:ss')}</td>
                </tr>
            )
        })
    }

    render() {
        if(this.props.userId){
            if(this.state.transactions.length !== 0){
                return (
                    <div>
                        <Header/>
                        <div className="container container-height">
                            <div className="row row-top">
                                <div className="col-12 mb-3">
                                    <h2>Order History</h2>
                                </div>
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="align-middle">Invoice ID</th>
                                                    <th className="align-middle">Trip Name</th>
                                                    <th className="align-middle">User</th>
                                                    <th className="align-middle">Phone Number</th>
                                                    <th className="align-middle">Pax</th>
                                                    <th className="align-middle">Status</th>
                                                    <th className="align-middle">Bank Name</th>
                                                    <th className="align-middle">Account Holder Name</th>
                                                    <th className="align-middle">Transfer Proof</th>
                                                    <th className="align-middle">Date Created</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.transactionList()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                ) 
            } else {
                return (
                    <div>
                        <Header/>
                        <div className="container container-height">
                            <div className="row row-top">
                                <div className="col-12 text-center">
                                    No data
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
            }
        } else {
            return (
                <Redirect to="/"/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(OrderHistory)