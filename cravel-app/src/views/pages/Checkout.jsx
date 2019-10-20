import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
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
            promoMessage: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            participants: {},
            contactDetailsError: {},
            participantsError: {}
        }
    }

    componentDidMount() {
        this.setState({
            totalPrice: this.props.pax*this.props.tripPrice,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email
        })

        if(this.props.phoneNumber){
            this.setState({
                phoneNumber: this.props.phoneNumber
            }) 
        }

        if(this.props.participants){
            this.setState({
                participants: this.props.participants
            }) 
        }
    }

    renderContactDetails = () => {
        return (
            <div className="row mb-5">
                <div className="col-12 mb-3">
                    <h4>Contact Details</h4>
                </div>
                <div className="col-6 mb-3">
                    <h6>First Name</h6>
                    <input type="fname" defaultValue={this.props.firstName} onChange={e => this.setState({firstName: e.target.value})} className="form-control"/>
                    <div className={"first-name-error" + (this.state.contactDetailsError.firstName ? ' show-error' : '')}>
                        {this.state.contactDetailsError.firstName}
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <h6>Last Name</h6>
                    <input type="lname" defaultValue={this.props.lastName} onChange={e => this.setState({lastName: e.target.value})} className="form-control"/>
                    <div className={"last-name-error" + (this.state.contactDetailsError.lastName ? ' show-error' : '')}>
                        {this.state.contactDetailsError.lastName}
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <h6>Phone Number</h6>
                    <input type="text" defaultValue={this.props.phoneNumber} onChange={e => this.setState({phoneNumber: e.target.value})} className="form-control"/>
                    <div className={"phone-number-error" + (this.state.contactDetailsError.phoneNumber ? ' show-error' : '')}>
                        {this.state.contactDetailsError.phoneNumber}
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <h6>Email</h6>
                    <input type="email" defaultValue={this.props.email} onChange={e => this.setState({email: e.target.value})} className="form-control"/>
                    <div className={"email-error" + (this.state.contactDetailsError.email ? ' show-error' : '')}>
                        {this.state.contactDetailsError.email}
                    </div>
                </div>  
            </div>
        )
    }

    renderParticipants = () => {
        let participants = []
        if(this.props.participants){
            for (let i = 1 ; i <= this.props.pax ; i++){
                participants.push(
                    <div className="row mb-3" key={i}>
                        <div className="col-12 mb-3">
                            <h4>Participant #{i}</h4>
                        </div>
                        <div className="col-2 mb-3">
                            <h6>Title</h6>
                            <select 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`title${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                                defaultValue={this.props.participants[`title${i}`]}
                            >
                                <option></option>
                                <option value="Mr.">Mr.</option>
                                <option value="Ms.">Ms.</option>
                                <option value="Mrs.">Mrs.</option>
                            </select>
                            <div className={"first-name-error" + (this.state.participantsError[`title${i}`] ? ' show-error' : '')}>
                                {this.state.participantsError[`title${i}`]}
                            </div>
                        </div>
                        <div className="col-5 mb-3">
                            <h6>First Name</h6>
                            <input 
                                type="fname" 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`firstName${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                                defaultValue={this.props.participants[`firstName${i}`]}
                            />
                            <div className={"first-name-error" + (this.state.participantsError[`firstName${i}`]? ' show-error' : '')}>
                                {this.state.participantsError[`firstName${i}`]}
                            </div>
                        </div>
                        <div className="col-5 mb-3">
                            <h6>Last Name</h6>
                            <input 
                                type="lname" 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`lastName${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                                defaultValue={this.props.participants[`lastName${i}`]}
                            />
                            <div className={"last-name-error" + (this.state.participantsError[`lastName${i}`] ? ' show-error' : '')}>
                                {this.state.participantsError[`lastName${i}`]}
                            </div>
                        </div>
                        <div className="col-4 mb-3">
                            <h6>ID Type</h6>
                            <select 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`idType${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                                defaultValue={this.props.participants[`idType${i}`]}
                            >
                                <option></option>
                                <option value="KTP">KTP</option>
                                <option value="Passport">Passport</option>
                            </select>
                            <div className={"id-type-error" + (this.state.participantsError[`idType${i}`] ? ' show-error' : '')}>
                                {this.state.participantsError[`idType${i}`]}
                            </div>
                        </div>
                        <div className="col-8 mb-3">
                            <h6>ID Number</h6>
                            <input 
                                type="text" 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`idNumber${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                                defaultValue={this.props.participants[`idNumber${i}`]}
                            />
                            <div className={"id-number-error" + (this.state.participantsError[`idNumber${i}`] ? ' show-error' : '')}>
                                {this.state.participantsError[`idNumber${i}`]}
                            </div>
                        </div>  
                    </div>
                )
            }
        } else {
            for (let i = 1 ; i <= this.props.pax ; i++){
                participants.push(
                    <div className="row mb-3" key={i}>
                        <div className="col-12 mb-3">
                            <h4>Participant #{i}</h4>
                        </div>
                        <div className="col-2 mb-3">
                            <h6>Title</h6>
                            <select 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`title${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                            >
                                <option></option>
                                <option value="Mr.">Mr.</option>
                                <option value="Ms.">Ms.</option>
                                <option value="Mrs.">Mrs.</option>
                            </select>
                            <div className={"first-name-error" + (this.state.participantsError[`title${i}`] ? ' show-error' : '')}>
                                {this.state.participantsError[`title${i}`]}
                            </div>
                        </div>
                        <div className="col-5 mb-3">
                            <h6>First Name</h6>
                            <input 
                                type="text" 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`firstName${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                            />
                            <div className={"first-name-error" + (this.state.participantsError[`firstName${i}`]? ' show-error' : '')}>
                                {this.state.participantsError[`firstName${i}`]}
                            </div>
                        </div>
                        <div className="col-5 mb-3">
                            <h6>Last Name</h6>
                            <input 
                                type="text" 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`lastName${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                            />
                            <div className={"last-name-error" + (this.state.participantsError[`lastName${i}`] ? ' show-error' : '')}>
                                {this.state.participantsError[`lastName${i}`]}
                            </div>
                        </div>
                        <div className="col-4 mb-3">
                            <h6>ID Type</h6>
                            <select 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`idType${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                            >
                                <option></option>
                                <option value="KTP">KTP</option>
                                <option value="Passport">Passport</option>
                            </select>
                            <div className={"id-type-error" + (this.state.participantsError[`idType${i}`] ? ' show-error' : '')}>
                                {this.state.participantsError[`idType${i}`]}
                            </div>
                        </div>
                        <div className="col-8 mb-3">
                            <h6>ID Number</h6>
                            <input 
                                type="text" 
                                onChange={e => this.setState({
                                    participants: {
                                        ...this.state.participants,
                                        [`idNumber${i}`]: e.target.value
                                    }
                                })}
                                className="form-control"
                                autoComplete="off"
                            />
                            <div className={"id-number-error" + (this.state.participantsError[`idNumber${i}`] ? ' show-error' : '')}>
                                {this.state.participantsError[`idNumber${i}`]}
                            </div>
                        </div>  
                    </div>
                )
            }
        }
        return participants
    }

    renderSummary = () => {
        return (
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
                                    {formatCurrency(this.props.pax*this.props.tripPrice)}
                                </div>
                            </div>
                        </li>
                        {this.renderPromoList()}
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
        )
    }

    renderPromo = () => {
        return (
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
        )
    }

    renderPromoList = () => {
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
                        totalPrice: this.props.pax*this.props.tripPrice,
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
                        promoValue: this.props.pax*this.props.tripPrice*(res.data.results[0].promo_discount/100),
                        totalPrice: this.props.pax*this.props.tripPrice-(this.props.pax*this.props.tripPrice*(res.data.results[0].promo_discount/100)),
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

    validationHandler = () => {
        let fields = this.state.participants
        let contactDetailsError = {}
        let participantsError = {}
        let formIsValid = true

        // Contact Details
        // First Name
        if(!this.state.firstName){
            formIsValid = false
            contactDetailsError["firstName"] = "Field cannot be empty"
        }

        if(this.state.firstName.length !== 0){
            if(!this.state.firstName.match(/^[a-zA-Z.-]+$/)){
                formIsValid = false
                contactDetailsError["firstName"] = "Only letters allowed"
            }
        }

        // Last Name
        if(!this.state.lastName){
            formIsValid = false
            contactDetailsError["lastName"] = "Field cannot be empty"
        }

        if(this.state.lastName.length !== 0){
            if(!this.state.lastName.match(/^[a-zA-Z.-]+$/)){
                formIsValid = false
                contactDetailsError["lastName"] = "Only letters allowed"
            }
        }

        // Phone Number
        if(!this.state.phoneNumber){
            formIsValid = false
            contactDetailsError["phoneNumber"] = "Field cannot be empty"
        }

        if(this.state.phoneNumber.length !== 0){
            if(!this.state.phoneNumber.match(/^[0-9+]+$/)){
                formIsValid = false
                contactDetailsError["phoneNumber"] = "Only numbers allowed"
            }
        }

        // Email
        if(!this.state.email){
            formIsValid = false
            contactDetailsError["email"] = "Field cannot be empty"
        }
 
        if(this.state.email.length !== 0){
            let lastAtPos = this.state.email.lastIndexOf('@')
            let lastDotPos = this.state.email.lastIndexOf('.')
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
               formIsValid = false
               contactDetailsError["email"] = "Email not valid"
             }
        }

        // Participants
        for (let i = 1 ; i <= this.props.pax ; i++){
            // Title
            if(!fields[`title${i}`]){
                formIsValid = false
                participantsError[`title${i}`] = "Please select title"
            }

            // First Name
            if(!fields[`firstName${i}`]){
                formIsValid = false
                participantsError[`firstName${i}`] = "Field cannot be empty"
            }

            if(typeof fields[`firstName${i}`] !== "undefined"){
                if(!fields[`firstName${i}`].match(/^[a-zA-Z.-]+$/)){
                    formIsValid = false
                    participantsError[`firstName${i}`] = "Only letters allowed"
                }
            }

            // Last Name
            if(!fields[`lastName${i}`]){
                formIsValid = false
                participantsError[`lastName${i}`] = "Field cannot be empty"
            }

            if(typeof fields[`lastName${i}`] !== "undefined"){
                if(!fields[`lastName${i}`].match(/^[a-zA-Z.-]+$/)){
                    formIsValid = false
                    participantsError[`lastName${i}`] = "Only letters allowed"
                }
            }

            // ID Type
            if(!fields[`idType${i}`]){
                formIsValid = false
                participantsError[`idType${i}`] = "Please select ID type"
            }

            // ID Number
            if(!fields[`idNumber${i}`]){
                formIsValid = false
                participantsError[`idNumber${i}`] = "Field cannot be empty"
            }

            if(typeof fields[`idNumber${i}`] !== "undefined"){
                if(!fields[`idNumber${i}`].match(/^[0-9]+$/)){
                    formIsValid = false
                    participantsError[`idNumber${i}`] = "Only numbers allowed"
                }
            }
        }
        this.setState({
            contactDetailsError,
            participantsError
        })

        return formIsValid
    }

    checkAllData = () => {
        if (this.validationHandler()) {
            this.props.onCheckout(this.state.participants, this.state.totalPrice)
            this.props.history.push("/confirmation")
        }
    }

    render() {
        console.log(this.state)
        if(this.props.tripName){
            return (
                <div>
                    <Header/>
                    <div>
                        <div className="container container-height">
                            <div className="row row-top pb-3">
                                <div className="col-7">
                                    {this.renderContactDetails()}
                                    {this.renderParticipants()}
                                </div>
                                <div className="col-5">
                                    {this.renderSummary()}
                                    {this.renderPromo()}
                                </div>
                            </div>
                            <div className="row row-bottom">
                                <div className="col-3 ml-auto">
                                    <button onClick={() => this.checkAllData()} className="btn btn-dark btn-block">Next</button>
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
        phoneNumber: state.auth.phoneNumber,
        tripName: state.booking.tripName,
        tripPrice: state.booking.tripPrice,
        startDate: state.booking.startDate,
        endDate: state.booking.endDate,
        pax: state.booking.pax,
        participants: state.booking.participants
    }
}

export default withRouter(connect(mapStateToProps,{onCheckout})(Checkout))