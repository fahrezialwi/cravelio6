import React, { Component } from 'react'

class Detail extends Component {
    render() {
        return (
            <div className="col-6">
                <h2>{this.props.trip.trip_name}</h2>
                <div className="row">
                    <div className="col-12 mt-2">
                        <div className="row">
                            <div className="col-3 pr-0 text-bold">Meeting Point</div>
                            <div className="col-9 pl-0">{this.props.trip.meeting_point}</div>
                        </div>
                    </div>
                    <div className="col-12 mt-1">
                        <div className="row">
                            <div className="col-3 pr-0 text-bold">Duration</div>
                            <div className="col-9 pl-0">{this.props.trip.duration}</div>
                        </div>
                    </div>          
                    <div className="col-12 mt-1">
                        <div className="row">
                            <div className="col-3 pr-0 text-bold">Quota</div>
                            <div className="col-9 pl-0">{this.props.trip.quota} person</div>
                        </div>
                    </div>               
                </div>
            </div>
        )
    }
}

export default Detail