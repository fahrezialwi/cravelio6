import React, { Component } from 'react'
import axios from 'axios'
import URL_API from '../../../config/urlAPI'
import { Bar } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'

class Overview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allTransactions: [],
            transactionsOfYear: [],
            defaultYear: '',
            barData: {},
            doughtnutData: {}
        }
    }

    componentDidMount(){
        this.getData()
        this.getBarData(new Date().getFullYear())
    }

    getData = () => {
        axios.get (
            URL_API + 'transactions'
        ).then((res)=> {
            this.setState({
                allTransactions: res.data.results
            })
        })
    }

    getBarData = (year) => {
        axios.get (
            URL_API + 'transactions', {
                params: {
                    year: year
                }
            }
        ).then((res)=> {
            this.setState({
                transactionsOfYear: res.data.results
            })
            this.convertToGraph(res.data.results, year)
        })
    }

    convertToGraph = (res, year) => {

        // Bar data
        let barData = {
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
        let month = res.map(val => {
            return new Date(val.created_at).getMonth()
        })
        for (let i = 0; i < 12; i++){
            arrMonth[i] = month.filter((val) => (val === i)).length
        }
        barData.datasets[0].data = arrMonth

        // Doughtnut data
        let doughtnutData = {
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

        let trip = res.map(val => {
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
  
        doughtnutData.labels = processedArr.map(val => {
            return val.tripName
        })

        doughtnutData.datasets[0].data = processedArr.map(val => {
            return val.value
        })

        this.setState({
            barData: barData,
            doughtnutData: doughtnutData
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

    render() {
        return (
            <div className="card-body">
                <div className="row mb-4">
                    <div className="col-12">
                        <h5>Transaction Volume</h5>
                        <div className="row">
                            <div className="col-6">
                                <p>Total transaction: {this.state.transactionsOfYear.length}</p>
                            </div>
                            <div className="col-6 text-right">
                                Year
                                <select className="ml-2" onChange={e => this.getBarData(e.target.value)}>
                                    {this.yearList()}
                                </select>
                            </div>
                        </div>
                        <Bar
                        data={this.state.barData}
                        width={100}
                        height={50}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        stepSize: 1
                                    }
                                    }]
                            }
                        }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h5>Top 3 Trip</h5>
                        <Doughnut data={this.state.doughtnutData} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview