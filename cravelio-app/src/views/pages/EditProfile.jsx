import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import URL_API from '../../configs/urlAPI'
import encrypt from '../../helpers/crypto'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class EditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profilePicture: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
            birthDate: '',
            address: '',
            phoneNumber: ''
        }
    }

    componentDidMount() {
        this.getData()
       
    }

    getData = () => {
        axios.get(
            URL_API + `users/${this.props.userId}`
        ).then(res => {
            this.setState({
                profilePicture: res.data.results[0].profile_picture,
                firstName: res.data.results[0].first_name,
                lastName: res.data.results[0].last_name,
                email: res.data.results[0].email,
                birthDate: moment(res.data.results[0].birth_date).format('YYYY-MM-DD'),
                address: res.data.results[0].address,
                phoneNumber: res.data.results[0].phone_number
            })    
        })
    }

    onEditClick = () => {
        if(this.state.firstName && this.state.lastName && this.state.email && this.state.password){
            if(this.state.password === this.state.repeatPassword){
                axios.put(
                    URL_API + `users/${this.props.userId}`, {
                        profile_picture: this.state.profilePicture,
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email,
                        password: encrypt(this.state.password),
                        birth_date: moment(this.state.birthDate).format('YYYY-MM-DD'),
                        address: this.state.address,
                        phone_number: this.state.phoneNumber,
                        updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')
                    }
                ).then(res => {
                    alert("Edit Success")
                    this.setState({
                        password: '',
                        repeatPassword: ''
                    })
                    this.refs.password.value = ''
                    this.refs.repeatPassword.value = ''
                }).catch(err => {
                    console.log(err)
                })
            } else {
                alert("Password doesn't match")
            }
        } else {
            alert("Please check your data")
        }
    }

    render() {
        if(this.state.birthDate){
            return (
                <div>
                    <Header/>
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-12 mb-3">
                                <h2>Edit Profile</h2>
                            </div>
                            <div className="col-8 mb-3">
                                <img src={this.state.profilePicture} alt="profile" width="200"/>
                            </div>
                            <div className="col-8 mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        First Name
                                        <input 
                                            type="fname"
                                            onChange={e => this.setState({firstName: e.target.value})}
                                            defaultValue={this.state.firstName}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-6">
                                        Last Name
                                        <input 
                                            type="lname"
                                            onChange={e => this.setState({lastName: e.target.value})}
                                            defaultValue={this.state.lastName}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-8 mb-3">
                                Email
                                <input 
                                    type="email"
                                    onChange={e => this.setState({email: e.target.value})}
                                    defaultValue={this.state.email}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-8 mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        Password
                                        <input
                                            ref="password"
                                            type="password"
                                            onChange={e => this.setState({password: e.target.value})}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-6">
                                        Repeat Password
                                        <input 
                                            ref="repeatPassword"
                                            type="password"
                                            onChange={e => this.setState({repeatPassword: e.target.value})}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-8 mb-3">
                                Birth Date
                                <input
                                    type="date"
                                    defaultValue={this.state.birthDate}
                                    onChange={e => this.setState({birthDate: e.target.value})}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-8 mb-3">
                                Address
                                <input 
                                    type="text"
                                    onChange={e => this.setState({address: e.target.value})}
                                    defaultValue={this.state.address}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-8 mb-4">
                                Phone Number
                                <input 
                                    type="text"
                                    onChange={e => this.setState({phoneNumber: e.target.value})}
                                    defaultValue={this.state.phoneNumber}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-8 mb-5">
                                <button onClick={() => this.onEditClick()} className="btn btn-dark">Save</button>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(EditProfile)