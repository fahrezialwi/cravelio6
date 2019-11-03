import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import URL_API from '../../../configs/urlAPI'

registerPlugin(FilePondPluginImagePreview)

class EditTrip extends Component {

    constructor(props) {
        super(props)
        this.state = {
            path: '',
            tripName: '',
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
                path: res.data.results[0].path,
                tripName: res.data.results[0].trip_name,
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
            let pictures = res.data.results.map((picture, index) => {
                return (
                    <img src = {URL_API + "files/trip/" + picture.picture_link} width = "100" alt={picture.id} key={index}/>
                )
            })

            this.setState({
                pictures
            })
        })
    }

    onSaveClick = () => {

        axios.patch(
            URL_API + `trips/${this.props.match.params.id}`, {
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
            alert("Trip updated")
            this.props.history.push("/dashboard/manage-trips")
        })
    }

    render() {
        console.log(this.pond)
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-12 mb-3">
                        <h2>Edit Trip</h2>
                    </div>
                    <div className="col-8 mb-3">
                        Trip Name
                        <input
                            type="text"
                            defaultValue={this.state.tripName}
                            onChange={e => this.setState({tripName: e.target.value})}
                            className="form-control"
                        />
                        <div className="row">
                            <div className="col-4 pr-0">
                                <p className="mt-1">http://localhost:3000/trip/</p>
                            </div>
                            <div className="col-8 pl-0">
                                <input
                                    type="text"
                                    onChange={e => this.setState({path: e.target.value})}
                                    defaultValue={this.state.path}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8 mb-3">
                        Description
                        <textarea
                            value={this.state.description}
                            rows={7}
                            onChange={e => this.setState({description: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Meeting Point
                        <input
                            type="text"
                            defaultValue={this.state.meetingPoint}
                            onChange={e => this.setState({meetingPoint: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Price
                        <input
                            type="text"
                            defaultValue={this.state.price}
                            onChange={e => this.setState({price: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Category
                        <input
                            type="text"
                            defaultValue={this.state.category}
                            onChange={e => this.setState({category: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Region
                        <input
                            type="text"
                            defaultValue={this.state.region}
                            onChange={e => this.setState({region: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Duration
                        <input
                            type="text"
                            defaultValue={this.state.duration}
                            onChange={e => this.setState({duration: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Quota
                        <input
                            type="text"
                            defaultValue={this.state.quota}
                            onChange={e => this.setState({quota: e.target.value})}
                            className="form-control"
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Itinerary
                        <ReactQuill
                            value={this.state.itinerary}
                            onChange={value => this.setState({itinerary: value})}
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Price Includes
                        <ReactQuill
                            value={this.state.priceIncludes}
                            onChange={value => this.setState({priceIncludes: value})}
                        />
                    </div>
                    <div className="col-8 mb-3">
                        Price Excludes
                        <ReactQuill
                            value={this.state.priceExcludes}
                            onChange={value => this.setState({priceExcludes: value})}
                        />
                    </div>
                    <div className="col-8 mb-3">
                        FAQ
                        <ReactQuill
                            value={this.state.faq}
                            onChange={value => this.setState({faq: value})}
                        />
                    </div>

                    <div className="col-8 mb-5">
                        {this.state.pictures}
                    </div>


                    <div className="col-8 mb-5">
                        <FilePond 
                            ref={ref => this.pond = ref}
                            files={this.state.files}
                            allowMultiple={true}
                            onprocessfiles={() => this.getPicturesData()}
                            server={{
                                process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                                    const fd = new FormData()
                                    fd.append(fieldName, file, file.name)
                                    fd.append("trip_id", this.props.match.params.id)
                        
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

                    <div className="col-8 mb-5">
                        <button onClick={() => this.onSaveClick()} className="btn btn-dark">Save</button>
                        <Link to="/dashboard/manage-trips">
                            <button className="btn btn-dark ml-2">Cancel</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditTrip