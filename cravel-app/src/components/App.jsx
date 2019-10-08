import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from  'react-redux'
import Header from './Header'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import TripDetail from './trip-detail/TripDetail'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import Payment from './Payment'
import Complete from './Complete'
import Footer from './Footer'
import { keepLogin } from '../actions/auth'
import '../styles/global.css'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            check: false
        }
    }

    componentDidMount() {
        let userStorage = JSON.parse(localStorage.getItem('userData'))
        if(userStorage){
            this.props.keepLogin(userStorage)
        }
        this.setState({check: true})
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/tripdetail/:id' component={TripDetail}/>
                    <Route path='/checkout' component={Checkout}/>
                    <Route path='/confirmation' component={Confirmation}/>
                    <Route path='/payment' component={Payment}/>
                    <Route path='/complete' component={Complete}/>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null,{keepLogin})(App) 