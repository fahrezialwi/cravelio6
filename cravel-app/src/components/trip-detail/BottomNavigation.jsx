import React, { Component } from 'react'

class BottomNavigation extends Component {
    render() {
        return (
            <div className="bottom-navigation">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <h6 className="card-title">{this.props.trip.name}</h6>
                            <div className="card-price">Rp {this.props.trip.price}/pax</div>
                        </div>
                        <div className="col-2 text-right"><button className="btn btn-dark pl-5 pr-5 mt-1" onClick={()=> {this.onBookClick()}}>Book</button></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BottomNavigation