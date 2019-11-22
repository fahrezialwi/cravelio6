import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
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

    componentDidMount() {
        document.title = 'Forgot Password - Cravelio'
    }
    
    onSendClick = (e) => {
        e.preventDefault()
        if (this.state.email) {
            axios.post(
                URL_API + 'send_password_link', {
                    email: this.state.email
                }
            ).then(res => {
                toast("We have sent you an email to reset your password", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'toast-container'
                })
            })
        } else {
            toast("Email cannot be empty", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-container'
            })
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
                                            className='btn-block btn-main mt-4'
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
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(ForgotPassword)