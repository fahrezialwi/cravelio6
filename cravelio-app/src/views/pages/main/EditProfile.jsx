import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { onEditProfile } from '../../../actions/auth'
import axios from 'axios'
import moment from 'moment'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import URL_API from '../../../configs/urlAPI'
import encrypt from '../../../helpers/crypto'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import '../../styles/edit-profile.css'

const cookie = new Cookies()

class EditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
            birthDate: '',
            address: '',
            role: '',
            phoneNumber: '',
            profilePicture: '',
            file: null
        }
    }

    componentDidMount() { 
        document.title = 'Edit Profile - Cravelio'
        this.getUserData()
    }

    getUserData = async () => {
        const res = await axios.get(URL_API + `users/${this.props.userId}`, {
            headers: {
                Authorization: cookie.get('token')
            }
        })

        this.setState({
            userId: res.data.results[0].user_id,
            firstName: res.data.results[0].first_name,
            lastName: res.data.results[0].last_name,
            email: res.data.results[0].email,
            birthDate: moment(res.data.results[0].birth_date).format('YYYY-MM-DD'),
            address: res.data.results[0].address,
            role: res.data.results[0].role,
            phoneNumber: res.data.results[0].phone_number,
            profilePicture: res.data.results[0].profile_picture,
        })

        return res
    }

    showPicture = (e) => {
        this.setState({
            profilePicture: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        }) 
    }

    onSaveClick = () => {
        if (this.state.firstName && this.state.lastName && this.state.email) {
            if (this.state.password === this.state.repeatPassword) {
                if (this.state.file) {
                    let fd = new FormData()
    
                    let data = {
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email,
                        birth_date: moment(this.state.birthDate).format('YYYY-MM-DD'),
                        address: this.state.address,
                        phone_number: this.state.phoneNumber
                    }
    
                    if (this.state.password) {
                        data.password = encrypt(this.state.password)
                    }
    
                    fd.append('browse_file', this.state.file, this.state.file.name)
                    fd.append('data', JSON.stringify(data))
                    fd.append('user_id', this.props.userId)
    
                    axios.patch(
                        URL_API + `users_picture/${this.props.userId}`, fd, {
                            headers: {
                                Authorization: cookie.get('token')
                            }
                        }
                    ).then(res => {
                        toast("Edit success", {
                            position: toast.POSITION.BOTTOM_CENTER,
                            className: 'toast-container'
                        })
                        this.setState({
                            password: '',
                            repeatPassword: '',
                            profilePicture: '',
                            file: null
                        })

                        this.getUserData().then(res2 => {
                            this.props.onEditProfile(
                                this.state.userId,
                                this.state.firstName,
                                this.state.lastName,
                                this.state.email,
                                this.state.role,
                                this.state.phoneNumber,
                                this.state.profilePicture
                            )
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    let body = {
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email,
                        birth_date: moment(this.state.birthDate).format('YYYY-MM-DD'),
                        address: this.state.address,
                        phone_number: this.state.phoneNumber
                    }

                    if (this.state.password) {
                        body.password = encrypt(this.state.password)
                    }

                    axios.patch(
                        URL_API + `users/${this.props.userId}`, body,
                        {
                            headers: {
                                Authorization: cookie.get('token')
                            }
                        }
                    ).then(res => {
                        toast("Edit success", {
                            position: toast.POSITION.BOTTOM_CENTER,
                            className: 'toast-container'
                        })
                        this.setState({
                            password: '',
                            repeatPassword: ''
                        })

                        this.refs.password.value = ''
                        this.refs.repeatPassword.value = ''
                        
                        this.getUserData().then(res2 => {
                            this.props.onEditProfile(
                                this.state.userId,
                                this.state.firstName,
                                this.state.lastName,
                                this.state.email,
                                this.state.role,
                                this.state.phoneNumber,
                                this.state.profilePicture
                            )
                        })
                        
                        window.scrollTo(0,0)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            } else {
                toast("Password doesn't match", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'toast-container'
                })
            }
        } else {
            toast("Please check your data", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-container'
            })
        }
    }

    render() {
        if (this.props.userId) {
            if (this.state.profilePicture) {
                return (
                    <div>
                        <Header/>
                        <div className="container container-height">
                            <div className="row row-top">
                                <div className="col-12 mb-3">
                                    <h2>Edit Profile</h2>
                                </div>
                                <div className="col-8 mb-3">
                                    <img 
                                        src={
                                            this.state.file ?
                                            this.state.profilePicture
                                            :
                                            URL_API + `files/profile-picture/${this.state.profilePicture}`
                                        }
                                        alt="profile"
                                        ref="profilePicture"
                                        className="profile-picture"
                                    />
                                </div>
                                <div className="col-8 mt-2 mb-1">
                                    <input type="file" onChange={e => this.showPicture(e)}/>
                                </div>
                                <div className="col-8 mt-5 mb-3">
                                    <div className="row">
                                        <div className="col-6">
                                            First Name
                                            <input 
                                                type="fname"
                                                onChange={e => this.setState({firstName: e.target.value})}
                                                defaultValue={this.state.firstName}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-6">
                                            Last Name
                                            <input 
                                                type="lname"
                                                onChange={e => this.setState({lastName: e.target.value})}
                                                defaultValue={this.state.lastName}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8 mb-3">
                                    Email
                                    <input 
                                        type="email"
                                        onChange={e => this.setState({email: e.target.value})}
                                        defaultValue={this.state.email}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-8 mb-3">
                                    <div className="row">
                                        <div className="col-6">
                                            Password
                                            <input
                                                ref="password"
                                                type="password"
                                                onChange={e => this.setState({password: e.target.value})}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-6">
                                            Repeat Password
                                            <input 
                                                ref="repeatPassword"
                                                type="password"
                                                onChange={e => this.setState({repeatPassword: e.target.value})}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8 mb-3">
                                    Birth Date
                                    <input
                                        type="date"
                                        defaultValue={this.state.birthDate}
                                        onChange={e => this.setState({birthDate: e.target.value})}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-8 mb-3">
                                    Address
                                    <input 
                                        type="text"
                                        onChange={e => this.setState({address: e.target.value})}
                                        defaultValue={this.state.address}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-8 mb-4">
                                    Phone Number
                                    <input 
                                        type="text"
                                        onChange={e => this.setState({phoneNumber: e.target.value})}
                                        defaultValue={this.state.phoneNumber}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-8 mb-5">
                                    <button onClick={() => this.onSaveClick()} className="btn-main">Save</button>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
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

export default connect(mapStateToProps,{onEditProfile})(EditProfile)