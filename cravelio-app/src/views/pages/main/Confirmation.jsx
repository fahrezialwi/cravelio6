import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { onClearBooking } from '../../../actions/booking'
import axios from 'axios'
import moment from 'moment'
import formatCurrency from '../../../helpers/formatCurrency'
import URL_API from '../../../configs/urlAPI'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class Confirmation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            proceed: false,
        }
    }

    proceedPayment = () => {
        window.scrollTo(0, 0)
        this.setState({
            proceed: true
        }, () => {
            axios.post(
                URL_API + 'transactions', {
                    trip_id: this.props.tripId,
                    trip_name: this.props.tripName,
                    trip_price: this.props.tripPrice,
                    start_date: moment(this.props.startDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
                    end_date: moment(this.props.endDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
                    user_id: this.props.userId,
                    contact_first_name: this.props.contactFirstName,
                    contact_last_name: this.props.contactLastName,
                    contact_phone_number: this.props.contactPhoneNumber,
                    contact_email: this.props.contactEmail,
                    pax: this.props.pax,
                    participants: this.props.participants,
                    promo_code: this.props.promoCode,
                    promo_percentage: this.props.promoPercentage,
                    promo_value: this.props.promoValue,
                    total_payment: this.props.totalPrice,
                    status: 'Pending',
                    created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')
                }
            ).then(res => {
                setTimeout(() => { 
                    this.props.history.push(`/invoice/${res.data.results.insertId}`)
                    this.props.onClearBooking()
                }, 500)
            })
        })  
    }

    renderParticipants = () => {
        let participants = []
        for (let i = 1 ; i <= this.props.pax ; i++) {
            participants.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>{this.props.participants[`firstName${i}`]} {this.props.participants[`lastName${i}`]}</td>
                    <td>{this.props.participants[`idType${i}`]}</td>
                    <td>{this.props.participants[`idNumber${i}`]}</td>
                </tr>
            )
        }
        return participants
    }

    render() {
        if (this.props.userId && this.props.participants) {
            if (!this.state.proceed) {
                return (
                    <div>
                        <Header/>
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
                                            <p>Price ({this.props.pax} pax): {formatCurrency(this.props.pax*this.props.tripPrice)}</p>
                                            <p>Promo ({(this.props.promoCode).toUpperCase()}): - {formatCurrency(this.props.promoValue)}</p>
                                            <p>Total: {formatCurrency(this.props.totalPrice)}</p>
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
                        <Footer/>
                    </div>
                )
            } else {
                return(
                    <div>
                        <Header/>
                        <div className="container container-height">
                            <div className="text-center row-top row-bottom">
                                <h4 className="mb-4">Processing your order</h4>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
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
        userId: state.auth.userId,
        tripId: state.booking.tripId,
        tripName: state.booking.tripName,
        tripPrice: state.booking.tripPrice,
        startDate: state.booking.startDate,
        endDate: state.booking.endDate,
        pax: state.booking.pax,
        contactFirstName: state.booking.contactFirstName,
        contactLastName: state.booking.contactLastName,
        contactPhoneNumber: state.booking.contactPhoneNumber,
        contactEmail: state.booking.contactEmail,
        participants: state.booking.participants,
        promoCode: state.booking.promoCode,
        promoPercentage: state.booking.promoPercentage,
        promoValue: state.booking.promoValue,
        totalPrice: state.booking.totalPrice
    }
}

export default connect(mapStateToProps,{onClearBooking})(Confirmation)