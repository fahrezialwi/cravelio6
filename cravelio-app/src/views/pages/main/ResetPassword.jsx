import React, { Component } from 'react'
import axios from 'axios'
import querystring from 'query-string'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import URL_API from '../../../configs/urlAPI'
import encryptPassword from '../../../helpers/crypto'
import '../../styles/login.css'

class ResetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            repeatPassword: '',
            expired: false
        }
    }

    componentDidMount = () => {
        document.title = 'Reset Password - Cravelio'
        this.checkExpiry()
    }

    checkExpiry = () => {
        axios.get(
            URL_API + 'check-password-link', {
                params: {
                    token: querystring.parse(this.props.location.search).key
                }
            }
        ).then(res => {
            if (res.data.status === 404) {
                this.setState({
                    expired: true
                })
            }
        })
    }

    onResetClick = (e) => {
        e.preventDefault()
        if (this.state.password ===  this.state.repeatPassword) {
            axios.patch(
                URL_API + 'reset-password', {
                    token: querystring.parse(this.props.location.search).key,
                    password: encryptPassword(this.state.password)
                }
            ).then(res => {
                alert("Password has been changed. Please login")
                this.props.history.push("/login")
            })
        } else {
            alert("Password doesn't match")
        }
    }

    render() {
          if (!this.state.expired) {
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
                return <Redirect to='/'/>
            }
        } else {
            return (
                <div>
                    <Header/>
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-sm-8 col-md-4 mx-auto">
                                <p>Link has expired. Please request a new reset link.</p>
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

export default connect(mapStateToProps)(ResetPassword)