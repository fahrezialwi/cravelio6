import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import URL_API from '../../../configs/urlAPI'
import TripItem from '../../components/trip-item/TripItem'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const cookie = new Cookies()

class Wishlist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            favorites: []
        }
    }

    componentDidMount() {
        document.title = 'Wishlist - Cravelio'
        this.getFavoritesData()
    }

    getFavoritesData = () => {
        axios.get(
            URL_API + 'favorites', {
                params: {
                    user_id: this.props.userId
                },
                headers: {
                    Authorization: cookie.get('token')
                }
            }
        ).then(res => {
            this.setState({
                favorites: res.data.results
            })    
        })
    }

    favoriteList = () => {
        if (this.state.favorites.length > 0) {
            return this.state.favorites.map(favorite => {
                return <TripItem trip={favorite} key={favorite.trip_id}/>
            })   
        } else {
            return (
                <div className="col-12 text-center">
                    No wishlist
                </div>
            )
        }
    }

    render() {
        if (this.props.userId) {
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
        } else {
            return (
                <Redirect to="/"/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Wishlist)