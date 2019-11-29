import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
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
import { onLogoutUser } from '../actions/auth'

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

    render() {
        if (!this.props.email){
            return (
                <div>
                    <Navbar color="dark" dark expand="md" fixed="top">
                    <div className="container">
                        <Link className="navbar-brand" to="/">cravel</Link>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink className="nav-link mr-3" to="/register">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link mr-3" to="/login">Login</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                    </Navbar>
                </div>
            )
        } else {
            return (
                <div>
                    <Navbar color="dark" dark expand="md" fixed="top">
                    <div className="container">
                        <Link className="navbar-brand" to="/">cravel</Link>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret className="navbar-dropdown">
                                    <div className="d-inline-block">
                                        {`Hello, ${this.props.firstName}`}
                                    </div>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem className="text-light-dark">
                                            <div>{this.props.firstName} {this.props.lastName}</div>
                                            <div style={{fontSize: "14px"}}>({this.props.email})</div>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem className="text-light-dark" onClick={this.props.onLogoutUser}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </div>
                    </Navbar>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        email: state.auth.email
    }
}

export default withRouter(connect(mapStateToProps,{onLogoutUser})(Header))