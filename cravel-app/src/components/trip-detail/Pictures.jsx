import React, { Component } from 'react'

class Pictures extends Component {
    render() {
        return (
            <div className="row mt-3 mb-3">
                <div className="col-6">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <img src={this.props.trip.pictures[0]} alt={this.props.trip.name} width="100%"/>
                        </div>  
                        <div className="col-6">
                            <img src={this.props.trip.pictures[1]} alt={this.props.trip.name} width="100%"/>
                        </div> 
                        <div className="col-6">
                            <img src={this.props.trip.pictures[2]} alt={this.props.trip.name} width="100%"/>
                        </div> 
                    </div>
                </div>  
                <div className="col-6">
                    <div className="row">
                        <div className="col-6 mb-3">
                            <img src={this.props.trip.pictures[3]} alt={this.props.trip.name} width="100%"/>
                        </div>  
                        <div className="col-6 mb-3">
                            <img src={this.props.trip.pictures[4]} alt={this.props.trip.name} width="100%"/>
                        </div> 
                        <div className="col-12">
                            <img src={this.props.trip.pictures[5]} alt={this.props.trip.name} width="100%"/>
                        </div> 
                    </div>
                </div> 
            </div>
        )
    }
}

export default Pictures