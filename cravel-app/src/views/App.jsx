import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from  'react-redux'
import { keepLogin } from '../actions/auth'
import Cookies from 'universal-cookie'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import TripDetail from './pages/TripDetail'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Payment from './pages/Payment'
import Complete from './pages/Complete'
import ContactUs from './pages/ContactUs'
import HowToBook from './pages/HowToBook'
import HelpCenter from './pages/HelpCenter'
import Careers from './pages/Careers'
import AboutUs from './pages/AboutUs'
import OpenTrip from './pages/OpenTrip'
import PrivateTrip from './pages/PrivateTrip'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/general/ScrollToTop'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            check: false
        }
    }

    componentDidMount() {
        const cookie = new Cookies()
        let userCookie = cookie.get('userData')
        
        if(userCookie){
            this.props.keepLogin(userCookie)
        }
        this.setState({check: true})
    }

    render() {
        if(this.state.check){
            return (
                <BrowserRouter>
                    <ScrollToTop/>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/trip' component={TripDetail}/>
                        <Route path='/checkout' component={Checkout}/>
                        <Route path='/confirmation' component={Confirmation}/>
                        <Route path='/payment' component={Payment}/>
                        <Route path='/complete' component={Complete}/>
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
                </BrowserRouter>
            )
        } else {
            return <div><h1 className='text-center'>Loading</h1></div>
        } 
    }
}

export default connect(null,{keepLogin})(App) 