import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../../configs/urlAPI'
import formatCurrency from '../../../helpers/formatCurrency'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import '../../styles/order-history.css'

class OrderHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            currentPage: 1,
            transactionsPerPage: 5
        }
    }

    componentDidMount() {
        document.title = 'Order History - Cravelio'
        this.getTransactionsData()
    }

    getTransactionsData = () => {
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

    onPageClick = (e) => {
        this.setState({
            currentPage: Number(e.target.id)
        })

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    onPreviousClick = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }

    onNextClick = () => {
        if (this.state.currentPage < Math.ceil(this.state.transactions.length / this.state.transactionsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
            
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }

    transactionList = () => {
        const { transactions, currentPage, transactionsPerPage } = this.state
        const indexOfLastReview = currentPage * transactionsPerPage;
        const indexOfFirstReview = indexOfLastReview - transactionsPerPage
        const currentTransactions = transactions.slice(indexOfFirstReview, indexOfLastReview)

        if (currentTransactions.length > 0) {
            return currentTransactions.map(transaction => {
                return (
                    <div className="col-12" key={transaction.transaction_id}>
                        <div className="card order-card mb-4">
                            <div className="card-body">
                                <div className="row mx-0 pb-2 border-bottom">
                                    <div className="col-12">{moment(transaction.created_at).format('MMM Do YYYY, HH:mm')}</div>
                                </div>
                                <div className="row mx-0 pt-3 pb-3 border-bottom">
                                    <div className="col-6 border-right">
                                        Invoice:<br/>
                                        INV/TRIP/{moment(transaction.created_at).format('YYYYMMDD')}/{transaction.transaction_id} 
                                    </div>
                                    <div className="col-6">
                                        Status:
                                        <div className="transaction-status">
                                            {transaction.status}
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="row mx-0 border-bottom">
                                    <div className="col-12">
                                        <div className="row pt-4 pb-4">
                                            <div className="col-1 pr-0">
                                                <img src={URL_API + 'files/trip/' + transaction.picture_link} alt="trip" width="100%"/>
                                            </div>
                                            <div className="col-8">
                                                <div className="trip-name">{transaction.trip_name}</div>
                                                {moment(transaction.start_date).format('MMMM DD, YYYY')} - {moment(transaction.end_date).format('MMMM DD, YYYY')}<br/>
                                                {transaction.pax} pax
                                            </div>
                                            <div className="col-3">
                                                Total Payment:
                                                <div className="total-payment">
                                                    {formatCurrency(transaction.total_payment)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mx-0 pt-3">
                                    <div className="col-12">
                                        <Link to={`/invoice/${transaction.transaction_id}`}>See Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className="col-12 text-center">
                    No Transactions
                </div>
            )
        }
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
        if (this.props.userId) {
            if (this.state.transactions.length !== 0) {
                return (
                    <div>
                        <Header/>
                        <div className="container container-height">
                            <div className="row row-top">
                                <div className="col-12 mb-3">
                                    <h2>Order History</h2>
                                </div>
                                    {this.transactionList()}
                                <div className="col-12 mt-3 mb-3">
                                    <nav>
                                        <ul className="pagination justify-content-center">
                                            <li
                                                className={"page-item" + (this.state.currentPage === 1 ? ' disabled' : '')}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={this.onPreviousClick}
                                                >
                                                    Previous
                                                </button>
                                            </li>
                                            {this.pageNumberList()}
                                            <li
                                                className={"page-item" + (this.state.currentPage === Math.ceil(this.state.transactions.length / this.state.transactionsPerPage) ? ' disabled' : '')}
                                            >
                                                <button className="page-link" onClick={this.onNextClick}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
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