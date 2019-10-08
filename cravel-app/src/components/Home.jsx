import React, { Component } from 'react'
import axios from 'axios'
import TripItem from './TripItem'
import { URL_API } from '../helpers'
import '../styles/home.css'

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
            <div className="navbar-spacing">
                <div className="container">
                    <div className="pt-5 mb-4">
                        <h3>Our Best Pick</h3>
                        <p>Book one of these unique spots to escape the ordinary</p>
                        <div className="row">
                            {this.tripList()}
                        </div>
                    </div>
                    <div>
                        <h3>International Destinations</h3>
                        <p>A selection of places to stay verified for quality and design</p>
                        <div className="row">
                            {this.tripList()}
                        </div>
                    </div>
                </div>
            </div>    
        )
    } 
}

export default Home