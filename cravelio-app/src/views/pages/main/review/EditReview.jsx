import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import StarRatingComponent from 'react-star-rating-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import URL_API from '../../../../configs/urlAPI'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

registerPlugin(FilePondPluginImagePreview)

class EditReview extends Component {
    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            reviewId: '',
            transactionId: '',
            tripId: '',
            path: '',
            tripName: '',
            startDate: '',
            endDate: '',
            mainPicture: '',
            userId: '',
            reviewContent: '',
            rating: 0,
            pictures: [],
            reviewDate: '',
            files: [],
            cancelClick: false
        }
    }

    componentDidMount() { 
        document.title = 'Edit Review - Cravelio'
        this._isMounted = true
        this.getCompleteReviewData()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getCompleteReviewData = () => {
        axios.get(
            URL_API + `completed_reviews/${this.props.match.params.id}`
        ).then(res => {
            if (this._isMounted) {
                this.setState({
                    reviewId: res.data.results[0].review_id,
                    transactionId: res.data.results[0].transaction_id,
                    tripId: res.data.results[0].trip_id,
                    path: res.data.results[0].path,
                    tripName: res.data.results[0].trip_name,
                    startDate: res.data.results[0].start_date,
                    endDate: res.data.results[0].end_date,
                    mainPicture: res.data.results[0].main_picture,
                    userId: res.data.results[0].user_id,
                    reviewContent: res.data.results[0].review_content,
                    pictures: res.data.results[0].pictures,
                    rating: res.data.results[0].star,
                    reviewDate: res.data.results[0].updated_at
                })
            }
        })
    }

    pictureList = (pictures) => {
        return pictures.map((picture, index) => {
            if (picture === null) {
                return null
            } else {
                return (
                    <div className="d-inline-block position-relative" key={index}>
                        <div onClick={() => this.onDeleteClick(picture)} className="delete-icon"><FontAwesomeIcon icon={faTimes}/></div>
                        <a href={URL_API + 'files/review/' + picture} target="_blank" rel="noopener noreferrer">
                            <img src={URL_API + 'files/review/' + picture} className="mr-3" width="100" alt={index}/>
                        </a>
                    </div>
                )
            }
        })
    }

    onDeleteClick = (pictureLink) => {
        axios.delete(
            URL_API + 'reviews_picture', {
                data: pictureLink
            }
        ).then(res => {
            this.getCompleteReviewData()
        })
    }

    onSaveClick = () => {
        axios.patch(
            URL_API + `reviews/${this.state.reviewId}`, {
                review_content: this.state.reviewContent,
                star: this.state.rating
            }
        ).then(res => {
            toast("Review updated", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-container'
            })
            this.props.history.push("/review/my-review")
        })
    }

    onCancelClick = () => {
        this.props.history.push("/review/my-review")
    }

    render() {
        if (this.state.reviewId) {
            if (this.state.userId === this.props.userId) {
                return (
                    <div className="row">
                        <div className="col-12">
                            <div className="card review-card mb-5">
                                <div className="card-body">
                                    <div className="row mx-0 pt-2 pb-3 border-bottom">
                                        <div className="col-6 border-right">
                                            Invoice:<br/>
                                            <Link to={`/invoice/${this.state.transactionId}`}>INV/TRIP/{moment(this.state.transactionDate).format('YYYYMMDD')}/{this.state.transactionId}</Link>
                                        </div>
                                        <div className="col-6">
                                            Last Updated:<br/>
                                            {moment(this.state.reviewDate).format('MMM Do YYYY, HH:mm')}
                                        </div>
                                    </div>
                                    <div className="row mx-0">
                                        <div className="col-12">
                                            <div className="row pt-3 pb-2">
                                                <div className="col-1 pr-0">
                                                    <img src={URL_API + 'files/trip/' + this.state.mainPicture} alt="trip" width="100%"/>
                                                </div>
                                                <div className="col-11">
                                                    <Link to={`/trip/${this.state.path}`}>
                                                        <div className="trip-name">{this.state.tripName}</div>
                                                    </Link>
                                                    <div>{moment(this.state.startDate).format('MMMM DD, YYYY')} - {moment(this.state.endDate).format('MMMM DD, YYYY')}</div>
                                                    <StarRatingComponent 
                                                        name="rate" 
                                                        starCount={5}
                                                        value={this.state.rating}
                                                        onStarHover={value => this.setState({rating: value})}
                                                        renderStarIcon={() => <FontAwesomeIcon icon={faStar}/>}
                                                        starColor={'#c8337c'}
                                                        emptyStarColor={'#cfcfcf'}
                                                        className="mt-3 mb-2 star-size"
                                                    />
                                                    <textarea
                                                        type="text"
                                                        rows={5}
                                                        className="form-control mb-5"
                                                        placeholder="Your review"
                                                        defaultValue={this.state.reviewContent}
                                                        onChange={e => this.setState({reviewContent: e.target.value})}
                                                    />
                                                    <div className="mb-3">{this.pictureList(this.state.pictures)}</div>
                                                    <div className="mb-5">Pictures are auto-saved</div>
                                                    <FilePond ref={ref => this.pond = ref}
                                                        files={this.state.files}
                                                        allowMultiple={true}
                                                        maxFiles={5-this.state.pictures.length}
                                                        imagePreviewHeight={150}
                                                        labelIdle={`Drop a picture here or <span class="filepond--label-action">Browse</span> (max ${5-this.state.pictures.length})`} 
                                                        onprocessfiles={() => this.getCompleteReviewData()}
                                                        server={{
                                                            process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                                                                const fd = new FormData()
                                                                fd.append(fieldName, file, file.name)
                                                                fd.append("transaction_id", this.state.transactionId)
                                                                fd.append("review_id", this.state.reviewId)
                                                    
                                                                const xhr = new XMLHttpRequest()
                                                                xhr.open('POST', URL_API + 'reviews_picture')
                                                    
                                                                xhr.upload.onprogress = (e) => {
                                                                    progress(e.lengthComputable, e.loaded, e.total)
                                                                }
                                                
                                                                xhr.onload = function() {
                                                                    if (xhr.status >= 200 && xhr.status < 300) {
                                                                        load(xhr.responseText)
                                                                    } else {
                                                                        error('Upload error')
                                                                    }
                                                                }
                                                                xhr.send(fd)
                                                                return {
                                                                    abort: () => {
                                                                        xhr.abort()
                                                                        abort()
                                                                    }
                                                                }
                                                            },
                            
                                                            revert: (uniqueFileId, load, error) => {
                                                                const xhr = new XMLHttpRequest()
                                                                xhr.open('DELETE', URL_API + 'reviews_picture')
                                                                xhr.send(uniqueFileId)
                                                                error('Delete error')
                                                                load()
                                                            }
                                                        }}
                                                    >
                                                    </FilePond>
                                                </div>
                                                <div className="col-12 mt-4 text-right">
                                                    <button className="btn-main" onClick={this.onSaveClick}>Save</button>
                                                    <button className="btn-main ml-2" onClick={this.onCancelClick}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) 
            } else {
                return (
                    <Redirect to="/"/>
                )
            }
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(EditReview)