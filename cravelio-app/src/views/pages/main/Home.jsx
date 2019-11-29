import React, { Component } from 'react'
import axios from 'axios'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TripItem from '../../components/trip-item/TripItem'
import URL_API from '../../../configs/urlAPI'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import '../../styles/home.css'
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 40
    }
}

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tripsDomestic: [],
            tripsInternational: []
        }
    }
    
    componentDidMount() {
        document.title = 'Cravelio - The No. 1 solution for all your travel needs'
        this.getTripsDomesticData()
        this.getTripsInternationalData()
    }

    getTripsDomesticData = () => {
        axios.get(
            URL_API + 'trips_domestic'
        ).then((res) => {
            this.setState({
                tripsDomestic: res.data.results
            })
        })
    }

    getTripsInternationalData = () => {
        axios.get(
            URL_API + 'trips_international'
        ).then((res) => {
            this.setState({
                tripsInternational: res.data.results
            })
        })
    }

    tripDomesticList = () => {
        return this.state.tripsDomestic.map((trip) => {
            return <TripItem trip={trip} key={trip.trip_id}/>
        })   
    }

    tripInternationalList = () => {
        return this.state.tripsInternational.map((trip) => {
            return <TripItem trip={trip} key={trip.trip_id}/>
        })   
    }
    
    render() {
        return (
            <div>
                <Header/>
                <Carousel
                    arrows
                    centerMode
                    autoPlay
                    draggable
                    focusOnSelect={false}
                    infinite
                    slidesToSlide={1}
                    swipeable
                    responsive={responsive}
                >
                    <div className="card-carousel">
                        <img src={URL_API + 'files/banner/1573014710025-09659bb13d08d11baac37a921d8eeb0b.jpeg'} alt="carousel1"/>
                    </div>
                    <div className="card-carousel">
                        <img src={URL_API + 'files/banner/1572854818835-f50e1980b49dce02c111fdcd1d05b112.png'} alt="carousel2"/>
                    </div>
                    <div className="card-carousel">
                        <img src={URL_API + 'files/banner/1572834982811-bde1d86cd67a8d9ca215c8d55492516d.jpeg'} alt="carousel3"/>
                    </div>
                    <div className="card-carousel">
                        <img src={URL_API + 'files/banner/1569831056337-562a12dcbeeb0aff7ffac41c0c0bc26e.jpeg'} alt="carousel4"/>
                    </div>
                    <div className="card-carousel">
                        <img src={URL_API + 'files/banner/1572590217086-ebbd58839bf81526e7917cc6537c718a.png'} alt="carousel5"/>
                    </div>
                </Carousel>
                <div className="container container-height">
                    <div className="row row-top">
                        <div className="col-12">
                            <h3>Our Best Pick</h3>
                            <p>Book one of these unique spots to escape the ordinary</p>
                        </div>
                        {this.tripDomesticList()}
                    </div>
                    <div className="row row-top row-bottom">
                        <div className="col-12">
                            <h3>International Destinations</h3>
                            <p>A selection of places to stay verified for quality and design</p>
                        </div>
                        {this.tripInternationalList()}
                    </div>
                </div>
                <Footer/>
            </div> 
        )
    } 
}

export default Home