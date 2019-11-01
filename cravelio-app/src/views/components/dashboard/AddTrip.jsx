import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddTrip extends Component {
 
    render() {
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <Link to="/dashboard/manage-trips">
                            <button className="btn btn-dark">Back</button>
                        </Link>
                        Add Trip Component
                    </div>
                </div>
            </div>
        )
    }
}

export default AddTrip