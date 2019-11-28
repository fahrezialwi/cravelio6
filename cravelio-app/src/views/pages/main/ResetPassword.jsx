import React, { Component } from 'react'
import axios from 'axios'
import querystring from 'query-string'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import URL_API from '../../../configs/urlAPI'
import encryptPassword from '../../../helpers/crypto'

class ResetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loadingPage: true,
            invalid: false,
            expired: false,
            password: '',
            repeatPassword: '',
            email: ''
        }
    }

    componentDidMount = () => {
        document.title = 'Reset Password - Cravelio'
        this.checkLink()
    }

    checkLink = () => {
        axios.get(
            URL_API + 'check_reset_link', {
                params: {
                    token: querystring.parse(this.props.location.search).key
                }
            }
        ).then(res => {
            if (res.data.status === 404) {
                this.setState({
                    loadingPage: false,
                    invalid: true
                })
            } else if (res.data.status === 401)  {
                this.setState({
                    loadingPage: false,
                    expired: true,
                    email: res.data.results
                })
            } else {
                this.setState({
                    loadingPage: false,
                    invalid: false,
                    expired: false
                })
            }
        })
    }

    onResendClick = () => {
        axios.post(
            URL_API + 'send_reset_link', {
                email: this.state.email
            }
        ).then(res => {
            toast(`Reset link has been sent to ${this.state.email}. Please check your inbox.`, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-container'
            })
        })
    }

    onResetClick = (e) => {
        e.preventDefault()
        
        if (this.state.password ===  this.state.repeatPassword) {
            axios.patch(
                URL_API + 'reset_password', {
                    token: querystring.parse(this.props.location.search).key,
                    password: encryptPassword(this.state.password)
                }
            ).then(res => {
                toast("Password has been changed. Please login", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'toast-container'
                })
                this.props.history.push("/login")
            })
        } else {
            toast("Password doesn't match", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-container'
            })
        }
    }

    render() {
        if (querystring.parse(this.props.location.search).key) {
            if (!this.state.loadingPage) {
                if (this.state.invalid) {
                    return (
                        <div>
                            <Header/>
                            <div className="container container-height">
                                <div className="row row-top">
                                    <div className="col-12 text-center">
                                        <p>Sorry, your link is invalid. Back to <Link to="/login" className="resend-link">home</Link>.</p>
                                    </div>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    )
                } else if (this.state.expired) {
                    return (
                        <div>
                            <Header/>
                            <div className="container container-height">
                                <div className="row row-top">
                                    <div className="col-12 text-center">
                                        <p>Link has expired. Please <span className="resend-link" onClick={this.onResendClick}>resend</span> the reset link.</p>
                                    </div>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    )
                } else {
                    if (!this.props.userId) {
                        return (
                            <div>
                                <Header/>
                                <div className="container container-height">
                                    <div className="row row-top">
                                        <div className="col-sm-8 col-md-4 mx-auto">
                                            <div className="card-body">
                                                <h2>Reset Password</h2>
                                                <form onSubmit={this.onResetClick}>
                                                    <div className="input-group">
                                                        <input onChange={e => this.setState({password: e.target.value})} type="password" className="form-control mt-3" placeholder="Password"/>
                                                    </div>
                                                    <div className="input-group">
                                                        <input onChange={e => this.setState({repeatPassword: e.target.value})} type="password" className="form-control mt-3" placeholder="Repeat Password"/>
                                                    </div>
                                                    <button 
                                                        className='btn-block btn-main mt-4'
                                                        onClick={this.onResetClick}
                                                    >
                                                        Reset
                                                    </button>
                                                </form>
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
            } else {
                return null
            }
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(ResetPassword)