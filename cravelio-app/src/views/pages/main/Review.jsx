import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs } from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import URL_API from '../../../configs/urlAPI'

class Review extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pendingReviews: [],
            completedReviews: []
        }
    }

    componentDidMount() {
        this.getPendingReviewsData()
        this.getCompletedReviewsData()
    }

    getPendingReviewsData = () => {
        axios.get(
            URL_API + 'pending_reviews', {
                params: {
                    user_id: this.props.userId
                }
            }
        ).then(res => {
            this.setState({
                pendingReviews: res.data.results
            })
        })
    }

    getCompletedReviewsData = () => {
        axios.get(
            URL_API + 'reviews', {
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

    pendingReviewList = () => {
        return this.state.pendingReviews.map((review, index) => {
            return (
                <tr key={index}>
                    <td>{review.trip_name}</td>
                    <td>{review.total_payment}</td>
                    <td>{moment(review.created_at).format('MMM Do YYYY, HH:mm:ss')}</td>
                    <td><input type="text" className="form-control"/></td>
                    <td><input type="text" className="form-control"/></td>
                    <td><input type="text" className="form-control"/></td>
                    <td><button className="btn btn-dark">Save</button></td>
                </tr>
            )
        })
    }

    completedReviewList = () => {
        return this.state.completedReviews.map((review, index) => {
            return (
                <tr key={index}>
                    <td>{review.trip_name}</td>
                    <td>{review.star}</td>
                    <td>{review.review_title}</td>
                    <td>{review.review_content}</td>
                    <td>{this.reviewPictureList(review.pictures)}</td>
                </tr>
            )
        })
    }

    reviewPictureList = (pictures) => {
        return pictures.map((picture, index) => {
            return (
                <img src={URL_API + 'files/review/' + picture} alt={index} key={index} width="150"/>
            )
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row pt-5">
                        <div className="col-12">
                            <Tabs defaultActiveKey="awaitingReview" id="uncontrolled-tab-example">
                                <Tab eventKey="awaitingReview" title="Awaiting Review">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Trip Name</th>
                                                    <th>Total Payment</th>
                                                    <th>Order Date</th>
                                                    <th>Star</th>
                                                    <th>Review Title</th>
                                                    <th>Review Content</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.pendingReviewList()}
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab>
                                <Tab eventKey="yourReview" title="Your Review">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Trip Name</th>
                                                    <th>Star</th>
                                                    <th>Review Title</th>
                                                    <th>Review Content</th>
                                                    <th>Pictures</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.completedReviewList()}
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Review)