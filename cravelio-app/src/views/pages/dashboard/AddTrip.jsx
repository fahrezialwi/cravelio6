import React, { Component } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import 'react-quill/dist/quill.snow.css'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import URL_API from '../../../configs/urlAPI'
import URL_APP from '../../../configs/urlApp'

registerPlugin(FilePondPluginImagePreview)

class AddTrip extends Component {

    constructor(props) {
        super(props)
        this.state = {
            path: '',
            tripId: '',
            tripName: '',
            pictureId: '',
            meetingPoint: '',
            price: '',
            duration: '',
            category: '',
            region: '',
            quota: '',
            description: '',
            itinerary: '',
            priceIncludes: '',
            priceExcludes: '',
            faq: '',
            pictures: [],
            files: [],
            buttonClick: false
        }
    }

    componentDidMount() {
        document.title = 'Add Trip - Cravelio Dashboard'
        this.createTrip()
    }

    componentWillUnmount() {
        if (this.state.pictures.length > 0 && !this.state.buttonClick) {
            this.clearPictures()
        }
    }

    createTrip = () => {
        axios.post(
            URL_API + 'trips'
        ).then(res => {
            this.setState({
                tripId: res.data.results.insertId
            })
        })
    }

    getPicturesData = () => {
        axios.get(
            URL_API + 'pictures', {
                params: {
                    trip_id: this.state.tripId
                }
            }
        ).then(res => {
            this.setState({
                pictures: res.data.results
            })
        })
    }

    pictureList = () => {
       return this.state.pictures.map((picture, index) => {
            return (
                <div className="d-inline-block position-relative mr-3 mb-4" key={index}>
                    <div onClick={() => this.onDeleteClick(picture.picture_id, picture.picture_link)} className="delete-picture"><FontAwesomeIcon icon={faTimes}/></div>
                    <input 
                        type="radio"
                        onChange={() => this.setState({pictureId: picture.picture_id})}
                        name="isMain"
                        id={picture.picture_id}
                        className="mr-2"
                    />
                    <label htmlFor={picture.picture_id}>
                        <img src={URL_API + "files/trip/" + picture.picture_link} width = "100" alt={picture.picture_id}/>
                    </label>
                </div>
            )
        })
    }

    onDeleteClick = (pictureId, pictureLink) => {
        if (this.state.pictures.length > 5) {
            axios.delete(
                URL_API + `pictures/${pictureId}`,{
                    data: {
                        picture_link: pictureLink
                    }
                }
            ).then(res => {
                toast("Picture deleted", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'toast-container'
                })
                this.getPicturesData()
            })
        } else {
            toast("Pictures can not less than 5", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-container'
            })
        }
    }

    onAddClick = () => {
        if (this.state.pictures.length >= 5) {
            if (this.state.pictureId) {
                this.setState({
                    buttonClick: true
                })
                axios.patch(
                    URL_API + `trips/${this.state.tripId}`, {
                        path: this.state.path,
                        trip_name: this.state.tripName,
                        meeting_point: this.state.meetingPoint,
                        price: this.state.price,
                        duration: this.state.duration,
                        category: this.state.category,
                        region: this.state.region,
                        quota: this.state.quota,
                        description: this.state.description,
                        itinerary: this.state.itinerary,
                        price_includes: this.state.priceIncludes,
                        price_excludes: this.state.priceExcludes,
                        faq: this.state.faq
                    }
                ).then(res => {
                    axios.patch(
                        URL_API + `pictures/${this.state.pictureId}`, {
                            trip_id: this.state.tripId
                        }
                    ).then(res => {
                        toast("Trip added", {
                            position: toast.POSITION.BOTTOM_CENTER,
                            className: 'toast-container'
                        })
                        this.props.history.push("/dashboard/manage-trips")
                    })
                })
            } else {
                toast("Please select main image", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'toast-container'
                })
            }
        } else {
            toast("Pictures can not less than 5", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-container'
            })
        }
    }

    onCancelClick = () => {
        if (this.state.pictures.length > 0) {
            this.setState({
                buttonClick: true
            })
            axios.delete(
                URL_API + `trips/${this.state.tripId}`
            ).then(res => {
                for (let i = 0; i < this.state.pictures.length; i++) {
                    axios.delete(
                        URL_API + `pictures/${this.state.pictures[i].picture_id}`,{
                            data: {
                                picture_link: this.state.pictures[i].picture_link
                            }
                        }
                    )
                }
                this.props.history.push("/dashboard/manage-trips")
            })
        } else {
            this.props.history.push("/dashboard/manage-trips")
        }
    }

    clearPictures = () => {
        axios.delete(
            URL_API + `trips/${this.state.tripId}`
        ).then(res => {
            for (let i = 0; i < this.state.pictures.length; i++) {
                axios.delete(
                    URL_API + `pictures/${this.state.pictures[i].picture_id}`,{
                        data: {
                            picture_link: this.state.pictures[i].picture_link
                        }
                    }
                )
            }
            this.props.history.push("/dashboard/manage-trips")
        })
    }

    render() {
        return (
            <div className="row row-top row-bottom ml-0 mr-0">
                <div className="col-12 mb-3">
                    <h2>Add Trip</h2>
                </div>
                <div className="col-12 mb-3">
                    Trip Name
                    <input
                        type="text"
                        onChange={e => this.setState({tripName: e.target.value})}
                        className="form-control"
                    />
                    <div className="row">
                        <div className="col-3 pr-0">
                            <p className="mt-2">{URL_APP + 'trip/'}</p>
                        </div>
                        <div className="col-9 pl-0">
                            <input
                                type="text"
                                onChange={e => this.setState({path: e.target.value})}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-3">
                    Description
                    <textarea
                        rows={7}
                        onChange={e => this.setState({description: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Meeting Point
                    <input
                        type="text"
                        onChange={e => this.setState({meetingPoint: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Price
                    <input
                        type="text"
                        onChange={e => this.setState({price: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Category
                    <input
                        type="text"
                        onChange={e => this.setState({category: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Region
                    <input
                        type="text"
                        onChange={e => this.setState({region: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Duration
                    <input
                        type="text"
                        onChange={e => this.setState({duration: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Quota
                    <input
                        type="text"
                        onChange={e => this.setState({quota: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Itinerary
                    <ReactQuill
                        onChange={value => this.setState({itinerary: value})}
                    />
                </div>
                <div className="col-12 mb-3">
                    Price Includes
                    <ReactQuill
                        onChange={value => this.setState({priceIncludes: value})}
                    />
                </div>
                <div className="col-12 mb-3">
                    Price Excludes
                    <ReactQuill
                        onChange={value => this.setState({priceExcludes: value})}
                    />
                </div>
                <div className="col-12 mb-3">
                    FAQ
                    <ReactQuill
                        onChange={value => this.setState({faq: value})}
                    />
                </div>
                <div className="col-12 mb-3">
                    <div className="mb-4">Trip Pictures (minimum 5)</div>
                    {this.pictureList()}
                </div>
                <div className="col-12 mb-5">
                    <FilePond 
                        ref={ref => this.pond = ref}
                        files={this.state.files}
                        allowMultiple={true}
                        imagePreviewHeight={100}
                        onprocessfiles={() => this.getPicturesData()}
                        server={{
                            process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                                const fd = new FormData()
                                fd.append(fieldName, file, file.name)
                                fd.append("trip_id", this.state.tripId)
                    
                                const xhr = new XMLHttpRequest()
                                xhr.open('POST', URL_API + 'pictures')
                    
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
                                xhr.open('DELETE', URL_API + 'pictures')
                                xhr.send(uniqueFileId)
                                error('Delete error')
                                load()
                            }
                        }}
                    >
                    </FilePond>
                </div>
                <div className="col-12 mb-5 text-right">
                    <button onClick={() => this.onAddClick()} className="btn-main">Add Trip</button>
                    <button onClick={() => this.onCancelClick()} className="btn-main ml-2" >Cancel</button>  
                </div>
            </div>
        )
    }
}

export default AddTrip