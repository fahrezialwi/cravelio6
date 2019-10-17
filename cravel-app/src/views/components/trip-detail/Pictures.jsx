import React, { Component } from 'react'
import axios from 'axios'
import URL_API from '../../../helpers/urlAPI'
import FsLightbox from 'fslightbox-react'
import '../../styles/pictures.css'

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
              
                    <div className="main-image">
                        <div className="favorites">Save</div>
                        <div onClick={() => this.setToogler(!this.state.toogler, 1)} className="all-images">View All Photos</div>
                        <div onClick={() => this.setToogler(!this.state.toogler, 1)} className="left-image">
                            <img 
                                alt="1" 
                                src={this.state.pictures[0]} 
                                className="zooming-image" 
                                style={{top: "0px"}}
                                height="425.3333333333333" 
                                width="638" 
                            />
                        </div>

                        <div className="container-middle-image">
                            <div onClick={() => this.setToogler(!this.state.toogler, 2)} className="middle-image">
                                <img 
                                    alt="2" 
                                    src={this.state.pictures[1]} 
                                    className="zooming-image"
                                    style={{top: "0px"}}
                                    width="318"
                                />
                            </div>
                            <div onClick={() => this.setToogler(!this.state.toogler, 3)} className="middle-image">
                                <img 
                                    alt="3" 
                                    src={this.state.pictures[2]}
                                    className="zooming-image"
                                    style={{top: "0px"}}
                                    width="318"
                                />
                            </div>
                        </div>

                        <div className="container-right-image">
                            <div onClick={() => this.setToogler(!this.state.toogler, 4)} className="right-image">
                                <img 
                                alt="4" 
                                src={this.state.pictures[3]}
                                className="zooming-image"
                                style={{top: "0px"}}
                                width="318"/>
                            </div>
                            <div onClick={() => this.setToogler(!this.state.toogler, 5)} className="middle-image">
                                <img 
                                alt="5" 
                                src={this.state.pictures[4]} 
                                className="zooming-image"
                                style={{top: "0px"}}
                                width="318"/>
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