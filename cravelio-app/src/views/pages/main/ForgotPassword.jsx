import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import URL_API from '../../../configs/urlAPI'
import '../../styles/login.css'

class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }
    
    onSendClick = (e) => {
        e.preventDefault()
        if (this.state.email) {
            axios.post(
                URL_API + 'send-password-link', {
                    email: this.state.email
                }
            ).then(res => {
                alert("We have sent you an email to reset your password")
            })
        } else {
            alert("Email cannot be empty")
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
                                    <h2>Forgot Password</h2>
                                    <form onSubmit={this.onSendClick}>
                                        <div className="input-group">
                                            <input onChange={e => this.setState({email: e.target.value})} type="email" className="form-control mt-3" placeholder="Email"/>
                                        </div>
                                        <button 
                                            className='btn-block btn btn-dark mt-4'
                                            onClick={this.onSendClick}
                                        >
                                            Send Password Link
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
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(ForgotPassword)