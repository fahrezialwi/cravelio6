import React, { Component } from 'react'
import parse from 'html-react-parser'

class TermsAndConditions extends Component {
    render() {
        return (
            <div className="row mt-4">
                <div className="col-12">
                    {parse(this.props.trip.terms_conditions)}
                </div>
            </div>
        )
    }
}

export default TermsAndConditions