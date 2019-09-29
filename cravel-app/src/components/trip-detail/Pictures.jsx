import React, { Component } from 'react'
import axios from 'axios'
import { URL_API } from '../../helpers'

class Pictures extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pictures: ''
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            URL_API + 'pictures', {
                params: {
                    trip_id: this.props.tripId
                }
            }
        ).then((res) => {    
            this.setState({
                pictures: res.data.results
            }) 
        })
    }

    render() {
        if(this.state.pictures){
            return (
                <div className="row mt-3 mb-3">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <img src={this.state.pictures[0].picture_link} alt="1" width="100%"/>
                            </div>  
                            <div className="col-6">
                                <img src={this.state.pictures[1].picture_link} alt="2" width="100%"/>
                            </div> 
                            <div className="col-6">
                                <img src={this.state.pictures[2].picture_link} alt="3" width="100%"/>
                            </div> 
                        </div>
                    </div>  
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6 mb-3">
                                <img src={this.state.pictures[3].picture_link} alt="4" width="100%"/>
                            </div>  
                            <div className="col-6 mb-3">
                                <img src={this.state.pictures[4].picture_link} alt="5" width="100%"/>
                            </div> 
                            <div className="col-12">
                                <img src={this.state.pictures[5].picture_link} alt="6" width="100%"/>
                            </div> 
                        </div>
                    </div> 
                </div>
            )
        } else {
            return (
                <div className="container container-top">
                    <h1 className="text-center">Loading</h1>
                </div>
            )
        }
    }
}

export default Pictures