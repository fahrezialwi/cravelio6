import React, { Component } from 'react'
import axios from 'axios'
import { URL_API } from '../../helpers'

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

    reviewList = () => {
        return this.state.reviews.map(review => {
            return (
                <div className="col-12" key={review.review_id}>
                    <div className="row">
                        <div className="col-1">
                            <h4>{review.star}</h4>
                        </div>
                        <div className="col-11">
                            <h5>{review.first_name} {review.last_name}</h5>
                            <p>{review.review_content}</p>
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