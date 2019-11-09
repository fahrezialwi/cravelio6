import React, { Component } from 'react'
import moment from 'moment'
import ClampLines from 'react-clamp-lines'
import { Link } from 'react-router-dom'
import URL_API from '../../../configs/urlAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

class CompletedReviewItem extends Component {

    starList = (starCount) => {
        let star = []

        for ( let i = 0 ; i < starCount ; i++ ){
            star.push (
                <FontAwesomeIcon icon={faStar} className="star-rating" key={i}/>
            )
        }

        for ( let i = starCount ; i < 5 ; i++ ){
            star.push (
                <FontAwesomeIcon icon={faStar} className="star-off" key={i}/>
            )
        }

        return star
    }
    
    render() {
        let review = this.props.completedReview

        return (
            <div className="col-12">
                <div className="card review-card mb-4">
                    <div className="card-body">
                        <div className="row mx-0 pt-2 pb-3 border-bottom">
                            <div className="col-6 border-right">
                                Invoice:<br/>
                                <Link to={`/invoice/${review.transaction_id}`}>INV/TRIP/{moment(review.created_at).format('YYYYMMDD')}/{review.transaction_id}</Link>
                            </div>
                            <div className="col-6">
                                Review Date:<br/>
                                {moment(review.created_at).format('MMM Do YYYY, HH:mm')}
                            </div>
                        </div>
                        <div className="row mx-0">
                            <div className="col-12">
                                <div className="row pt-3 pb-2">
                                    <div className="col-1 pr-0">
                                        <img src={URL_API + 'files/trip/' + review.main_picture} alt="trip" width="100%"/>
                                    </div>
                                    <div className="col-9">
                                        <Link to={`/trip/${review.path}`}>
                                            <div className="trip-name">{review.trip_name}</div>
                                        </Link>
                                        <div>{moment(review.start_date).format('MMMM DD, YYYY')} - {moment(review.end_date).format('MMMM DD, YYYY')}</div>
                                        <div>{this.starList(review.star)}</div>
                                        {/* <div>{review.review_title}</div> */}
                                        <ClampLines 
                                            text={review.review_content}
                                            id={review.review_id}
                                            lines={2}
                                            ellipsis="..."
                                            moreText="Expand"
                                            lessText="Collapse"
                                        />
                                        {/* <div className="mt-2">{review.review_content}</div> */}
                                    </div>
                                    <div className="col-2 text-right">
                                        <button className="btn-main">Edit Review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompletedReviewItem