import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import URL_API from '../../../../configs/urlAPI'
import CompletedReviewItem from '../../../components/review/CompletedReviewItem'

class MyReview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            completedReviews: [],
            currentPage: 1,
            reviewsPerPage: 5
        }
    }

    componentDidMount() {
        document.title = 'My Review - Cravelio'
        this.getCompletedReviewsData()
    }

    getCompletedReviewsData = () => {
        axios.get(
            URL_API + 'completed_reviews', {
                params: {
                    user_id: this.props.userId
                }
            }
        ).then(res => {
            this.setState({
                completedReviews: res.data.results
            })
        })
    }

    onPageClick = (e) => {
        window.scrollTo({
            top: 0,
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
            window.scrollTo({
                top: 0,
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
        if (this.state.currentPage < Math.ceil(this.state.completedReviews.length / this.state.reviewsPerPage)) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })

            setTimeout(() => { 
                this.setState({
                    currentPage: this.state.currentPage + 1
                })
            }, 700)
        }
    }

    completedReviewList = () => {
        const { completedReviews, currentPage, reviewsPerPage } = this.state
        const indexOfLastReview = currentPage * reviewsPerPage
        const indexOfFirstReview = indexOfLastReview - reviewsPerPage
        const currentReviews = completedReviews.slice(indexOfFirstReview, indexOfLastReview)

        if (currentReviews.length > 0) {
            return currentReviews.map((review, index) => {
                return (
                    <CompletedReviewItem completedReview={review} key={index}/>
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

        const { completedReviews, reviewsPerPage } = this.state
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(completedReviews.length / reviewsPerPage); i++) {
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
            <div className="row">
                {this.completedReviewList()}
                <div className="col-12 mt-3 mb-3">
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
                                className={"page-item" + (this.state.currentPage === Math.ceil(this.state.completedReviews.length / this.state.reviewsPerPage) ? ' disabled' : '')}
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

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(MyReview)