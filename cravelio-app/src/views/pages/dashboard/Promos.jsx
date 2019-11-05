import React, { Component } from 'react'
import axios from 'axios'
import URL_API from '../../../configs/urlAPI'

class Promos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            promos: []
        }
    }

    componentDidMount() {
        this.getPromosData()
    }

    getPromosData = () => {
        axios.get (
            URL_API + 'promos'
        ).then((res)=> {
            this.setState({
                promos: res.data.results
            })
        })
    }

    onPromoCodeChange = (index, value) => {
        let newPromos = [...this.state.promos]
        newPromos[index].promo_code = value
        this.setState({
            promos: newPromos
        })
    }

    onPromoDiscountChange = (index, value) => {
        let newPromos = [...this.state.promos]
        newPromos[index].promo_discount = value
        this.setState({
            promos: newPromos
        })
    }

    promoList = () => {
        return this.state.promos.map((promo, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        <input
                            type="text"
                            onChange={e => this.onPromoCodeChange(index, e.target.value)}
                            defaultValue={promo.promo_code}
                            className="form-control"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            onChange={e => this.onPromoDiscountChange(index, e.target.value)}
                            defaultValue={promo.promo_discount}
                            className="form-control"
                        />
                    </td>
                    <td>
                        {
                            'promo_id' in promo ?
                            <button onClick={() => this.onDeleteClick(promo.promo_id)} className="btn btn-dark">Delete</button>
                            :
                            null
                        }
                    </td>
                </tr>
            )
        })
    }

    onAddClick = () => {
        let newPromos = [...this.state.promos, {
            promo_code: '',
            promo_discount: ''
        }]
        this.setState({
            promos: newPromos
        })
    }

    onDeleteClick = (promoId) => {
        let conf = window.confirm("Are you sure want to delete this promo?")
        if (conf) {
            axios.delete(
                URL_API + `promos/${promoId}`
            ).then(res => {
                this.getPromosData()
            })
        }
    }

    onSaveClick = () => {
        for (let i = 0; i < this.state.promos.length ; i++) {
            if ('promo_id' in this.state.promos[i]) {
                axios.patch(
                    URL_API + `promos/${this.state.promos[i].promo_id}`, {
                        promo_code: this.state.promos[i].promo_code,
                        promo_discount: this.state.promos[i].promo_discount
                    }
                )
            } else {
                axios.post(
                    URL_API + 'promos', {
                        promo_code: this.state.promos[i].promo_code,
                        promo_discount: this.state.promos[i].promo_discount
                    }
                )
            }
        }
        
        alert("Promos saved")
        this.forceUpdate()
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 mb-3">
                    <h2>Promos</h2>
                </div>
                <div className="col-12 text-right mb-2">
                    <button onClick={() => this.onAddClick()} className="btn btn-dark">Add New Promo</button>
                </div>
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
                {
                    this.state.promos.length === 0 ?
                    <div className="col-12 text-center">
                        No promos
                    </div>
                    :
                    null
                }
                <div className="col-12">
                    <button onClick={() => this.onSaveClick()} className="btn btn-dark mr-3">Save</button>
                </div>
            </div>
        )
    }
}

export default Promos