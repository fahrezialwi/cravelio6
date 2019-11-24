import React, { Component } from 'react'
import axios from 'axios'
import querystring from 'query-string'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import URL_API from '../../../configs/urlAPI'
import '../../styles/login.css'

class VerifyAccount extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            invalid: false,
            expired: false,
            email: ''
        }
    }

    componentDidMount = () => {
        document.title = 'Verify Account - Cravelio'
        this.checkLink()
    }

    checkLink = () => {
        axios.get(
            URL_API + 'check_verification_link', {
                params: {
                    token: querystring.parse(this.props.location.search).key
                }
            }
        ).then(res => {
            if (res.data.status === 404) {
                this.setState({
                    loading: false,
                    invalid: true
                })
            } else if (res.data.status === 401)  {
                this.setState({
                    loading: false,
                    expired: true,
                    email: res.data.results
                })
            }
        })
    }

    onResendClick = () => {
        axios.post(
            URL_API + 'send_verification_link', {
                email: this.state.email
            }
        ).then(res => {
            toast(`Verification link has been sent to ${this.state.email}. Please check your inbox.`, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-container'
            })
        })
    }

    render() {
        if (querystring.parse(this.props.location.search).key) {
            if (!this.state.loading) {
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
                                        <p>Link has expired. Please <span className="resend-link" onClick={this.onResendClick}>resend</span> the verification link.</p>
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
                                        <div className="col-12 text-center">
                                            <p>Your account has been verified. Click <Link to="/login" className="resend-link">here</Link> to login.</p>
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

export default connect(mapStateToProps)(VerifyAccount)