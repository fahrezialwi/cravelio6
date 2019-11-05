import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import URL_API from '../../../configs/urlAPI'
import TripItem from '../../components/trip-item/TripItem'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class Wishlist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            favorites: []
        }
    }

    componentDidMount() {
        this.getFavoritesData()
    }

    getFavoritesData = () => {
        axios.get(
            URL_API + 'favorites', {
                params: {
                    user_id: this.props.userId
                }
            }
        ).then(res => {
            this.setState({
                favorites: res.data.results
            })    
        })
    }

    favoriteList = () => {
        return this.state.favorites.map(favorite => {
            return <TripItem trip={favorite} key={favorite.trip_id}/>
        })   
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row row-top">
                        <div className="col-12 mb-3">
                            <h2>Wishlist</h2>
                        </div>
                        {this.favoriteList()}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Wishlist)