import React, { Component } from 'react'
import axios from 'axios'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import TripItem from '../components/home/TripItem'
import URL_API from '../../helpers/urlAPI'
import '../styles/home.css'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trips: []
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
            <div>
                <Header/>
                    <div className="navbar-spacing">
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-12">
                                <h3>Our Best Pick</h3>
                                <p>Book one of these unique spots to escape the ordinary</p>
                            </div>
                            {this.tripList()}
                        </div>
                        <div className="row pb-5">
                            <div className="col-12">
                                <h3>International Destinations</h3>
                                <p>A selection of places to stay verified for quality and design</p>
                            </div>
                            {this.tripList()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div> 
        )
    } 
}

export default Home