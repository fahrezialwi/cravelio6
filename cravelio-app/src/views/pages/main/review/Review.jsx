import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import '../../../styles/review.css'
import AwaitingReview from './AwaitingReview'
import MyReview from './MyReview'
import CreateReview from './CreateReview'
import EditReview from './EditReview'

class Review extends Component {

    onTabSelect = (key) => {
        this.props.history.push(`/review/${key}`)
    }

    render() {
        if (this.props.userId) {
            return (
                <div>
                    <Header/>
                    <div className="container container-height">
                        <div className="row pt-5">
                            <div className="col-12">
                                <Tabs activeKey={this.props.location.pathname.split("/")[2]} id="uncontrolled-tab-example" onSelect={key => this.onTabSelect(key)}>
                                    <Tab eventKey="awaiting-review" title="Awaiting Review">
                                        <Switch>
                                            <Route path='/review' exact><Redirect to="/review/awaiting-review"/></Route>
                                            <Route path='/review/awaiting-review' exact component={AwaitingReview}/>
                                            <Route path='/review/awaiting-review/create-review/:id' component={CreateReview}/>
                                        </Switch>
                                    </Tab>
                                    <Tab eventKey="my-review" title="My Review">
                                        <Switch>
                                            <Route path='/review/my-review' exact component={MyReview}/>
                                            <Route path='/review/my-review/edit-review/:id' component={EditReview}/>
                                        </Switch>
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