import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import StarRatingComponent from 'react-star-rating-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import URL_API from '../../../../configs/urlAPI'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

registerPlugin(FilePondPluginImagePreview)

class CreateReview extends Component {
    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            transactionId: '',
            userId: '',
            tripId: '',
            path: '',
            tripName: '',
            pictureLink: '',
            startDate: '',
            endDate: '',
            pax: '',
            transactionDate: '',
            rating: 0,
            reviewContent: '',
            files: [],
            cancelClick: false
        }
    }

    componentDidMount() { 
        document.title = 'Write Review - Cravelio'
        this._isMounted = true
        this.getPendingReviewData()
    }

    componentWillUnmount() {
        this._isMounted = false
        if (this.state.files.length > 0 && !this.state.cancelClick) {
            this.clearPictures()
        }
    }

    getPendingReviewData = () => {
        axios.get(
            URL_API + `pending_reviews/${this.props.match.params.id}`
        ).then(res => {
            if (this._isMounted) {
                if (res.data.results.length > 0) {
                    this.setState({
                        transactionId: res.data.results[0].transaction_id,
                        userId: res.data.results[0].user_id,
                        tripId: res.data.results[0].trip_id,
                        path: res.data.results[0].path,
                        tripName: res.data.results[0].trip_name,
                        pictureLink: res.data.results[0].picture_link,
                        startDate: res.data.results[0].start_date,
                        endDate: res.data.results[0].end_date,
                        pax: res.data.results[0].pax,
                        transactionDate: res.data.results[0].created_at,
                    })
                } else {
                    this.props.history.push("/review/awaiting-review")
                }
            }
        })
    }

    onSaveClick = () => {
        axios.post(
            URL_API + 'reviews', {
                review_content: this.state.reviewContent,
                star: this.state.rating,
                trip_id: this.state.tripId,
                user_id: this.state.userId,
                transaction_id: this.state.transactionId
            }
        ).then(res => {
            axios.patch(
                URL_API + 'reviews_picture', {
                    transaction_id: this.state.transactionId,
                    review_id: res.data.results.insertId
                }
            ).then(res => {
                alert("Thank you for reviewing this trip")
                this.props.history.push("/review/my-review")
            })
        })
    }

    onCancelClick = () => {
        if (this.state.files.length > 0) {
            this.setState({
                cancelClick: true
            })
            axios.get(
                URL_API + `reviews_picture`, {
                    params: {
                        transaction_id: this.state.transactionId
                    }
            }).then(res => {  
                for (let i = 0; i < res.data.results.length; i++) {
                    axios.delete(
                        URL_API + `reviews_picture/${res.data.results[i].review_picture_id}`, {
                            data: {
                                picture_link: res.data.results[i].picture_link
                            }
                        }
                    )
                }
                this.props.history.push("/review/awaiting-review")
            })
        } else {
            this.props.history.push("/review/awaiting-review")
        }
    }

    clearPictures = () => {
        axios.get(
            URL_API + `reviews_picture`, {
                params: {
                    transaction_id: this.state.transactionId
                }
        }).then(res => {  
            for (let i = 0; i < res.data.results.length; i++) {
                axios.delete(
                    URL_API + `reviews_picture/${res.data.results[i].review_picture_id}`, {
                        data: {
                            picture_link: res.data.results[i].picture_link
                        }
                    }
                )
            }
        })
    }

    render() {
        if (this.state.transactionId) {
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
                                            Transaction Date:<br/>
                                            {moment(this.state.transactionDate).format('MMM Do YYYY, HH:mm')}
                                        </div>
                                    </div>
                                    <div className="row mx-0">
                                        <div className="col-12">
                                            <div className="row pt-3 pb-2">
                                                <div className="col-1 pr-0">
                                                    <img src={URL_API + 'files/trip/' + this.state.pictureLink} alt="trip" width="100%"/>
                                                </div>
                                                <div className="col-11">
                                                    <Link to={`/trip/${this.state.path}`}>
                                                        <div className="trip-name">{this.state.tripName}</div>
                                                    </Link>
                                                    <div>{moment(this.state.startDate).format('MMMM DD, YYYY')} - {moment(this.state.endDate).format('MMMM DD, YYYY')}</div>
                                                    <div>{this.state.pax} pax</div>
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
                                                        onChange={e => this.setState({reviewContent: e.target.value})}
                                                    />
                                                    <FilePond ref={ref => this.pond = ref}
                                                        files={this.state.files}
                                                        allowMultiple={true}
                                                        maxFiles={5}
                                                        imagePreviewHeight={150}
                                                        labelIdle={'Drop a picture here or <span class="filepond--label-action">Browse</span> (max 5)'} 
                                                        onupdatefiles={fileItems => {
                                                            this.setState({
                                                                files: fileItems.map(fileItem => fileItem.file)
                                                            })
                                                        }}
                                                        server={{
                                                            process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                                                                const fd = new FormData()
                                                                fd.append(fieldName, file, file.name)
                                                                fd.append("transaction_id", this.state.transactionId)
                                                    
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

export default connect(mapStateToProps)(CreateReview)