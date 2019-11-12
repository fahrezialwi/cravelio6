import React, { Component } from 'react'
import axios from 'axios'
import URL_API from '../../../configs/urlAPI'
import moment from 'moment'
import ReadMoreAndLess from 'react-read-more-less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import '../../styles/reviews.css'

class Reviews extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            currentPage: 1,
            reviewsPerPage: 5
        }
        this.myRef = React.createRef()
    }

    componentDidMount() {
        this.getReviewsData()
    }

    getReviewsData = () => {
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

            let average = arr => arr.reduce((p,c) => p+c, 0 )/arr.length
            let arrReview = res.data.results.map(review => {
                return review.star
            })

            let averageResult = average(arrReview)
            if (isNaN(averageResult)) {
                averageResult = 0
            }

            this.props.review(averageResult.toFixed(1),res.data.results.length)
        })
    }

    onPageClick = (e) => {
        let offsetPosition = this.myRef.current.offsetTop + 450
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        })

        e.persist()
        setTimeout(() => { 
            this.setState({
                currentPage: Number(e.target.id)
            })
        }, 700)
    }

    onPreviousClick = () => {
        if (this.state.currentPage > 1) {
            let offsetPosition = this.myRef.current.offsetTop + 450
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })

            setTimeout(() => { 
                this.setState({
                    currentPage: this.state.currentPage - 1
                })
            }, 700)
        }
    }

    onNextClick = () => {
        if (this.state.currentPage < Math.ceil(this.state.reviews.length / this.state.reviewsPerPage)) {
            let offsetPosition = this.myRef.current.offsetTop + 450
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })

            setTimeout(() => { 
                this.setState({
                    currentPage: this.state.currentPage + 1
                })
            }, 700)
        }
    }

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

    reviewList = () => {
        const { reviews, currentPage, reviewsPerPage } = this.state
        const indexOfLastReview = currentPage * reviewsPerPage
        const indexOfFirstReview = indexOfLastReview - reviewsPerPage
        const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview)

        if (currentReviews.length > 0) {
            return currentReviews.map(review => {
                return (
                    <div className="col-12" key={review.review_id}>
                        <div className="row mb-4">
                            <div className="col-1 pr-0">
                                <img src={URL_API + 'files/profile-picture/' + review.profile_picture} alt="profile" className="profile-picture"/>
                            </div>
                            <div className="col-11">
                                <h5 className="review-name mb-0">{review.first_name} {review.last_name}</h5>
                                <span className="dot">&#183;</span>
                                <span className="review-date">{moment(review.updated_at).format('MMM Do, YYYY')}</span>
                                <div>{this.starList(review.star)}</div>
                            </div>
                            <div className="col-12 mt-3">
                                <div className="mt-2 mb-3">
                                    <ReadMoreAndLess
                                        ref={this.ReadMore}
                                        charLimit={280}
                                        readMoreText="Show more"
                                        readLessText="Show less"
                                    >
                                        {review.review_content}
                                    </ReadMoreAndLess>
                                </div>
                                <div className="mb-2">{this.pictureList(review.pictures)}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className="col-12 text-center">
                    No reviews
                </div>
            )
        }
    }

    pageNumberList = () => {

        const { reviews, reviewsPerPage } = this.state
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
            pageNumbers.push(i)
        }
    
        return pageNumbers.map(number => {
            return (
                <li
                    className={"page-item" + (this.state.currentPage === number ? ' active' : '')}
                    key={number}
                >
                    <button
                        className="page-link"
                        id={number}
                        onClick={this.onPageClick}
                    >
                        {number}
                    </button>
                </li>

            )
        })
    }

    render() {
        return (
            <div className="row mt-5 mb-4" ref={this.myRef}>
                <div className="col-12 mb-2">
                    <h4><strong>Reviews</strong></h4>
                </div>
                {this.reviewList()}
                <div className="col-12 mt-3">
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li
                                className={"page-item" + (this.state.currentPage === 1 ? ' disabled' : '')}
                            >
                                <button
                                    className="page-link"
                                    onClick={this.onPreviousClick}
                                >
                                    Newer
                                </button>
                            </li>
                            {this.pageNumberList()}
                            <li
                                className={"page-item" + (this.state.currentPage === Math.ceil(this.state.reviews.length / this.state.reviewsPerPage) ? ' disabled' : '')}
                            >
                                <button className="page-link" onClick={this.onNextClick}>
                                    Older
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Reviews