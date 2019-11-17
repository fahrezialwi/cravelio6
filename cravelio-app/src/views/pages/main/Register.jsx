import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import URL_API from '../../../configs/urlAPI'
import encrypt from '../../../helpers/crypto'
import '../../styles/register.css'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
            loading: '',
            error: '',
            success: ''
        }
    }

    componentDidMount() {
        document.title = 'Register - Cravelio'
    }

    onRegisterSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        
        let {firstName, lastName,  email, password, repeatPassword} = this.state

        password = encrypt(password)
        repeatPassword = encrypt(repeatPassword)

        if (!firstName|| !lastName || !email || !password || !repeatPassword) {
            this.setState({
                loading: false,
                error: 'Please fill all input forms.'
            })
            setTimeout(() => { 
                this.setState({
                    error: ''
                }) 
            }, 3000)
        } else {
            if (password === repeatPassword) {
                axios.get(
                    URL_API + 'users_email', 
                    {
                        params: {
                            email: email
                        }
                    }
                ).then((res) => {
                    if (res.data.status === 200) {
                        this.setState({
                            loading: false,
                            error: 'Email address has already been used.'
                        })
                        setTimeout(() => { 
                            this.setState({
                                error: ''
                            }) 
                        }, 3000)
                    } else {
                        axios.post(
                            URL_API + 'users', 
                            {
                                first_name: firstName,
                                last_name: lastName,
                                email: email,
                                password: password
                            }
                        ).then(() => {
                            axios.post(
                                URL_API + 'send_verification_link', {
                                    email: email
                                }
                            ).then(res => {
                                this.setState({
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                    repeatPassword: '',
                                    loading: false,
                                    success: 'Registration successful. Please check your inbox to verify your account.'
                                })
    
                                this.refs.firstName.value = ''
                                this.refs.lastName.value = ''
                                this.refs.email.value = ''
                                this.refs.password.value = ''
                                this.refs.repeatPassword.value = ''

                                setTimeout(() => { 
                                    this.setState({
                                        success: ''
                                    })
                                }, 10000) 
                            })
                        })
                    }
                })
            } else{
                this.setState({
                    loading: false,
                    error: 'Password did not match.'
                })
                setTimeout(() => { 
                    this.setState({
                        error: ''
                    }) 
                }, 3000)
            }
        }
    }

    loadingButton = () => {
        if (this.state.loading) {
            return (
                <div className='spinner-grow' role='status'>
                    <span className='sr-only'></span>
                </div>
            )
        }

        return (
            <button 
                className='btn-block btn-main mt-4'
                onClick={this.onRegisterSubmit}
            >
                Register
            </button>
        )

    }

    notification = () => {
        if (this.state.error) {
            return (
                <div className='alert alert-danger mt-4'>
                    {this.state.error}
                </div>
            )

        } else if (this.state.success) {
            return (
                <div className='alert alert-success mt-4'>
                    {this.state.success}
                </div>
            )

        } else {
            return null
        }
    }

    render() {
        if (!this.props.userId) {
            return (
                <div>
                <Header/>
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-sm-8 col-md-4 mx-auto">
                                <div className="card-body">
                                    <h2>Register</h2>
                                    <form onClick={this.loadingButton}>
                                        <div className="row">
                                            <div className="col-6 input-group pr-2">
                                                <input onChange={e => this.setState({firstName: e.target.value})} type="fname" ref="firstName" className="form-control mt-3" placeholder="First Name" autoFocus/>
                                            </div>
                                            <div className="col-6 input-group pl-2">
                                                <input onChange={e => this.setState({lastName: e.target.value})} type="lname" ref="lastName" className="form-control mt-3" placeholder="Last Name"/>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <input onChange={e => this.setState({email: e.target.value})} type="email" ref="email" className="form-control mt-3" placeholder="Email"/>
                                        </div>
                                        <div className="input-group">
                                            <input onChange={e => this.setState({password: e.target.value})} type="password" ref="password" className="form-control mt-3" placeholder="Password"/>
                                        </div>
                                        <div className="input-group">
                                            <input onChange={e => this.setState({repeatPassword: e.target.value})} type="password" ref="repeatPassword" className="form-control mt-3" placeholder="Repeat Password"/>
                                        </div>
                                        {this.loadingButton()}
                                    </form>
                                    {this.notification()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            return <Redirect to='/'/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.userId
    }
}

export default connect(mapStateToProps)(Register)