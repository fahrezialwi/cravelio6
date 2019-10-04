import React, { Component } from 'react'
import axios from 'axios'
import { URL_API } from '../../helpers'
import moment from 'moment'

class Reviews extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            URL_API + 'reviews', {
                params: {
                    trip_id: this.props.tripId
                }
            }
        ).then((res) => {    
            this.setState({
                reviews: res.data.results
            })    
        })
    }

    pictureList = (pictures) => {
        return pictures.map((picture, index) => {
            if (picture === null){
                return null
            } else {
                return (
                    <a href={picture} key={index} target="_blank" rel="noopener noreferrer">
                        <img src={picture} className="mr-3" width="100" alt={index}/>
                    </a>
                )
            }
        })
    }

    reviewList = () => {
        return this.state.reviews.map(review => {
            return (
                <div className="col-12" key={review.review_id}>
                    <div className="row mb-4">
                        <div className="col-1">
                            <h4>{review.star}</h4>
                        </div>
                        <div className="col-11">
                            <h4 className="d-inline-block mr-2">{review.first_name} {review.last_name}</h4>
                            on {moment(review.updated_at).format('MMM Do, YYYY')}
                            <h5>{review.review_title}</h5>
                            <p>{review.review_content}</p>
                            {this.pictureList(review.pictures)}
                            {/* {moment(new Date()).format("YYYY-MM-DD HH:mm:ss.SSS")} */}
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="row mt-5 mb-4">
                <div className="col-12 mb-2">
                    <h4><strong>Reviews</strong></h4>
                </div>
                {this.reviewList()}
            </div>
        )
    }
}

export default Reviews