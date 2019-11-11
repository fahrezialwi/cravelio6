import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../../configs/urlAPI'

class TransactionHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactions : []
        }
    }

    componentDidMount() {
        document.title = 'Transaction History - Cravelio Dashboard'
        this.getTransactionsData()
    }

    getTransactionsData = () => {
        axios.get (
            URL_API + 'transactions'
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
                    <td>#{transaction.transaction_id}</td>
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
                            <a href={URL_API + 'files/transfer/' + transaction.transfer_proof} target="_blank" rel="noopener noreferrer">
                                <img src={URL_API + 'files/transfer/' + transaction.transfer_proof} alt={transaction.transaction_id} width="100"/>
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
        return (
            <div className="row row-top row-bottom ml-0 mr-0">
                <div className="col-12 mb-3">
                    <h2>Transaction History</h2>
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
        )
    }
}

export default TransactionHistory