import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import URL_API from '../../config/urlAPI'
import encrypt from '../../config/crypto'
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

    onRegisterSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        
        let {firstName, lastName,  email, password, repeatPassword} = this.state

        password = encrypt(password)
        repeatPassword = encrypt(repeatPassword)

        if(!firstName|| !lastName || !email || !password || !repeatPassword){
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
            if(password === repeatPassword){
                axios.get(
                    URL_API + 'users', 
                    {
                        params: {
                            email: email
                        }
                    }
                ).then((res) => {
                    if(res.data.status === 200){
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
                            this.setState({
                                loading: false,
                                success:'Registration successful. Redirecting you to login page.'
                            })
                            setTimeout(() => { 
                                this.props.history.push("/login")
                            }, 3000) 
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
        if(this.state.loading){
            return (
                <div className='spinner-grow' role='status'>
                    <span className='sr-only'></span>
                </div>
            )
        }

        return (
            <button 
                className='btn-block btn btn-dark mt-4'
                onClick={this.onRegisterSubmit}
            >
                Register
            </button>
        )

    }

    notification = () => {
        if(this.state.error){
            return (
                <div className='alert alert-danger mt-4'>
                    {this.state.error}
                </div>
            )

        } else if(this.state.success){
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
        if(!this.props.email){
            return (
                <div className="navbar-spacing">
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-sm-8 col-md-4 mx-auto">
                                <div className="card-body">
                                    <h2>Register</h2>
                                    <form onClick={this.loadingButton}>
                                        <div className="row">
                                            <div className="col-6 input-group pr-2">
                                                <input onChange={e => this.setState({firstName: e.target.value})} type="text" className="form-control mt-3" placeholder="First Name" autoFocus/>
                                            </div>
                                            <div className="col-6 input-group pl-2">
                                                <input onChange={e => this.setState({lastName: e.target.value})} type="text" className="form-control mt-3" placeholder="Last Name"/>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <input onChange={e => this.setState({email: e.target.value})} type="email" className="form-control mt-3" placeholder="Email"/>
                                        </div>
                                        <div className="input-group">
                                            <input onChange={e => this.setState({password: e.target.value})} type="password" className="form-control mt-3" placeholder="Password"/>
                                        </div>
                                        <div className="input-group">
                                            <input onChange={e => this.setState({repeatPassword: e.target.value})} type="password" className="form-control mt-3" placeholder="Repeat Password"/>
                                        </div>
                                        {this.loadingButton()}
                                    </form>
                                    {this.notification()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        } else {
            return <Redirect to='/'/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.email
    }
}

export default withRouter(connect(mapStateToProps)(Register))