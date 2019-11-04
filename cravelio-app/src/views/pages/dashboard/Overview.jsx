import React, { Component } from 'react'
import axios from 'axios'
import URL_API from '../../../configs/urlAPI'
import { Bar } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'

class Overview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allTransactions: [],
            transactionsOfYear: [],
            favoritesOfYear: [],
            defaultYear: '',
            transactionVolumeData: {},
            bestSellingData: {},
            mostFavoredData: {}
        }
    }

    componentDidMount(){
        this.getAllTransactions()
        this.getDataPerYear(new Date().getFullYear())
    }

    getAllTransactions = () => {
        axios.get (
            URL_API + 'transactions'
        ).then((res)=> {
            this.setState({
                allTransactions: res.data.results
            })
        })
    }

    yearList = () => {
        let arrYear = []
        let data = this.state.allTransactions
        for (let i = 0 ; i < data.length ; i++){
            if (!arrYear.includes(new Date(data[i].created_at).getFullYear())){
                arrYear.push(new Date(data[i].created_at).getFullYear())
            }
        }
        arrYear.sort((a, b) => (b - a))
        return arrYear.map((val, index) => {
            return (
                <option value={val} key={index}>{val}</option>
            )
        })
    }

    getDataPerYear = (year) => {
        axios.get (
            URL_API + 'transactions', {
                params: {
                    year: year
                }
            }
        ).then((res)=> {
            axios.get(
                URL_API + 'all_favorites', {
                    params: {
                        year: year
                    }
                }
            ).then(res2 => {
                this.setState({
                    transactionsOfYear: res.data.results,
                    favoritesOfYear: res2.data.results
                })

                this.convertToGraph(res.data.results, res2.data.results, year)
            })
        })
    }

    convertToGraph = (transactionsData, favoritesData, year) => {

        // Transaction volume data
        let transactionVolumeData = {
            labels: [`January ${year}`, `February ${year}`, `March ${year}`, `April ${year}`, `May ${year}`, `June ${year}`, `July ${year}`, `August ${year}`, `September ${year}`, `October ${year}`, `November ${year}`, `December ${year}`],
            datasets: [
                {
                    label: 'Transaction',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: []
                }
            ]
        }

        let arrMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let month = transactionsData.map(val => {
            return new Date(val.created_at).getMonth()
        })
        for (let i = 0; i < 12; i++){
            arrMonth[i] = month.filter((val) => (val === i)).length
        }
        transactionVolumeData.datasets[0].data = arrMonth

        // Best-selling data
        let bestSellingData = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        }

        let trip = transactionsData.map(val => {
            return val.trip_name
        })

        let arr = []
        for (let i = 0 ; i < trip.length ; i++){
            let flag = 0
            for (let j = 0 ; j < arr.length ; j++){
                if (arr[j].tripName.includes(trip[i])){
                    arr[j].value += 1
                    flag = 1
                }
            }
            if(flag === 0){
                arr.push({tripName: trip[i], value: 1}) 
            }
        }

        let processedArr = arr.sort((a, b) => (b.value - a.value)).slice(0, 3)
  
        bestSellingData.labels = processedArr.map(val => {
            return val.tripName
        })

        bestSellingData.datasets[0].data = processedArr.map(val => {
            return val.value
        })

        // Most favored data
        let mostFavoredData = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        }

        let trip2 = favoritesData.map(val => {
            return val.trip_name
        })

        let arr2 = []
        for (let i = 0 ; i < trip2.length ; i++){
            let flag = 0
            for (let j = 0 ; j < arr2.length ; j++){
                if (arr2[j].tripName.includes(trip2[i])){
                    arr2[j].value += 1
                    flag = 1
                }
            }
            if(flag === 0){
                arr2.push({tripName: trip2[i], value: 1}) 
            }
        }

        let processedArr2 = arr2.sort((a, b) => (b.value - a.value)).slice(0, 3)
    
        mostFavoredData.labels = processedArr2.map(val => {
            return val.tripName
        })

        mostFavoredData.datasets[0].data = processedArr2.map(val => {
            return val.value
        })

        this.setState({
            transactionVolumeData,
            bestSellingData,
            mostFavoredData
        })
    }

    render() {
        return (
            <div className="row mb-4">
                <div className="col-12 mb-5">
                    <h5>Transaction Volume</h5>
                    <div className="row">
                        <div className="col-6">
                            <p>Total transaction: {this.state.transactionsOfYear.length}</p>
                        </div>
                        <div className="col-6 text-right">
                            Year
                            <select className="ml-2" onChange={e => this.getDataPerYear(e.target.value)}>
                                {this.yearList()}
                            </select>
                        </div>
                    </div>
                    <Bar
                        data={this.state.transactionVolumeData}
                        width={100}
                        height={50}
                    />
                </div>
                <div className="col-6">
                    <h5>Top 3 Best-Selling Trip</h5>
                    <Doughnut data={this.state.bestSellingData}/>
                </div>
                <div className="col-6">
                    <h5>Top 3 Most Favored Trip</h5>
                    <Doughnut data={this.state.mostFavoredData}/>
                </div>
            </div>
        )
    }
}

export default Overview