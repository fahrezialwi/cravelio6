import React, { Component } from 'react'
import axios from 'axios'
import { URL_API } from '../../helpers'
import FsLightbox from 'fslightbox-react'

class Pictures extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pictures: '',
            toogler: false,
            slide: 1
        }
    }

    setToogler = (open, num) => {
        this.setState({
            toogler: open,
            slide: num
        })
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
            let result =  res.data.results.map(val => {
                return val.picture_link
            })
            this.setState({
                pictures: result
            })
        })
    }

    render() {
        if(this.state.pictures){
            return (
                <div className="row mt-3 mb-3">
                    <div className="col-6 p-0">
                        <img onClick={() => this.setToogler(!this.state.toogler, 1)} src={this.state.pictures[1]} alt="2" width="100%"/>
                    </div> 
                    <div className="col-6">
                        <div className="row"> 
                            <div className="col-6 p-0">
                                <img onClick={() => this.setToogler(!this.state.toogler, 2)} src={this.state.pictures[2]} alt="2" width="100%"/>
                            </div>
                            <div className="col-6 p-0">
                                <img onClick={() => this.setToogler(!this.state.toogler, 3)} src={this.state.pictures[3]} alt="3" width="100%"/>
                            </div>
                            <div className="col-6 p-0">
                                <img onClick={() => this.setToogler(!this.state.toogler, 4)} src={this.state.pictures[4]} alt="2" width="100%"/>
                            </div> 
                            <div className="col-6 p-0">
                                <img onClick={() => this.setToogler(!this.state.toogler, 5)} src={this.state.pictures[5]} alt="3" width="100%"/>
                            </div>
                        </div> 
                    </div> 

                    <FsLightbox
                        toggler={this.state.toogler}
                        slide={this.state.slide}
                        type="image"
                        sources={this.state.pictures}
                    /> 
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