import React, { Component } from 'react'
import axios from 'axios'
import URL_API from '../../../../configs/urlAPI'

class EditReview extends Component {
    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            completeReview: ''
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
            URL_API + `complete_reviews/${this.props.match.params.id}`
        ).then(res => {
            if (this._isMounted) {
                this.setState({
                    completeReview: res.data.results[0]
                })
            }
        })
    }

    render() {
        return (
            <div>
                Edit Review Component
            </div>
        )
    }
}

export default EditReview