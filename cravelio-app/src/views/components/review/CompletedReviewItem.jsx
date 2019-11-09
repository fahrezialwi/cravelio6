import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import URL_API from '../../../configs/urlAPI'

class CompletedReviewItem extends Component {
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
                                Transaction Date:<br/>
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
                                        <div>{review.star}</div>
                                        <div>{review.review_title}</div>
                                        <div>{review.review_content}</div>
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