import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { onLoginUser } from '../../actions/auth'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import URL_API from '../../configs/urlAPI'
import encrypt from '../../helpers/crypto'
import '../styles/login.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: '',
            error: ''
        }
    }
    
    onLoginSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })

        let password = encrypt(this.password.value)
        axios.get (
            URL_API + 'login',
            {
                params: {
                    email: this.email.value,
                    password: password
                }
            }
        ).then((res)=> {
            if (res.data.status === 401){
                this.setState({
                    loading: false,
                    error: 'Incorrect email or password.'
                })
                setTimeout(() => { 
                    this.setState({
                        error: ''
                    }) 
                }, 3000)
            } else {
                let {user_id, first_name, last_name, email, role, phone_number} = res.data.results[0]

                let d = new Date()
                d.setTime(d.getTime() + (1*24*60*60*1000))
                const cookie = new Cookies()

                cookie.set(
                    'userData',
                    {
                        user_id, first_name, last_name, email, role, phone_number
                    },
                    {
                        path: "/", expires: d
                    }
                )

                this.props.onLoginUser(user_id, first_name, last_name, email, role, phone_number)
            }
        })
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
                onClick={this.onLoginSubmit}
            >
                Login
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
        } else {
            return null
        }
    }

    render() {
        if(!this.props.userId){
            return (
                <div>
                    <Header/>
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-sm-8 col-md-4 mx-auto">
                                <div className="card-body">
                                    <h2>Login</h2>
                                    <form onSubmit={this.onLoginSubmit}>
                                        <div className="input-group"><input ref={(input)=>{this.email = input}} type="email" className="form-control mt-3" placeholder="Email"/></div>
                                        <div className="input-group"><input ref={(input)=>{this.password = input}} type="password" className="form-control mt-3" placeholder="Password"/></div>
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
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps,{onLoginUser})(Login)

