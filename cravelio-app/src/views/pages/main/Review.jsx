import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
import axios from 'axios'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import URL_API from '../../../configs/urlAPI'
import '../../styles/review.css'
import PendingReviewItem from '../../components/review/PendingReviewItem'
import CompletedReviewItem from '../../components/review/CompletedReviewItem'

registerPlugin(FilePondPluginImagePreview)

class Review extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pendingReviews: [],
            completedReviews: [],
            files: [],
            pictures: []
        }
    }

    componentDidMount() {
        document.title = 'Review - Cravelio'
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

    onStarChange = (index, value) => {
        let newPendingReviews = [...this.state.pendingReviews]
        newPendingReviews[index].star = value
        this.setState({
            pendingReviews: newPendingReviews
        })
    }

    onReviewTitleChange = (index, value) => {
        let newPendingReviews = [...this.state.pendingReviews]
        newPendingReviews[index].review_title = value
        this.setState({
            pendingReviews: newPendingReviews
        })
    }

    onReviewContentChange = (index, value) => {
        let newPendingReviews = [...this.state.pendingReviews]
        newPendingReviews[index].review_content = value
        this.setState({
            pendingReviews: newPendingReviews
        })
    }

    createPicturesArray = () => {
        let pictures = this.state.files.map(file => {
            return file.name
        })

        this.setState({
            pictures
        })
    }

    onSaveClick = (index, tripId, transactionId) => {
        
        if (
            this.state.pendingReviews[index].review_title &&
            this.state.pendingReviews[index].review_content &&
            this.state.pendingReviews[index].star
        ) {
            axios.post(
                URL_API + 'reviews', {
                    review_title: this.state.pendingReviews[index].review_title,
                    review_content: this.state.pendingReviews[index].review_content,
                    star: this.state.pendingReviews[index].star,
                    trip_id: tripId,
                    user_id: this.props.userId,
                    transaction_id: transactionId
                }
            ).then(res => {
                axios.patch(
                    URL_API + 'reviews_picture', {
                        reviews_picture: this.state.pictures,
                        insert_id: res.data.results.insertId
                    }
                ).then(res => {
                    alert("Thank you for reviewing this trip")
                    this.getPendingReviewsData()
                    this.getCompletedReviewsData()
    
                    this.refs.reviewTitle.value = ''
                    this.refs.reviewContent.value = ''
                    this.refs.star.value = ''
                    this.setState({
                        pictures: [],
                        files: []
                    })
    
                    window.scrollTo(0, 0)
                })
            })
        } else {
            alert("Please fill all form")
        }
    }

    pendingReviewList = () => {
        return this.state.pendingReviews.map((review, index) => {
            return (
                <PendingReviewItem pendingReview={review} key={index}/>
            )
        })
    }


    completedReviewList = () => {
        return this.state.completedReviews.map((review, index) => {
            return (
                <CompletedReviewItem completedReview={review} key={index}/>
            )
        })
    }

    // pendingReviewList = () => {
    //     return this.state.pendingReviews.map((review, index) => {
    //         return (
    //             <div className="col-12" key={index}>
    //                 <div className="card">
    //                     <div>{review.trip_name}</div>
    //                     <div>{review.total_payment}</div>
    //                     <div>{moment(review.created_at).format('MMM Do YYYY, HH:mm:ss')}</div>
    //                     <div>
    //                         <input
    //                             type="number"
    //                             min="1"
    //                             max="5"
    //                             ref="star"
    //                             onChange={e => this.onStarChange(index, parseInt(e.target.value))}
    //                             className="form-control"
    //                         />
    //                     </div>
    //                     <div>
    //                         <input
    //                             type="text"
    //                             ref="reviewTitle"
    //                             onChange={e => this.onReviewTitleChange(index, e.target.value)}
    //                             className="form-control"
    //                         />
    //                     </div>
    //                     <div>
    //                         <input
    //                             type="text"
    //                             ref="reviewContent"
    //                             onChange={e => this.onReviewContentChange(index, e.target.value)}
    //                             className="form-control"
    //                         />
    //                     </div>
    //                     <div>
    //                         <FilePond 
    //                             ref={ref => this.pond = ref}
    //                             files={this.state.files}
    //                             allowMultiple={true}
    //                             // onprocessfiles={() => this.createPicturesArray()}
    //                             onupdatefiles={fileItems => {
    //                                 this.setState({
    //                                     files: fileItems.map(fileItem => {
    //                                         return fileItem.file
    //                                     })
    //                                 })
    //                             }}
    //                             server={{
    //                                 process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
    //                                     const fd = new FormData()
    //                                     fd.append(fieldName, file, file.name)
                            
    //                                     const xhr = new XMLHttpRequest()
    //                                     xhr.open('POST', URL_API + 'reviews_picture')
                            
    //                                     xhr.upload.onprogress = (e) => {
    //                                         progress(e.lengthComputable, e.loaded, e.total)
    //                                     }
                        
    //                                     xhr.onload = () => {
    //                                         if (xhr.status >= 200 && xhr.status < 300) {
    //                                             load(xhr.responseText)
    //                                         } else {
    //                                             error('Upload error')
    //                                         }
    //                                     }

    //                                     xhr.onreadystatechange = () => {
    //                                         if (xhr.readyState === XMLHttpRequest.DONE) {
    //                                             let pictures = [...this.state.pictures]
    //                                             pictures.push(xhr.responseText)
    //                                             this.setState({
    //                                                 pictures
    //                                             })
    //                                         }
    //                                     }

    //                                     xhr.send(fd)
    //                                     return {
    //                                         abort: () => {
    //                                             xhr.abort()
    //                                             abort()
    //                                         }
    //                                     }
    //                                 },

    //                                 revert: (uniqueFileId, load, error) => {
    //                                     const xhr = new XMLHttpRequest()
    //                                     xhr.open('DELETE', URL_API + 'reviews_picture')
    //                                     xhr.send(uniqueFileId)

    //                                     let pictures = [...this.state.pictures]
    //                                     pictures.pop()
    //                                     this.setState({
    //                                         pictures
    //                                     })

    //                                     error('Delete error')
    //                                     load()
    //                                 }
    //                             }}
    //                         >
    //                         </FilePond>
    //                     </div>
    //                     <div><button onClick={() => this.onSaveClick(index, review.trip_id, review.transaction_id)} className="btn-main">Save</button></div>
    //                 </div>
    //             </div>
    //         )
    //     })
    // }

    onEditClick = (reviewId) => {
        axios.patch(
            URL_API + `reviews/${reviewId}`, {
                review_title: '',
                review_content: '',
                star: ''
            }
        ).then(res => {
            this.getCompletedReviewsData()
        })
    }

    // reviewPictureList = (pictures) => {
    //     return pictures.map((picture, index) => {
    //         if(picture){
    //             return (
    //                 <img src={URL_API + 'files/review/' + picture} alt={index} key={index} width="150"/>
    //             )
    //         } else {
    //             return null
    //         }
    //     })
    // }

    render() {
        console.log(this.state.files)
        console.log(this.state.pictures)
        console.log(this.state.pendingReviews)
        if (this.props.userId) {
            return (
                <div>
                    <Header/>
                    <div className="container container-height">
                        <div className="row pt-5">
                            <div className="col-12">
                                <Tabs defaultActiveKey="awaitingReview" id="uncontrolled-tab-example">
                                    <Tab eventKey="awaitingReview" title="Awaiting Review">
                                        <div className="row">
                                            {this.pendingReviewList()}
                                        </div>
                                    </Tab>
                                    <Tab eventKey="yourReview" title="Your Review">
                                        <div className="row">
                                            {this.completedReviewList()}
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            return (
                <Redirect to="/"/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Review)