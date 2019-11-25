import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { onLoginUser } from '../../../actions/auth'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import URL_API from '../../../configs/urlAPI'
import encrypt from '../../../helpers/crypto'
import '../../styles/login.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            userEmail: '',
            loading: '',
            success: '',
            error: '',
            notVerified: ''
        }
    }
    
    componentDidMount() {
        document.title = 'Login - Cravelio'
    }

    onLoginSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })

        if (!this.state.email || !this.state.password) {
            this.setState({
                loading: false,
                error: 'Email and password cannot be empty.'
            })

            setTimeout(() => { 
                this.setState({
                    error: ''
                }) 
            }, 5000)
        } else {
            axios.get (
                URL_API + 'login', {
                    params: {
                        email: this.state.email,
                        password: encrypt(this.state.password)
                    }
                }
            ).then((res)=> {
                if (res.data.status === 401) {
                    this.setState({
                        loading: false,
                        error: 'Incorrect email or password.'
                    })
                    setTimeout(() => { 
                        this.setState({
                            error: ''
                        }) 
                    }, 5000)
                } else {
                    let {user_id, first_name, last_name, email, role, phone_number, profile_picture, is_verified} = res.data.results[0]

                    if (is_verified === 1) {
                        this.props.onLoginUser(user_id, first_name, last_name, email, role, phone_number, profile_picture)
                    } else {
                        this.setState({
                            loading: false,
                            notVerified: true,
                            userEmail: email
                        })
                    }
                }
            })
        }
    }

    onVerifyClick = () => {
        axios.post(
            URL_API + 'send_verification_link', {
                email: this.state.userEmail
            }
        ).then(res => {
            this.setState({
                notVerified: '',
                success: `Verification link has been sent to ${this.state.userEmail}. Please check your inbox.`
            })
            setTimeout(() => { 
                this.setState({
                    success: ''
                }) 
            }, 10000)
        })
    }

    loadingButton = () => {
        if (this.state.loading) {
            return (
                <div className="not-allowed">
                    <button 
                        className="btn-block btn-main mt-4 pointer-events-none"
                    >
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                </div>
            )
        } else {
            return (
                <button 
                    className="btn-block btn-main mt-4"
                    onClick={this.onLoginSubmit}
                >
                    Login
                </button>
            )
        }
    }

    notification = () => {
        if (this.state.error) {
            return (
                <div className="alert alert-danger mt-4">
                    {this.state.error}
                </div>
            )
        } else if (this.state.notVerified) {
            return (
                <div className="alert alert-danger mt-4">
                    Please verify your account. Click <span onClick={this.onVerifyClick} className="send-verify">here</span> to resend verification link.
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
                                    <h2>Login</h2>
                                    <form onSubmit={this.onLoginSubmit}>
                                        <div className="input-group"><input onChange={e => this.setState({email: e.target.value})} type="email" className="form-control mt-3" placeholder="Email"/></div>
                                        <div className="input-group"><input onChange={e => this.setState({password: e.target.value})} type="password" className="form-control mt-3" placeholder="Password"/></div>
                                        {this.loadingButton()}
                                    </form>
                                    <Link to="/forgot-password">
                                        <div className="text-light-dark mt-3">
                                            Forgot password?
                                        </div>
                                    </Link>
                                    {this.notification()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            if (this.props.role === 'user') {
                return <Redirect to="/"/>
            } else {
                return <Redirect to='/dashboard'/>
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        role: state.auth.role
    }
}

export default connect(mapStateToProps,{onLoginUser})(Login)