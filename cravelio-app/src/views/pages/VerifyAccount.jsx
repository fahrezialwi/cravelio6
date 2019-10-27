import React, { Component } from 'react'
import axios from 'axios'
import querystring from 'query-string'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import URL_API from '../../configs/urlAPI'
import '../styles/login.css'

class VerifyAccount extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expired: false
        }
    }

    componentDidMount = () => {
        this.verifyUser()
    }

    verifyUser = () => {
        axios.get(
            URL_API + 'check-password-link', {
                params: {
                    token: querystring.parse(this.props.location.search).key
                }
            }
        ).then(res => {
            if(res.data.status === 404) {
                this.setState({
                    expired: true
                })
            } else {
                axios.patch(
                    URL_API + 'verify-user', {
                        token: querystring.parse(this.props.location.search).key
                    }
                )
            }
        })
    }

    render() {
          if(!this.state.expired){
            if(!this.props.userId){
                return (
                    <div>
                        <Header/>
                        <div className="container container-height">
                            <div className="row row-top">
                                <div className="col-12 text-center">
                                    <h2>Congratulations</h2>
                                    <p>Your account has been verified. Click <Link to="/login">here</Link> to login.</p>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
            } else {
                return <Redirect to='/'/>
            }
        } else {
            return (
                <div>
                    <Header/>
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-12 text-center">
                                <p>Link has expired. Please resend the verification link.</p>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(VerifyAccount)