import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Tab, Tabs } from 'react-bootstrap'
import { URL_API } from '../../helpers'
import Detail from './Detail'
import Description from './Description'
import Pictures from './Pictures'
import Reviews from './Reviews'
import Itinerary from './Itinerary'
import PriceIncludes from './PriceIncludes'
import PriceExcludes from './PriceExcludes'
import FrequentQuestion from './FrequentQuestion'
import BottomNavigation from './BottomNavigation'

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
            URL_API + `trips/${this.props.match.params.id}`
        ).then((res) => {    
            this.setState({
                trip: res.data.results[0]
            })
        })
    }

    render() {
        if(this.state.trip){
            return (
                <div className="detail-top bottom-space">
                    <Pictures tripId={this.state.trip.trip_id}/>
                    <div className="container">
                        <div className="row mt-5 mb-3">
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
                    <BottomNavigation trip={this.state.trip}/>
                </div>
            )
        } else {
            return (
                <div className="container container-top">
                    <h1 className="text-center">Loading</h1>
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