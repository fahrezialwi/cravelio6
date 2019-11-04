import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
import { onBookingTrip } from '../../actions/booking'
import { onClearBooking } from '../../actions/booking'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Detail from '../components/trip-detail/Detail'
import Description from '../components/trip-detail/Description'
import Jumbotron from '../components/trip-detail/Jumbotron'
import Reviews from '../components/trip-detail/Reviews'
import Itinerary from '../components/trip-detail/Itinerary'
import PriceIncludes from '../components/trip-detail/PriceIncludes'
import PriceExcludes from '../components/trip-detail/PriceExcludes'
import FrequentQuestion from '../components/trip-detail/FrequentQuestion'
import Sidebar from '../components/trip-detail/Sidebar'
import URL_API from '../../configs/urlAPI'

class TripDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trip: '',
            favorite: false,
            favoriteId: '',
            reviewAvg: '',
            reviewCount: '',
            startDate: '',
            endDate: '',
            pax: 1,
            // schedules: []
        }
    }

    componentDidMount() {
        this.getTripData()
        this.getFavoriteData()
        this.props.onClearBooking()
    }

    getTripData = () => {
        axios.get(
            URL_API + `trips/${this.props.location.pathname.split("/").pop()}`
        ).then(res => {      
            this.setState({
                trip: res.data.results[0]
            })
        })
    }

    getFavoriteData = () => {
        if(this.props.userId){
            axios.get(
                URL_API + 'favorites', {
                    params: {
                        path: this.props.location.pathname.split("/").pop(),
                        user_id: this.props.userId
                    }
                }
            ).then(res => {   
                if(res.data.results.length !== 0){
                    this.setState({
                        favorite: true,
                        favoriteId: res.data.results[0].favorite_id
                    })    
                } else {
                    this.setState({
                        favorite: false
                    })  
                }
            })
        }
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
            if(this.props.role === 'user'){
                this.props.onBookingTrip(
                    this.state.trip.trip_id,
                    this.state.trip.trip_name,
                    this.state.trip.price,
                    this.state.startDate,
                    this.state.endDate,
                    this.state.pax
                )

                this.props.history.push("/checkout")
            } else {
                alert("Admin cannot book trip")
            }
        } else {
            this.props.history.push("/login")
        }
    }

    onFavoriteClick = () => {
        if(this.props.userId){
            if(this.state.favorite){
                axios.patch(
                    URL_API + `favorites/${this.state.favoriteId}`
                ).then(res => {
                    this.getFavoriteData()
                })
            } else {
                axios.post(
                    URL_API + 'favorites', {
                        trip_id: this.state.trip.trip_id,
                        user_id: this.props.userId
                    }
                ).then(res => {
                    this.getFavoriteData()
                })
            }
        } else {
            this.props.history.push("/login")
        }
    }

    render() {
        if(this.state.trip){
            return (
                <div>
                    <Header/>
                    <Jumbotron
                        tripId={this.state.trip.trip_id}
                        favorite={this.props.userId ? this.state.favorite : false}
                        favoriteClick={this.onFavoriteClick}
                    />
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
                    <Footer/>
                </div>
            )
        } else if(this.state.trip === undefined) {
            return <Redirect to='/404'/>
        } else {
            return (
                <div>
                    <Header/>
                    <div className="container container-height">
                        <h1 className="row-top text-center">Loading</h1>
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
        lastName: state.auth.lastName,
        role: state.auth.role
    }
}

export default connect(mapStateToProps,{onBookingTrip,onClearBooking})(TripDetail)