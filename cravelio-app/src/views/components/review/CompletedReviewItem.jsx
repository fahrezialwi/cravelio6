import React, { Component } from 'react'
import moment from 'moment'
import ReadMoreAndLess from 'react-read-more-less'
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

    pictureList = (pictures) => {
        return pictures.map((picture, index) => {
            if (picture === null) {
                return null
            } else {
                return (
                    <a href={URL_API + 'files/review/' + picture} key={index} target="_blank" rel="noopener noreferrer">
                        <img src={URL_API + 'files/review/' + picture} className="mr-3" width="100" alt={index}/>
                    </a>
                )
            }
        })
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
                                Last Updated:<br/>
                                {moment(review.updated_at).format('MMM Do YYYY, HH:mm')}
                            </div>
                        </div>
                        <div className="row mx-0">
                            <div className="col-12">
                                <div className="row pt-3 pb-2">
                                    <div className="col-1 pr-0">
                                        <img src={URL_API + 'files/trip/' + review.main_picture} alt="trip" width="100%"/>
                                    </div>
                                    <div className="col-9">
                                        <Link to={`/trip/${review.path}`} className="trip-name">{review.trip_name}</Link>
                                        <div>{moment(review.start_date).format('MMMM DD, YYYY')} - {moment(review.end_date).format('MMMM DD, YYYY')}</div>
                                        <div>{this.starList(review.star)}</div>
                                        <div className="mt-2 mb-3">
                                            <ReadMoreAndLess
                                                ref={this.ReadMore}
                                                charLimit={300}
                                                readMoreText="Show more"
                                                readLessText="Show less"
                                            >
                                                {review.review_content}
                                            </ReadMoreAndLess>
                                        </div>
                                        <div className="mb-2">{this.pictureList(review.pictures)}</div>
                                    </div>
                                    <div className="col-2 text-right">
                                        <Link to={`/review/my-review/edit-review/${review.review_id}`}>
                                            <button className="btn-main">Edit Review</button>
                                        </Link>
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