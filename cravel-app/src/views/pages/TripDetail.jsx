import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
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
import URL_API from '../../config/urlAPI'
import '../styles/trip-detail.css'

class TripDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trip: '',
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
                                    <Reviews tripId={this.state.trip.trip_id}/>
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
                                    <Sidebar trip={this.state.trip}/>
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
        id: state.auth.id
    }
}

export default withRouter(connect(mapStateToProps)(TripDetail))