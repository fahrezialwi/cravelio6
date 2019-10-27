import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
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
import '../../styles/header.css'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    userMenu = () => {
        if(!this.props.userId){
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
            if(this.props.role === 'admin'){
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
                                <div className="text-light-dark pt-2 pb-2 pl-4 pr-4">
                                    <div>{this.props.firstName} {this.props.lastName}</div>
                                    <div style={{fontSize: "14px"}}>({this.props.email})</div>
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
                                <Link to="/order-history">
                                    <DropdownItem className="text-light-dark">
                                        Order History
                                    </DropdownItem>
                                </Link>
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
                                <div className="text-light-dark pt-2 pb-2 pl-4 pr-4">
                                    <div>{this.props.firstName} {this.props.lastName}</div>
                                    <div style={{fontSize: "14px"}}>({this.props.email})</div>
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
                                <Link to="/order-history">
                                    <DropdownItem className="text-light-dark">
                                        Order History
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
            <Navbar color="dark" dark expand="md" className="navbar-sticky">
                <div className="container">
                    <Link className="navbar-brand" to="/">cravelio</Link>
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

export default withRouter(connect(mapStateToProps,{onLogoutUser})(Header))