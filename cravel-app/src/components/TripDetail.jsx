import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { URL_API } from '../helpers'

class TripDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trip: '',
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            URL_API + `trips/${this.props.match.params.id}`
        ).then((res) => {    
            this.setState({
                trip: res.data.results[0]
            })      
        })
    }

    render() {
        if(this.state.trip){
            return (
                <div className="detail-top bottom-space">
                    <div className="main-image">
                        <img src={this.state.trip.picture_main} alt={this.state.trip.name} width="100%" height="600"/>
                        <div className="favorites">Favorite</div>
                    </div>       
                    <div className="container">
                        <div className="row mt-5 mb-3">
                            <div className="col-6">
                                <h2>{this.state.trip.name}</h2>
                                <div className="row">
                                    <div className="col-12 mt-2">
                                        <div className="row">
                                            <div className="col-3 pr-0 text-bold">Meeting Point</div>
                                            <div className="col-9 pl-0">{this.state.trip.meeting_point}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-1">
                                        <div className="row">
                                            <div className="col-3 pr-0 text-bold">Duration</div>
                                            <div className="col-9 pl-0">{this.state.trip.duration}</div>
                                        </div>
                                    </div>          
                                    <div className="col-12 mt-1">
                                        <div className="row">
                                            <div className="col-3 pr-0 text-bold">Quota</div>
                                            <div className="col-9 pl-0">{this.state.trip.quota} person</div>
                                        </div>
                                    </div>               
                                </div>
                            </div>
                            <div className="col-6">
                                <p>
                                    Paket wisata ini merupakan wisata murah ala backpacker dengan konsep open trip ini, dimana wisata ini digabung dengan peserta lain jika minimal quota keberangkatan Anda hanya kurang dari 8 orang. Mengapa di gabung? Ini beralasan untuk meminimalisir budget untuk memenuhi semua fasilitas di paket wisata ini. Paket ini sangat cocok sekali bagi Anda yang berjiwa traveling backpacker dan mempunyai kuota peserta kurang dari sepuluh orang untuk mengikuti paket wisata ini.
                                </p>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <img src={this.state.trip.pictures[0]} alt={this.state.trip.name} width="100%"/>
                                    </div>  
                                    <div className="col-6">
                                        <img src={this.state.trip.pictures[1]} alt={this.state.trip.name} width="100%"/>
                                    </div> 
                                    <div className="col-6">
                                        <img src={this.state.trip.pictures[2]} alt={this.state.trip.name} width="100%"/>
                                    </div> 
                                </div>
                            </div>  
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <img src={this.state.trip.pictures[3]} alt={this.state.trip.name} width="100%"/>
                                    </div>  
                                    <div className="col-6 mb-3">
                                        <img src={this.state.trip.pictures[4]} alt={this.state.trip.name} width="100%"/>
                                    </div> 
                                    <div className="col-12">
                                        <img src={this.state.trip.pictures[5]} alt={this.state.trip.name} width="100%"/>
                                    </div> 
                                </div>
                            </div> 
                        </div>
                        <div className="row mt-5 mb-3">
                            <div className="col-12">
                                <h4><strong>Reviews</strong></h4>
                                <h4><strong>Itinerary</strong></h4>
                                <p><strong>Day 1</strong></p>
                                <ul>
                                    <li>19.00 : Peserta Open Trip Dieng Plateau berkumpul di Meeting Point (absen &amp; pendataan ulang).</li>
                                    <li>20.00 : Berangkat Menuju Dieng.</li>
                                </ul>
                                <div>
                                    <p><strong>Day 2</strong></p>
                                    <ul>
                                        <li>08.00 : Tiba di Wonosobo.</li>
                                        <li>08.30 : Menuju Dieng.</li>
                                        <li>09.00 : Cek-In Penginapan, Sarapan (di luar paket).</li>
                                        <li>09.30 : Briefing kegiatan wisata.</li>
                                        <li>10.00 : Explore Kompleks Candi Hindu (Candi Gatot Kaca, Candi Arjuna, Candi Bimo, dll).</li>
                                        <li>12.00 : Kembali ke Penginapan, Makan Siang (kami sediakan).</li>
                                        <li>13.00 : Kegiatan Menuju Dieng Volcanic Theatre.</li>
                                        <li>15.00 : Mengunjungi Telaga Warna, Goa Sumur, Goa Semar, Goa jaran.</li>
                                        <li>17.00 : Explore Kawah Sikidang.</li>
                                        <li>18.00 : Kembali ke Penginapan, ISHOMA (sudah termasuk).</li>
                                        <li>20.00 : Acara Bebas.</li>
                                        <li>22.00 : Istirahat.</li>
                                    </ul>
                                    <div>
                                        <p><strong>Day 3</strong></p>
                                        <ul>
                                            <li>02.00 : Bangun Pagi.</li>
                                            <li>02.30 : Persiapan Trekking Bukit Sikunir.</li>
                                            <li>03.00 : Menuju Bukit Sikunir. Desa Tertinggi di Pulau Jawa.</li>
                                            <li>03.30 : Briefing, trekking naik ke Bukit Sikunir.</li>
                                            <li>05.30 : Hunting foto, menikmati Golden Sunrise Negeri Diatas Awan.</li>
                                            <li>06.30 : Turun ke bawah, hunting foto, nikmatin jajanan Dieng.</li>
                                            <li>07.00 : Kembali ke penginapan, sarapan (kami sediakan).</li>
                                            <li>08.00 : Check-Out penginapan.</li>
                                            <li>09.00 : Wisata belanja oleh - oleh.</li>
                                            <li>10.30 : Perjalanan kembali ke Jakarta.</li>
                                            <li>23.00 : Perkiraan tiba di Jakarta dan Open Trip Dieng Plateau selesai.</li>
                                        </ul>
                                    </div>
                                </div>     
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <h4><strong>Price Includes</strong></h4>
                                <ul>
                                    <li>Transportasi AC Jakarta – Dieng PP.</li>
                                    <li>Homestay (sharing).</li>
                                    <li>Makan prasmanan 3x (siang, malam, pagi).</li>
                                    <li>Tiket Masuk Wisata Dieng.
                                        <ul>
                                            <li>Dieng Plateau Theater.</li>
                                            <li>Telaga Warna.</li>
                                            <li>Goa Jaran.</li>
                                            <li>Goa Semar.</li>
                                            <li>Goa Sumur.</li>
                                            <li>Kawah Sikidang.</li>
                                            <li>Bukit Sikunir.</li>
                                            <li>Komplek Candi Arjuna.</li>
                                            <li>Batu Ratapan Angin.</li>
                                        </ul>
                                    </li>
                                    <li>Sunrise dari puncak Gunung Sikunir.</li>
                                    <li>Wisata Belanja oleh-oleh.</li>
                                    <li>Air Mineral.</li>
                                    <li>Tour Leader.</li>
                                    <li>Dokumentasi.</li>
                                    <li>Perijinan Wisata.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <h4><strong>Price Excludes</strong></h4>
                                <ul>
                                    <li>Pengeluaran pribadi.</li>
                                    <li>Oleh - oleh.</li>
                                    <li>Tips guide dan driver.</li>
                                    <li>Makan di luar program<strong>.</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-navigation">
                        <div className="container">
                            <div className="row">
                                <div className="col-10">
                                    <h6 className="card-title">{this.state.trip.name}</h6>
                                    <div className="card-price">Rp {this.state.trip.price}/pax</div>
                                </div>
                                <div className="col-2 text-right"><button className="btn btn-dark pl-5 pr-5 mt-1" onClick={()=> {this.onBookClick()}}>Book</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container container-top">
                    <h1 className="text-center">Loading</h1>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(TripDetail)