import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { onSubmitProof } from '../../../actions/booking'
import axios from 'axios'
import moment from 'moment'
import formatCurrency from '../../../helpers/formatCurrency'
import URL_API from '../../../configs/urlAPI'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class Invoice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transaction: '',
            bankName: 'BCA',
            accountHolderName: '',
            transferProof: ''
        }
    }

    componentDidMount() {
        document.title = 'Invoice - Cravelio'
        this.getTransactionData()
    }

    getTransactionData = () => {
        axios.get (
            URL_API + `transactions/${this.props.match.params.id}`
        ).then((res)=> {
            this.setState({
                transaction: res.data.results[0]
            })
        })
    }

    participantsList = () => {
        return this.state.transaction.participants.map((participant, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{participant.first_name} {participant.last_name}</td>
                    <td>{participant.identification_type}</td>
                    <td>{participant.identification_number}</td>
                </tr>
            )
        })
    }

    renderUpload = () => {
        if (!this.state.transaction.transfer_proof) {
            if (this.state.transaction.status === "Cancelled") {
                return (
                    <div className="row">
                        <div className="col-4">
                            <p>Transaction cancelled.</p>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="row">
                        <div className="col-4">
                            Select Bank
                            <select onChange={e => this.setState({bankName: e.target.value})} className="form-control mb-2">
                                <option>BCA</option>
                                <option>Mandiri</option>
                            </select>
                            Account Holder Name
                            <input onChange={e => this.setState({accountHolderName: e.target.value})} type="text" className="form-control mb-2"/>
                            Proof of Transfer
                            <input onChange={e => this.setState({transferProof: e.target.files[0]})} type="file" className="form-control"/>
                        </div>
                        {
                            this.state.bankName === 'BCA' ?
                            <div className="col-3">
                                <div className="mb-3">Transfer {formatCurrency(this.state.transaction.total_payment)} to:</div>
                                <img src={URL_API + 'files/general/bank-bca-logo.png'} width="140" alt="bank-bca-logo"/>
                                <div className="mt-3">PT Cravelio Indonesia</div>
                                <div>6123456789</div>
                            </div>
                            :
                            <div className="col-8">
                                <div className="mb-3">Transfer {formatCurrency(this.state.transaction.total_payment)} to:</div>
                                <img src={URL_API + 'files/general/bank-mandiri-logo.png'} width="150" alt="bank-mandiri-logo"/>
                                <div className="mt-3">PT Cravelio Indonesia</div>
                                <div>5123456789</div>
                            </div>
                        }
                    </div>
                )
            }
        } else {
            return (
                <div className="row">
                    <div className="col-12">
                        <p>Transfer proof</p>
                        <div className="row">
                            <div className="col-2">
                                <a href={URL_API + 'files/transfer/' + this.state.transaction.transfer_proof} target="_blank" rel="noopener noreferrer">
                                    <img src={URL_API + 'files/transfer/' + this.state.transaction.transfer_proof} alt={this.state.transaction.transaction_id} width="150"/>
                                </a>
                            </div>
                            <div className="col-10">
                                <div>Bank Name: {this.state.transaction.transfer_bank_name}</div>
                                <div>Account Holder Name: {this.state.transaction.transfer_account_holder}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderButton = () => {
        if (!this.state.transaction.transfer_proof) {
            if (this.state.transaction.status === "Cancelled") {
                return null
            } else {
                return (
                    <button onClick={() => this.onSubmitButton()} className="btn-main btn-block">Submit</button>
                )
            }
        } else {
            return null
        }
    }

    onSubmitButton = () => {
        if (this.state.accountHolderName) {
            if (this.state.transferProof) {
                let fd = new FormData()
                let data = {
                    transfer_bank_name: this.state.bankName,
                    transfer_account_holder: this.state.accountHolderName
                }

                fd.append('browse_file', this.state.transferProof, this.state.transferProof.name)
                fd.append('data', JSON.stringify(data))

                axios.patch(
                    URL_API + `transactions/${this.props.match.params.id}`, fd
                ).then(res => {
                    toast("Upload proof success", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        className: 'toast-container'
                    })
                    this.props.onSubmitProof(this.state.bankName, this.state.accountHolderName, this.state.transferProof)
                    this.props.history.push("/complete")

                }).catch(err => {
                    console.log(err)
                })
            } else {
                toast("Please select an image", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'toast-container'
                })
            }
        } else {
            toast("Please type account holder name", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-container'
            })
        }
    }

    render() {
        if (this.state.transaction) {
            if (this.props.userId === this.state.transaction.user_id || this.props.role === 'admin') {
                return (
                    <div>
                        <Header/>
                        <div className="container container-height">
                            <div className="row row-top">
                                <div className="col-12">
                                    <h2 className="mb-3">Invoice</h2>
                                    <p className="mb-2">INV/TRIP/{moment(this.state.transaction.created_at).format('YYYYMMDD')}/{this.state.transaction.transaction_id}</p>
                                    {
                                        this.state.transaction.status === 'Pending' ?
                                        <p className="mb-2">Due Date: {moment(this.state.transaction.created_at).add(1, 'days').format('MMMM DD, YYYY')} at {moment(this.state.transaction.created_at).add(1, 'days').format('HH:mm')}</p>
                                        :
                                        null
                                    }
                                    <p className="mb-3">Status: {this.state.transaction.status}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <p className="mb-1">Trip Name: {this.state.transaction.trip_name}</p>
                                            <p className="mb-1">Date: {moment(this.state.transaction.start_date).format('MMMM DD, YYYY')}  - {moment(this.state.transaction.end_date).format('MMMM DD, YYYY')}</p>
                                            <p className="mb-1">Price ({this.state.transaction.pax} pax): {formatCurrency(this.state.transaction.pax*this.state.transaction.trip_price)}</p>
                                            {this.state.transaction.promo_code ? <p className="mb-1">Promo ({(this.state.transaction.promo_code).toUpperCase()}): - {formatCurrency(this.state.transaction.promo_value)}</p> : null}
                                            <p>Total: {formatCurrency(this.state.transaction.total_payment)}</p>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Name</th>
                                                        <th>ID Type</th>
                                                        <th>ID Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.participantsList()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.renderUpload()}
                            <div className="row row-bottom">
                                <div className="col-3 ml-auto">
                                    {this.renderButton()}
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
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        role: state.auth.role
    }
}

export default connect(mapStateToProps,{onSubmitProof})(Invoice)