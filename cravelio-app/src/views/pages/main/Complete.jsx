import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { onClearProof } from '../../../actions/booking'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class Complete extends Component {

    componentDidMount() {
        document.title = 'Complete - Cravelio'
    }

    onBackToHomeClick = () => {
        this.props.onClearProof()
        this.props.history.push("/")
    }

    render() {
        if (this.props.userId && this.props.transferProof) {
            return (
                <div>
                    <Header/>
                    <div className="container container-height">
                        <div className="row row-top">
                            <div className="col-12 text-center">
                                <h2>Booking Completed</h2>
                                <p>We're processing your request. Please check email soon for invoice.</p>
                            </div>
                        </div>
                        <div className="row row-bottom">
                            <div className="col-3 ml-auto">
                                <button onClick={() => this.onBackToHomeClick()} className="btn-main btn-block">Back to Home</button>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        transferProof: state.booking.transferProof
    }
}

export default connect(mapStateToProps,{onClearProof})(Complete)