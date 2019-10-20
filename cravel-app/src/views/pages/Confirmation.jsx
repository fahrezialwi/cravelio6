import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import formatCurrency from '../../helpers/formatCurrency'
import URL_API from '../../configs/urlAPI'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class Confirmation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            proceed: false,
        }
    }

    proceedPayment = () => {
        // this.setState({
        //     proceed: true
        // })
        // setTimeout(() => {
        //     this.props.history.push('/invoice')
        // }, 3000)
        axios.post(
            URL_API + 'transactions', {

            }
        ).then(res => {
            console.log(res.data)
        })
    }

    renderParticipants = () => {
        let participants = []
        for (let i = 1 ; i <= this.props.pax ; i++){
            participants.push(
                <tr>
                    <td>{i}</td>
                    <td>{this.props.participants[`firstName${i}`]} {this.props.participants[`lastName${i}`]}</td>
                    <td>{this.props.participants[`idType${i}`]}</td>
                    <td>{this.props.participants[`idNumber${i}`]}</td>
                </tr>
            )
        }
        console.log(participants)
        return participants
    }

    render() {
        if(this.props.participants){
            if(!this.state.proceed){
                return (
                    <div>
                        <Header/>
                        <div className="navbar-spacing">
                            <div className="container container-height">
                                <div className="row row-top">
                                    <div className="col-12">
                                        <h2>Confirmation</h2>
                                        <p>Please check your order</p>
                                    </div>
                                </div>
                                <div className="row pb-3">
                                    <div className="col-12">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <p>Trip Name: {this.props.tripName}</p>
                                                <p>Date: {moment(this.props.startDate).format('MMM Do, YYYY')} - {moment(this.props.endDate).format('MMM Do, YYYY')}</p>
                                                <p>Price Total: {formatCurrency(this.props.totalPrice)}</p>
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
                                                        {this.renderParticipants()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row row-bottom">
                                    <div className="col-3 mr-auto">
                                        <Link to="/checkout">
                                            <button className="btn btn-dark btn-block">Back</button>
                                        </Link>
                                    </div>
                                    <div className="col-3 ml-auto">
                                        <button onClick={() => this.proceedPayment()} className="btn btn-dark btn-block">Proceed to Payment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
            } else {
                return(
                    <div>
                        <Header/>
                        <div className="navbar-spacing">
                            <div className="container container-height">
                                <div className="text-center row-top row-bottom">
                                    <h4 className="mb-4">Processing your order</h4>
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
            }
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        tripName: state.booking.tripName,
        tripPrice: state.booking.tripPrice,
        startDate: state.booking.startDate,
        endDate: state.booking.endDate,
        totalPrice: state.booking.totalPrice,
        pax: state.booking.pax,
        participants: state.booking.participants
    }
}

export default withRouter(connect(mapStateToProps)(Confirmation))