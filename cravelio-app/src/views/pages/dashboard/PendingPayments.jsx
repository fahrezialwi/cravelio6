import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import URL_API from '../../../configs/urlAPI'

class PendingPayments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactions : [],
            currentPage: 1,
            transactionsPerPage: 10
        }
    }

    componentDidMount() {
        document.title = 'Pending Payments - Cravelio Dashboard'
        this.getTransactionsData()
    }

    getTransactionsData = () => {
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

    onPageClick = (e) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        e.persist()
        setTimeout(() => { 
            this.setState({
                currentPage: Number(e.target.id)
            })
        }, 700)
    }

    onPreviousClick = () => {
        if (this.state.currentPage > 1) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })

            setTimeout(() => { 
                this.setState({
                    currentPage: this.state.currentPage - 1
                })
            }, 700)
        }
    }

    onNextClick = () => {
        if (this.state.currentPage < Math.ceil(this.state.transactions.length / this.state.transactionsPerPage)) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })

            setTimeout(() => { 
                this.setState({
                    currentPage: this.state.currentPage + 1
                })
            }, 700)
        }
    }

    onApproveClick = (transactionId, createdAt, contactEmail, contactFirstName, contactLastName, tripName, startDate, endDate, pax, tripPrice, promoCode, promoValue, totalPayment, participants) => {
        axios.patch(
            URL_API + `approve_transaction/${transactionId}`
        ).then(res => {
            axios.post(
                URL_API + 'send_purchase_approved', {
                    transaction_id: transactionId,
                    created_at: createdAt,
                    contact_email: contactEmail,
                    contact_first_name: contactFirstName,
                    contact_last_name: contactLastName,
                    trip_name: tripName,
                    start_date: startDate,
                    end_date: endDate,
                    pax: pax,
                    trip_price: tripPrice,
                    promo_code: promoCode,
                    promo_value: promoValue,
                    total_payment: totalPayment,
                    participants: participants
                }
            ).then(res => {
                toast("Transaction approved", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'toast-container'
                })
                this.getTransactionsData()
            })
        })
    }

    onRejectClick = (transactionId, createdAt, contactEmail, contactFirstName, contactLastName, tripName, startDate, endDate, pax, tripPrice, promoCode, promoValue, totalPayment, participants) => {
        axios.patch(
            URL_API + `reject_transaction/${transactionId}`
        ).then(res => {
            axios.post(
                URL_API + 'send_purchase_rejected', {
                    transaction_id: transactionId,
                    created_at: createdAt,
                    contact_email: contactEmail,
                    contact_first_name: contactFirstName,
                    contact_last_name: contactLastName,
                    trip_name: tripName,
                    start_date: startDate,
                    end_date: endDate,
                    pax: pax,
                    trip_price: tripPrice,
                    promo_code: promoCode,
                    promo_value: promoValue,
                    total_payment: totalPayment,
                    participants: participants
                }
            ).then(res => {
                toast("Transaction rejected", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'toast-container'
                })
                this.getTransactionsData()
            })
        })
    }

    transactionList = () => {
        const { transactions, currentPage, transactionsPerPage } = this.state
        const indexOfLastTransactions = currentPage * transactionsPerPage
        const indexOfFirstTransactions = indexOfLastTransactions - transactionsPerPage
        const currentTransactions = transactions.slice(indexOfFirstTransactions, indexOfLastTransactions)

        return currentTransactions.map((transaction) => {
            return (
                <tr key={transaction.transaction_id}>
                    <td>
                        <Link to={`/invoice/${transaction.transaction_id}`}>
                            INV/TRIP/{moment(transaction.created_at).format('YYYYMMDD')}/{transaction.transaction_id}
                        </Link>
                    </td>
                    <td>{transaction.trip_name}</td>
                    <td>{transaction.contact_first_name} {transaction.contact_last_name}</td>
                    <td>{transaction.contact_phone_number}</td>
                    <td>{transaction.pax}</td>
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
                    <td>
                        <button
                            className="btn-main btn-block"
                            onClick = {() => 
                                this.onApproveClick(transaction.transaction_id, transaction.created_at, transaction.contact_email, 
                                    transaction.contact_first_name, transaction.contact_last_name, transaction.trip_name,
                                    transaction.start_date, transaction.end_date, transaction.pax, transaction.trip_price,
                                    transaction.promo_code, transaction.promo_value, transaction.total_payment,
                                    transaction.participants
                                )
                            }
                            disabled={!transaction.transfer_proof}
                        >
                                Approve
                        </button>
                        <button
                            className="btn-main btn-block"
                            onClick = {() => 
                                this.onRejectClick(transaction.transaction_id, transaction.created_at, transaction.contact_email, 
                                    transaction.contact_first_name, transaction.contact_last_name, transaction.trip_name,
                                    transaction.start_date, transaction.end_date, transaction.pax, transaction.trip_price,
                                    transaction.promo_code, transaction.promo_value, transaction.total_payment,
                                    transaction.participants
                                )
                            }
                            disabled={!transaction.transfer_proof}
                        >
                            Reject
                        </button>             
                    </td>
                </tr>
            )
        })
    }

    pageNumberList = () => {

        const { transactions, transactionsPerPage } = this.state
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(transactions.length / transactionsPerPage); i++) {
            pageNumbers.push(i)
        }
    
        return pageNumbers.map(number => {
            return (
                <li
                    className={"page-item" + (this.state.currentPage === number ? ' active' : '')}
                    key={number}
                >
                    <button
                        className="page-link"
                        id={number}
                        onClick={this.onPageClick}
                    >
                        {number}
                    </button>
                </li>

            )
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="row row-top row-bottom ml-0 mr-0">
                <div className="col-12 mb-3">
                    <h2>Pending Payments</h2>
                </div>
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="align-middle">
                                <tr>
                                    <th className="align-middle">Invoice</th>
                                    <th className="align-middle">Trip Name</th>
                                    <th className="align-middle">User</th>
                                    <th className="align-middle">Phone Number</th>
                                    <th className="align-middle">Pax</th>
                                    <th className="align-middle">Bank Name</th>
                                    <th className="align-middle">Account Holder Name</th>
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
                    {
                        this.state.transactions.length === 0 ?
                        <div className="col-12 text-center">
                            No pending payments
                        </div>
                        :
                        null
                    }
                    <div className="col-12 mt-3">
                        <nav>
                            <ul className="pagination justify-content-center">
                                <li
                                    className={"page-item" + (this.state.currentPage === 1 ? ' disabled' : '')}
                                >
                                    <button
                                        className="page-link"
                                        onClick={this.onPreviousClick}
                                    >
                                        Newer
                                    </button>
                                </li>
                                {this.pageNumberList()}
                                <li
                                    className={"page-item" + (this.state.currentPage === Math.ceil(this.state.transactions.length / this.state.transactionsPerPage) ? ' disabled' : '')}
                                >
                                    <button className="page-link" onClick={this.onNextClick}>
                                        Older
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default PendingPayments