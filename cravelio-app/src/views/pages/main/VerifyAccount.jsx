import React, { Component } from 'react'
import axios from 'axios'
import querystring from 'query-string'
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
            expired: false
        }
    }

    componentDidMount = () => {
        document.title = 'Verify Account - Cravelio'
        this.verifyUser()
    }

    verifyUser = () => {
        axios.get(
            URL_API + 'check_password_link', {
                params: {
                    token: querystring.parse(this.props.location.search).key
                }
            }
        ).then(res => {
            if (res.data.status === 404) {
                this.setState({
                    expired: true
                })
            } else {
                axios.patch(
                    URL_API + 'verify_user', {
                        token: querystring.parse(this.props.location.search).key
                    }
                )
            }
        })
    }

    render() {
          if (!this.state.expired) {
            if (!this.props.userId) {
                return (
                    <div>
                        <Header/>
                        <div className="container container-height">
                            <div className="row row-top">
                                <div className="col-12 text-center">
                                    <p>Your account has been verified. Click <Link to="/login" className="click-here">here</Link> to login.</p>
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