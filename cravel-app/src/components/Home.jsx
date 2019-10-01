import React, { Component } from 'react'
import axios from 'axios'
import TripItem from './TripItem'
import { URL_API } from '../helpers'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trips: [],
        }
    }
    
    componentDidMount() {
        axios.get(
            URL_API + 'trips'
        ).then((res) => {
            this.setState({
                trips: res.data.results
            })
        })
    }

    tripList = () => {
        return this.state.trips.map((trip) => {
            return <TripItem trip={trip} key={trip.trip_id}/>
        })   
    }
    
    render() {
        return (
            <div className="container home-top">
                <h3>Our Best Pick</h3>
                <p>Book one of these unique spots to escape the ordinary</p>
                <div className="row">
                    {this.tripList()}
                </div>
                <h3>International Destinations</h3>
                <p>A selection of places to stay verified for quality and design</p>
                <div className="row">
                    {this.tripList()}
                </div>
            </div>
            
        )
    } 
}

export default Home