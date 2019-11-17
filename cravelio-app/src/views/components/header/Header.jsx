import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
} from 'reactstrap'
import { connect } from 'react-redux'
import { onLogoutUser } from '../../../actions/auth'
import Cookies from 'universal-cookie'
import URL_API from '../../../configs/urlAPI'
import '../../styles/header.css'

const cookie = new Cookies()

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            user: ''
        }
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData = () => {
        if (this.props.userId) {
            axios.get(
                URL_API + `users/${this.props.userId}`, {
                    headers: {
                        Authorization: cookie.get('token')
                    }
                }
            ).then(res => {
                this.setState({
                    user: res.data.results[0]
                })
            })
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    userMenu = () => {
        if (!this.props.userId) {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link className="nav-link mr-3" to="/register">Register</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link mr-3" to="/login">Login</Link>
                    </NavItem>
                </Nav>
            )
        } else {
            if (this.props.role === 'admin') {
                return (
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/dashboard">Admin Dashboard</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="navbar-dropdown">
                            <div className="d-inline-block">
                                {`Hello, ${this.props.firstName}`}
                            </div>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <div className="text-profile row pt-2 pb-2 pl-4 pr-4">
                                    <div className="col-4 pr-0">
                                        {
                                            this.state.user.profile_picture ?
                                            <img src={URL_API + 'files/profile-picture/' + this.state.user.profile_picture} alt="profile" className="profile-picture-header"/>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="col-8">{this.state.user.first_name} {this.state.user.last_name}</div>
                                </div>
                                <DropdownItem divider />
                                <DropdownItem className="text-light-dark" onClick={this.props.onLogoutUser}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                )
            } else {
                return (
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="navbar-dropdown">
                            <div className="d-inline-block">
                                {`Hello, ${this.props.firstName}`}
                            </div>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <div className="text-profile row pt-2 pb-2 pl-4 pr-4">
                                    <div className="col-4 pr-0">
                                        {
                                            this.state.user.profile_picture ?
                                            <img src={URL_API + 'files/profile-picture/' + this.state.user.profile_picture} alt="profile" className="profile-picture-header"/>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="col-8">{this.state.user.first_name} {this.state.user.last_name}</div>
                                </div>
                                <DropdownItem divider />
                                <Link to="/edit-profile">
                                    <DropdownItem className="text-light-dark">
                                        Edit Profile
                                    </DropdownItem>
                                </Link>
                                <Link to="/wishlist">
                                    <DropdownItem className="text-light-dark">
                                        Wishlist
                                    </DropdownItem>
                                </Link>
                                <Link to="/purchase-list">
                                    <DropdownItem className="text-light-dark">
                                        Purchase List
                                    </DropdownItem>
                                </Link>
                                <Link to="/review">
                                    <DropdownItem className="text-light-dark">
                                        Review
                                    </DropdownItem>
                                </Link>
                                <DropdownItem className="text-light-dark" onClick={this.props.onLogoutUser}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                )
            }
        }
    }

    render() {
        return (
            <Navbar color="light" light expand="md" className="navbar-main navbar-sticky">
                <div className="container">
                    <Link className="navbar-logo" to="/">
                        <img src={URL_API + 'files/general/cravelio-logo.png'} width="80" alt="cravelio-logo"/>
                    </Link>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                    {this.userMenu()}
                    </Collapse>
                </div>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        email: state.auth.email,
        role: state.auth.role
    }
}

export default connect(mapStateToProps,{onLogoutUser})(Header)