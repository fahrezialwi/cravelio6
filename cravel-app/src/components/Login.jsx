import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { onLoginUser } from '../actions/auth'

class Login extends Component {
    
    onLoginSubmit = (e) => {
        e.preventDefault()

        axios.get (
            'http://localhost:1010/login',
            {
                params: {
                    email: this.email.value,
                    password: this.password.value
                }
            }
        ).then((res)=> {
            if (res.data.length === 0){
                alert('User not found')
            } else {
                let{id, first_name, last_name, email} = res.data[0]
                localStorage.setItem(
                    'userData',
                    JSON.stringify({id, first_name, last_name, email})
                )
                this.props.onLoginUser(id, first_name, last_name, email)
            }
        })
    }

    render() {
        if(!this.props.email){
            return (
                <div className="container login-top">
                    <div className="row">
                        <div className="col-sm-8 col-md-4 mx-auto">
                            <div className="card-body">
                                <h2>Login</h2>
                                <form onSubmit={this.onLoginSubmit}>
                                    <div className="input-group"><input ref={(input)=>{this.email = input}} type="text" className="form-control mt-3" placeholder="Email"/></div>
                                    <div className="input-group"><input ref={(input)=>{this.password = input}} type="password" className="form-control mt-3" placeholder="Password"/></div>
                                    <div className="text-center">
                                        <button className="btn btn-block btn-dark mt-4" onClick={this.onLoginSubmit}>Login</button>
                                    </div>
                                </form>
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

export default connect(mapStateToProps,{onLoginUser})(Login)

