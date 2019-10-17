import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import axios from 'axios'
import URL_API from '../../helpers/urlAPI'
import formatCurrency from '../../helpers/formatCurrency'
import '../styles/checkout.css'

const participants = [0, 1]

class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tripPrice: 800000,
            promoCode: '',
            promoPercentage: 0,
            promoValue: 0,
            totalPrice: 800000,
            promoMessage: ''
        }
    }

    renderForm = () => {
        return participants.map((val, index) => {
            return (
                <div className="row mb-3" key={index}>
                    <div className="col-12 mb-3">
                        <h4>Participant {index+1}</h4>
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
        })
    }

    renderPromo = () => {
        if(this.state.promoValue){
            return (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-6">
                            Promo
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
        if(this.state.promoCode){
            axios.get(
                URL_API + 'promos', {
                    params: {
                        promo_code: this.state.promoCode
                    }
                }
            ).then(res => {
                if (res.data.results[0] === undefined){
                    this.setState({
                        promoPercentage: 0,
                        promoValue: 0,
                        totalPrice: this.state.tripPrice,
                        promoMessage: 'Invalid code'
                    })
                    setTimeout(() => { 
                        this.setState({
                            promoMessage: ''
                        }) 
                    }, 3000)
                } else if (res.data.results[0]){
                    this.setState({
                        promoPercentage: res.data.results[0].promo_discount,
                        promoValue: this.state.tripPrice*(res.data.results[0].promo_discount/100),
                        totalPrice: this.state.tripPrice-(this.state.tripPrice*(res.data.results[0].promo_discount/100)),
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
                                                        <p className="mb-0">Bromo Adventure</p>
                                                        <div className="checkout-date">Nov 11th, 2019 - Nov 15th, 2019</div>
                                                        <div className="checkout-pax">2 pax @Rp 400.000</div>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        {formatCurrency(this.state.tripPrice)}
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
                                            <input onChange={e => this.setState({promoCode: e.target.value})} type="text" className="form-control"/>
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
                                    <button className="btn btn-dark btn-block">Next</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Checkout