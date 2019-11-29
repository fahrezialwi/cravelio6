import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from  'react-redux'
import { keepLogin } from '../actions/auth'
import { ToastContainer } from 'react-toastify'
import Cookies from 'universal-cookie'
import Home from './pages/main/Home'
import Register from './pages/main/Register'
import Login from './pages/main/Login'
import VerifyAccount from './pages/main/VerifyAccount'
import ForgotPassword from './pages/main/ForgotPassword'
import ResetPassword from './pages/main/ResetPassword'
import EditProfile from './pages/main/EditProfile'
import Wishlist from './pages/main/Wishlist'
import PurchaseList from './pages/main/PurchaseList'
import Review from './pages/main/review/Review'
import TripDetail from './pages/main/TripDetail'
import Checkout from './pages/main/Checkout'
import Confirmation from './pages/main/Confirmation'
import Invoice from './pages/main/Invoice'
import Complete from './pages/main/Complete'
import ContactUs from './pages/footer/ContactUs'
import HowToBook from './pages/footer/HowToBook'
import HelpCenter from './pages/footer/HelpCenter'
import Careers from './pages/footer/Careers'
import AboutUs from './pages/footer/AboutUs'
import OpenTrip from './pages/footer/OpenTrip'
import PrivateTrip from './pages/footer/PrivateTrip'
import PrivacyPolicy from './pages/footer/PrivacyPolicy'
import TermsAndConditions from './pages/footer/TermsAndConditions'
import Dashboard from './pages/dashboard/Dashboard'
import NotFound from './pages/main/NotFound'
import ScrollToTop from './components/general/ScrollToTop'
import crispChat from '../helpers/crispChat'
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
        crispChat()
        const cookie = new Cookies()
        let userCookie = cookie.get('userData')
        
        if (userCookie) {
            this.props.keepLogin(userCookie)
        }
        this.setState({check: true})
    }

    render() {
        if (this.state.check) {
            return (
                <BrowserRouter>
                    <ScrollToTop/>
                    <ToastContainer hideProgressBar={true}/>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/verify-account' component={VerifyAccount}/>
                        <Route path='/forgot-password' component={ForgotPassword}/>
                        <Route path='/reset-password' component={ResetPassword}/>
                        <Route path='/edit-profile' component={EditProfile}/>
                        <Route path='/wishlist' component={Wishlist}/>
                        <Route path='/purchase-list' component={PurchaseList}/>
                        <Route path='/review' component={Review}/>
                        <Route path='/trip' component={TripDetail}/>
                        <Route path='/checkout' component={Checkout}/>
                        <Route path='/confirmation' component={Confirmation}/>
                        <Route path='/invoice/:id' component={Invoice}/>
                        <Route path='/complete' component={Complete}/>
                        <Route path='/contact-us' component={ContactUs}/>
                        <Route path='/how-to-book' component={HowToBook}/>
                        <Route path='/help-center' component={HelpCenter}/>
                        <Route path='/careers' component={Careers}/>
                        <Route path='/about-us' component={AboutUs}/>
                        <Route path='/open-trip' component={OpenTrip}/>
                        <Route path='/private-trip' component={PrivateTrip}/>
                        <Route path='/privacy-policy' component={PrivacyPolicy}/>
                        <Route path='/terms-and-conditions' component={TermsAndConditions}/>
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