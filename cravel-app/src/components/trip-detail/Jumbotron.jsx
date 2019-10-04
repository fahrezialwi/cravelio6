import React, { Component } from 'react'
import '../../styles/jumbotron.css'

class Jumbotron extends Component {
    render() {
        return (
            <div className="main-image">
                <img src={this.props.trip.picture_main} alt={this.props.trip.name} width="100%" height="600"/>
                <div className="favorites">Favorite</div>
            </div>  
        )
    }
}

export default Jumbotron