import React, { Component } from 'react'
import axios from 'axios'
import TripItem from './TripItem'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trips: [],
        }
    }
    
    componentDidMount() {
        axios.get(
            'http://localhost:2019/trips'
        ).then((res) => {
            this.setState({
                trips: res.data
            })  
        })
    }

    tripList = () => {
        return this.state.trips.map((trip) => {
            return <TripItem trip={trip} key={trip.id}/>
        })   
    }
    
    render() {
        return (
            <div className="container home-top">
                <h3>Our Best Pick</h3>
                <div className="row">
                    {this.tripList()}
                </div>
                <h3>International Destinations</h3>
                <div className="row">
                    {this.tripList()}
                </div>
            </div>
            
        )
    } 
}

export default Home