import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
import { onBookingTrip } from '../../actions/booking'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Detail from '../components/trip-detail/Detail'
import Description from '../components/trip-detail/Description'
import Pictures from '../components/trip-detail/Pictures'
import Reviews from '../components/trip-detail/Reviews'
import Itinerary from '../components/trip-detail/Itinerary'
import PriceIncludes from '../components/trip-detail/PriceIncludes'
import PriceExcludes from '../components/trip-detail/PriceExcludes'
import FrequentQuestion from '../components/trip-detail/FrequentQuestion'
import Sidebar from '../components/trip-detail/Sidebar'
import URL_API from '../../configs/urlAPI'
import '../styles/trip-detail.css'

class TripDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trip: '',
            reviewAvg: '',
            reviewCount: '',
            startDate: '',
            endDate: '',
            pax: 1
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            URL_API + `trips/${this.props.location.pathname.split("/").pop()}`
        ).then(res => {      
            this.setState({
                trip: res.data.results[0]
            })    
        })
    }

    reviewHandler = (reviewAvg, reviewCount) => {
        this.setState({
            reviewAvg, reviewCount
        })
    }

    dateHandler = (startDate, endDate) => {
        this.setState({
            startDate, endDate
        })
    }

    paxHandler = (pax) => {
        this.setState({
            pax
        })
    }

    onBookClick = () => {
        if(this.props.userId){
            this.props.onBookingTrip(
                this.state.trip.trip_name,
                this.state.trip.price,
                this.state.startDate,
                this.state.endDate,
                this.state.pax
            )

            this.props.history.push("/checkout")
        } else {
            this.props.history.push("/login")
        }
    }

    render() {
        if(this.state.trip){
            return (
                <div>
                    <Header/>
                    <div className="navbar-spacing">
                        <Pictures tripId={this.state.trip.trip_id}/>
                        <div className="container container-height">
                            <div className="row row-top row-bottom">
                                <div className="col-8">
                                    <div className="row">
                                        <Detail trip={this.state.trip}/>
                                        <Description trip={this.state.trip}/>
                                    </div>
                                    <Reviews tripId={this.state.trip.trip_id} review={this.reviewHandler}/>
                                    <Tabs defaultActiveKey="itinerary" id="uncontrolled-tab-example">
                                        <Tab eventKey="itinerary" title="Itinerary">
                                            <Itinerary trip={this.state.trip}/>
                                        </Tab>
                                        <Tab eventKey="includes" title="Price Includes">
                                            <PriceIncludes trip={this.state.trip}/>
                                        </Tab>
                                        <Tab eventKey="excludes" title="Price Excludes">
                                            <PriceExcludes trip={this.state.trip}/>
                                        </Tab>
                                        <Tab eventKey="faq" title="FAQ">
                                            <FrequentQuestion trip={this.state.trip}/>
                                        </Tab>
                                    </Tabs>
                                </div>
                                <div className="col-4">
                                    <Sidebar
                                        reviewAvg={this.state.reviewAvg}
                                        reviewCount={this.state.reviewCount}
                                        trip={this.state.trip}
                                        date={this.state.startDate}
                                        pickDate={this.dateHandler}
                                        pax={this.paxHandler}
                                        bookClick={this.onBookClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else if(this.state.trip === undefined) {
            return <Redirect to='/404'/>
        } else {
            return (
                <div>
                    <Header/>
                    <div className="navbar-spacing">
                        <div className="container container-height">
                            <h1 className="row-top text-center">Loading</h1>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName
    }
}

export default withRouter(connect(mapStateToProps,{onBookingTrip})(TripDetail))