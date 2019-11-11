import React, { Component } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill'
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

class EditTrip extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tripId: '',
            path: '',
            tripName: '',
            pictureId: '',
            pictureLink: '',
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
            files: []
        }
    }

    componentDidMount() {
        document.title = 'Edit Trip - Cravelio Dashboard'
        this.getTripData()
        this.getPicturesData()
    }

    getTripData = () => {
        axios.get(
            URL_API + 'trips', {
                params: {
                    trip_id: this.props.match.params.id
                }
            }
        ).then(res => {
            this.setState({
                tripId: res.data.results[0].trip_id,
                path: res.data.results[0].path,
                tripName: res.data.results[0].trip_name,
                pictureId: res.data.results[0].picture_id,
                pictureLink: res.data.results[0].picture_link,
                meetingPoint: res.data.results[0].meeting_point,
                price: res.data.results[0].price,
                duration: res.data.results[0].duration,
                category: res.data.results[0].category,
                region: res.data.results[0].region,
                quota: res.data.results[0].quota,
                description: res.data.results[0].description,
                itinerary: res.data.results[0].itinerary,
                priceIncludes: res.data.results[0].price_includes,
                priceExcludes: res.data.results[0].price_excludes,
                faq: res.data.results[0].faq
            })    
        })
    }

    getPicturesData = () => {
        axios.get(
            URL_API + 'pictures', {
                params: {
                    trip_id: this.props.match.params.id
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
                        defaultChecked={picture.is_main}
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
                alert("Picture deleted")
                this.getPicturesData()
            })
        } else {
            alert("Pictures can not less than 5")
        }
    }

    onSaveClick = () => {
        if (this.state.pictures.length >= 5) {
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
                    alert("Trip updated")
                    this.forceUpdate()
                    window.scrollTo(0, 0)
                })
            })
        } else {
            alert("Pictures can not less than 5")
        }
    }

    onCancelClick = () => {
        this.props.history.push("/dashboard/manage-trips")
    }

    render() {
        return (
            <div className="row row-top row-bottom ml-0 mr-0">
                <div className="col-12 mb-3">
                    <h2>Edit Trip</h2>
                </div>
                <div className="col-12 mb-3">
                    Trip Name
                    <input
                        type="text"
                        defaultValue={this.state.tripName}
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
                                defaultValue={this.state.path}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-3">
                    Description
                    <textarea
                        value={this.state.description}
                        rows={7}
                        onChange={e => this.setState({description: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Meeting Point
                    <input
                        type="text"
                        defaultValue={this.state.meetingPoint}
                        onChange={e => this.setState({meetingPoint: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Price
                    <input
                        type="text"
                        defaultValue={this.state.price}
                        onChange={e => this.setState({price: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Category
                    <input
                        type="text"
                        defaultValue={this.state.category}
                        onChange={e => this.setState({category: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Region
                    <input
                        type="text"
                        defaultValue={this.state.region}
                        onChange={e => this.setState({region: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Duration
                    <input
                        type="text"
                        defaultValue={this.state.duration}
                        onChange={e => this.setState({duration: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Quota
                    <input
                        type="text"
                        defaultValue={this.state.quota}
                        onChange={e => this.setState({quota: e.target.value})}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    Itinerary
                    <ReactQuill
                        value={this.state.itinerary}
                        onChange={value => this.setState({itinerary: value})}
                    />
                </div>
                <div className="col-12 mb-3">
                    Price Includes
                    <ReactQuill
                        value={this.state.priceIncludes}
                        onChange={value => this.setState({priceIncludes: value})}
                    />
                </div>
                <div className="col-12 mb-3">
                    Price Excludes
                    <ReactQuill
                        value={this.state.priceExcludes}
                        onChange={value => this.setState({priceExcludes: value})}
                    />
                </div>
                <div className="col-12 mb-3">
                    FAQ
                    <ReactQuill
                        value={this.state.faq}
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
                    
                                const request = new XMLHttpRequest()
                                request.open('POST', URL_API + 'pictures')
                    
                                request.upload.onprogress = (e) => {
                                    progress(e.lengthComputable, e.loaded, e.total);
                                }
                
                                request.onload = function() {
                                    if (request.status >= 200 && request.status < 300) {
                                        load(request.responseText)
                                    } else {
                                        error('Upload error')
                                    }
                                }
                                request.send(fd)
                                return {
                                    abort: () => {
                                        request.abort()
                                        abort()
                                    }
                                }
                            },

                            revert: (uniqueFileId, load, error) => {
                                const request = new XMLHttpRequest()
                                request.open('DELETE', URL_API + 'pictures')
                                request.send(uniqueFileId)
                                error('Delete error')
                                load()
                            }
                        }}
                    >
                    </FilePond>
                </div>
                <div className="col-12 mb-5 text-right">
                    <button onClick={() => this.onSaveClick()} className="btn-main">Save</button>
                    <button onClick={() => this.onCancelClick()} className="btn-main ml-2">Cancel</button>
                </div>
            </div>
        )
    }
}

export default EditTrip