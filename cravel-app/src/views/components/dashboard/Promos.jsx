import React, { Component } from 'react'
import axios from 'axios'
import URL_API from '../../../config/urlAPI'

class Promos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            promos : []
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get (
            URL_API + 'promos'
        ).then((res)=> {
            this.setState({
                promos: res.data.results
            })
        })
    }

    promoList = () => {
        return this.state.promos.map((promo, index) => {
            return (
                <tr key={promo.promo_id}>
                    <td>{index+1}</td>
                    <td>{promo.promo_code}</td>
                    <td>{promo.promo_discount}</td>
                    <td><button className="btn btn-dark">Edit</button></td>
                    <td><button className="btn btn-dark">Delete</button></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Promo Code</th>
                                        <th>Promo Discount (%)</th>
                                        <th colSpan="2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.promoList()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Promos