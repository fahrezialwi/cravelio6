import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from  'react-redux'
import Header from './header/Header'
import Home from './home/Home'
import Register from './register/Register'
import Login from './login/Login'
import TripDetail from './trip-detail/TripDetail'
import Footer from './footer/Footer'
import ContactUs from './footer/ContactUs'
import HowToBook from './footer/HowToBook'
import HelpCenter from './footer/HelpCenter'
import Careers from './footer/Careers'
import AboutUs from './footer/AboutUs'
import OpenTrip from './footer/OpenTrip'
import PrivateTrip from './footer/PrivateTrip'
import PrivacyPolicy from './footer/PrivacyPolicy'
import TermsConditions from './footer/TermsConditions'
import Dashboard from './dashboard/Dashboard'
import NotFound from './NotFound'
import { keepLogin } from '../actions/auth'
import 'bootstrap/dist/css/bootstrap.min.css'
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
        if(this.state.check){
            return (
                <BrowserRouter>
                    <Header/>  
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/trip-detail/:id' component={TripDetail}/>
                        <Route path='/contact-us' component={ContactUs}/>
                        <Route path='/how-to-book' component={HowToBook}/>
                        <Route path='/help-center' component={HelpCenter}/>
                        <Route path='/careers' component={Careers}/>
                        <Route path='/about-us' component={AboutUs}/>
                        <Route path='/open-trip' component={OpenTrip}/>
                        <Route path='/private-trip' component={PrivateTrip}/>
                        <Route path='/privacy-policy' component={PrivacyPolicy}/>
                        <Route path='/terms-and-conditions' component={TermsConditions}/>
                        <Route path='/dashboard' component={Dashboard}/>
                        <Route path='/404' component={NotFound}/>
                        <Redirect from='*' to='/404'/>
                    </Switch>
                    <Footer/>
                </BrowserRouter>
            )
        } else {
            return <div><h1 className='text-center'>Loading</h1></div>
        } 
    }
}

export default connect(null,{keepLogin})(App) 