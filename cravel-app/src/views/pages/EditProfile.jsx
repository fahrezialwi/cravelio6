import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import URL_API from '../../configs/urlAPI'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class EditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            URL_API + `users/${this.props.userId}`
        ).then(res => {
            this.setState({
                user: res.data.results[0]
            })    
        })
    }

    render() {
        console.log(this.state.user)
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row row-top">
                        <div className="col-12 mb-3">
                            <h2>Edit Profile</h2>
                        </div>
                        <div className="col-8 mb-3">
                            <img src={this.state.user.profile_picture} alt="profile" width="200"/>
                        </div>
                        <div className="col-8 mb-3">
                            <div className="row">
                                <div className="col-6">
                                    First Name
                                    <input type="fname" defaultValue={this.state.user.first_name} className="form-control"></input>
                                </div>
                                <div className="col-6">
                                    Last Name
                                    <input type="lname" defaultValue={this.state.user.last_name} className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 mb-3">
                            Email
                            <input type="email" defaultValue={this.state.user.email} className="form-control"></input>
                        </div>
                        <div className="col-8 mb-3">
                            <div className="row">
                                <div className="col-6">
                                    Password
                                    <input type="password" className="form-control"></input>
                                </div>
                                <div className="col-6">
                                    Repeat Password
                                    <input type="password" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 mb-3">
                            Birthdate
                            <input type="date" className="form-control"></input>
                        </div>
                        <div className="col-8 mb-3">
                            Address
                            <input type="text" defaultValue={this.state.user.address} className="form-control"></input>
                        </div>
                        <div className="col-8 mb-4">
                            Phone Number
                            <input type="text" defaultValue={this.state.user.phone_number} className="form-control"></input>
                        </div>
                        <div className="col-8 mb-5">
                            <button className="btn btn-dark">Save</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(EditProfile)