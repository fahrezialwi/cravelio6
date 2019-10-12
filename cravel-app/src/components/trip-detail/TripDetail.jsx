import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
import URL_API from '../../config/urlAPI'
import Jumbotron from './Jumbotron'
import Detail from './Detail'
import Description from './Description'
import Pictures from './Pictures'
import Reviews from './Reviews'
import Itinerary from './Itinerary'
import PriceIncludes from './PriceIncludes'
import PriceExcludes from './PriceExcludes'
import FrequentQuestion from './FrequentQuestion'
import Sidebar from './Sidebar'
import '../../styles/trip-detail.css'

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
                <div className="navbar-spacing">
                    <Jumbotron trip={this.state.trip}/>
                    <div className="container container-height">
                        <div className="row row-top row-bottom">
                            <div className="col-8">
                                <div className="row">
                                    <Detail trip={this.state.trip}/>
                                    <Description trip={this.state.trip}/>
                                </div>
                                <Pictures tripId={this.state.trip.trip_id}/>
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
            )
        } else if(this.state.trip === undefined) {
            return <Redirect to='/404'/>
        } else {
            return (
                <div className="navbar-spacing">
                    <div className="container container-height">
                        <h1 className="row-top text-center">Loading</h1>
                    </div>  
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

export default connect(mapStateToProps)(TripDetail)