import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: '',
            error: '',
            success: ''
        }
    }

    onRegisterSubmit = (e) => {
        e.preventDefault()

        this.setState({loading: true})

        let firstName = this.firstName.value
        let lastName = this.lastName.value
        let email = this.email.value
        let password = this.password.value
        
        axios.get(
            'http://localhost:2019/users', 
            {
                params: {
                    email: email
                }
            }
        ).then((res) => {
            if(res.data.length > 0){
                // Spinner akan jadi button, akan muncul pesan error
                this.setState({loading: false, error:'Email has already been used'})

                // Menghapus pesan error setelah 3 detik
                setTimeout(() => { 
                    this.setState({error: ''}) 
                }, 3000)
            } else {
                // POST data tersebut ke db.json
                axios.post(
                    'http://localhost:2019/users', 
                    {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: password
                    }
                ).then(() => {
                    // Spinner jadi button, muncul pesan success
                    this.setState({loading: false, success:'Registration successful'})

                    // Redirect setelah 3 detik
                    setTimeout(() => { 
                        this.props.history.push("/login")
                    }, 3000) 
                })
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
                onClick={this.onRegisterSubmit}
            >
                Register
            </button>
        )

    }

    notification = () => {
        if(this.state.error){
            // notif error
            return (
                <div className='alert alert-success mt-4'>
                    {this.state.error}
                </div>
            )

        } else if(this.state.success){
            // notif success
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
        if(!this.props.email){
            return (
                <div className="container login-top">
                    <div className="row">
                        <div className="col-sm-8 col-md-4 mx-auto">
                            <div className="card-body">
                                <h2>Register</h2>
                                <form onClick={this.loadingButton}>
                                    <div className="row">
                                        <div className="col-6 input-group pr-2"><input ref={(input)=>{this.firstName = input}} type="text" className="form-control mt-3" placeholder="First name"/></div>
                                        <div className="col-6 input-group pl-2"><input ref={(input)=>{this.lastName = input}} type="text" className="form-control mt-3" placeholder="Last name"/></div>
                                    </div>
                                    <div className="input-group"><input ref={(input)=>{this.email = input}} type="email" className="form-control mt-3" placeholder="Email"/></div>
                                    <div className="input-group"><input ref={(input)=>{this.password = input}} type="password" className="form-control mt-3" placeholder="Password"/></div>
                                    {this.loadingButton()}
                                </form>
                                {this.notification()}
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

export default withRouter(connect(mapStateToProps)(Register))