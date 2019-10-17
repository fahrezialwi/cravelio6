import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../../helpers/urlAPI'

class PaymentsPending extends Component {

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
                    status: 'Pending'
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
                    <td>{transaction.transaction_id}</td>
                    <td>{transaction.trip_name}</td>
                    <td>{transaction.first_name} {transaction.last_name}</td>
                    <td>{transaction.phone_number}</td>
                    <td>{transaction.pax}</td>
                    <td>{transaction.transfer_bank_name}</td>
                    <td>{transaction.transfer_account_holder}</td>
                    <td><a href={transaction.transfer_proof} target="_blank" rel="noopener noreferrer">
                            <img src={transaction.transfer_proof} alt={transaction.transaction_id} width="100"/>
                        </a>
                    </td>
                    <td>{moment(transaction.created_at).format('MMM Do YYYY, HH:mm:ss')}</td>
                    <td><button className="btn btn-dark btn-block">Approve</button></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="align-middle">
                                    <tr>
                                        <th className="align-middle">Transaction ID</th>
                                        <th className="align-middle">Trip Name</th>
                                        <th className="align-middle">User</th>
                                        <th className="align-middle">Phone Number</th>
                                        <th className="align-middle">Pax</th>
                                        <th className="align-middle">Bank Name</th>
                                        <th className="align-middle">Bank Account Holder</th>
                                        <th className="align-middle">Transfer Proof</th>
                                        <th className="align-middle">Date Created</th>
                                        <th className="align-middle">Action</th>
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
        )
    }
}

export default PaymentsPending