import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { onCheckout } from '../../actions/booking'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../configs/urlAPI'
import formatCurrency from '../../helpers/formatCurrency'
import '../styles/checkout.css'

class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            promoCode: '',
            promoCodeInput: '',
            promoPercentage: 0,
            promoValue: 0,
            totalPrice: 0,
            promoMessage: ''
        }
    }

    componentDidMount() {
        this.setState({
            totalPrice: this.props.tripPrice
        })
    }

    renderForm = () => {
        let participants = []

        for (let i = 0 ; i < this.props.pax ; i++){
            participants.push(
                <div className="row mb-3" key={i}>
                    <div className="col-12 mb-3">
                        <h4>Participant {i+1}</h4>
                    </div>
                    <div className="col-2 mb-3">
                        <h6>Title</h6>
                        <select className="form-control">
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                        </select>
                    </div>
                    <div className="col-5 mb-3">
                        <h6>First Name</h6>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="col-5 mb-3">
                        <h6>Last Name</h6>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="col-4 mb-3">
                        <h6>Identification</h6>
                        <select className="form-control">
                            <option>KTP</option>
                            <option>SIM</option>
                            <option>Passport</option>
                        </select>
                    </div>
                    <div className="col-8 mb-3">
                        <h6>Identification Number</h6>
                        <input type="text" className="form-control"/>
                    </div>  
                </div>
            )
        }
        return participants
    }

    renderPromo = () => {
        if(this.state.promoValue){
            return (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-6">
                            <p className="mb-0">Promo</p>
                            <div className="checkout-promo">{this.state.promoCode}</div>
                        </div>
                        <div className="col-6 text-right">
                            - {formatCurrency(this.state.promoValue)}
                        </div>
                    </div>
                </li>
            )
        } else {
            return null
        }
    }

    checkPromo = () => {
        if(this.state.promoCodeInput){
            axios.get(
                URL_API + 'promos', {
                    params: {
                        promo_code: this.state.promoCodeInput
                    }
                }
            ).then(res => {
                if (res.data.results[0] === undefined){
                    this.setState({
                        promoPercentage: 0,
                        promoValue: 0,
                        totalPrice: this.props.tripPrice,
                        promoMessage: 'Invalid code'
                    })
                    setTimeout(() => { 
                        this.setState({
                            promoMessage: ''
                        }) 
                    }, 3000)
                } else if (res.data.results[0]){
                    this.setState({
                        promoCode: res.data.results[0].promo_code,
                        promoPercentage: res.data.results[0].promo_discount,
                        promoValue: this.props.tripPrice*(res.data.results[0].promo_discount/100),
                        totalPrice: this.props.tripPrice-(this.props.tripPrice*(res.data.results[0].promo_discount/100)),
                        promoMessage: `Promo applied. Discount ${res.data.results[0].promo_discount}%`
                    })
                }
            })
        } else {
            this.setState({
                promoMessage: 'Field cannot be empty'
            })
            setTimeout(() => { 
                this.setState({
                    promoMessage: ''
                }) 
            }, 3000)
        }
    }

    render() {
        if(this.props.tripName){
            return (
                <div>
                    <Header/>
                    <div className="navbar-spacing">
                        <div className="container container-height">
                            <div className="row row-top pb-3">
                                <div className="col-7">
                                    <div className="row mb-5">
                                        <div className="col-12 mb-3">
                                            <h4>Contact Details</h4>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6>First Name</h6>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6>Last Name</h6>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6>Mobile Number</h6>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6>Email</h6>
                                            <input type="text" className="form-control"/>
                                        </div>  
                                    </div>
                                    {this.renderForm()}
                                </div>
                                <div className="col-5">
                                    <div className="card mb-5">
                                        <div className="card-header">
                                            Summary
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <div className="col-6 pr-0">
                                                            <p className="mb-0">{this.props.tripName}</p>
                                                            <div className="checkout-date">
                                                                {moment(this.props.startDate).format('MMM Do, YYYY')} - {moment(this.props.endDate).format('MMM Do, YYYY')}
                                                            </div>
                                                            <div className="checkout-pax">{this.props.pax} pax @{formatCurrency(this.props.tripPrice)}</div>
                                                        </div>
                                                        <div className="col-6 text-right">
                                                            {formatCurrency(this.props.tripPrice)}
                                                        </div>
                                                    </div>
                                                </li>
                                                {this.renderPromo()}
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            Total
                                                        </div>
                                                        <div className="col-6 text-right">
                                                            {formatCurrency(this.state.totalPrice)}
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            Have Promo Code?
                                        </div>
                                        <div className="card-body">
                                            <div className="input-group mb-2">
                                                <input onChange={e => this.setState({promoCodeInput: e.target.value})} type="text" className="form-control"/>
                                                <div className="input-group-append">
                                                    <button onClick = {() => this.checkPromo()} className="btn btn-dark btn-block">Apply</button>
                                                </div>
                                            </div>
                                            <div>
                                                {this.state.promoMessage}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-bottom">
                                <div className="col-3 ml-auto">
                                    <Link to={`/confirmation`}>
                                        <button onClick={this.props.onCheckout(this.state.totalPrice)} className="btn btn-dark btn-block">Next</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        email: state.auth.email,
        tripName: state.booking.tripName,
        tripPrice: state.booking.tripPrice,
        startDate: state.booking.startDate,
        endDate: state.booking.endDate,
        pax: state.booking.pax
    }
}

export default connect(mapStateToProps,{onCheckout})(Checkout)