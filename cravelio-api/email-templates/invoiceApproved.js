const moment = require('moment')
const formatCurrency = require('../helpers/formatCurrency')
const URL_API = require('../configs/urlAPI')

let participantList = (participants) => {
	let result = participants.map((participant, index) => {
		return	`
			<tr>
				<td>${index+1}</td>
				<td>${participant.first_name} ${participant.last_name}</td>
				<td>${participant.identification_type}</td>
				<td>${participant.identification_number}</td>
			</tr>
		`
	})
	return result.join('')
}

let renderPromo = (promoCode, promoValue, totalPayment) => {
	if (promoCode) {
		return `
			<div class="mb-2">Promo (${promoCode.toUpperCase()}): - ${formatCurrency(promoValue)}</div>
			<div class="mb-2">Total: ${formatCurrency(totalPayment)}</div>
		`
	} else {
		return `<div class="mb-2">Total: ${formatCurrency(totalPayment)}</div>`
	}
}

let invoiceApproved = (transactionId, transactionDate, contactFirstName, contactLastName, tripName,
startDate, endDate, pax, tripPrice, promoCode, promoValue, totalPayment, participants) => {
	return `
	<html>
		<head>
			<style>
				body {
					margin: 0;
					font-family: sans-serif;
				}

				.container {
					width: 700px;
					padding-right: 30px;
					padding-left: 30px;
					margin-right: auto;
					margin-left: auto;
					background-color: white;
					color: #000;
				}

				.row {
					margin-right: -15px;
					margin-left: -15px;
				}

				.col-md-12 {
					position: relative;
					min-height: 1px;
					padding-right: 15px;
					padding-left: 15px;
				}

				.table {
					border-collapse: collapse;
					width: 100%;
					max-width: 100%;
					margin-bottom: 20px;
				}

				.table > thead > tr > th,
				.table > tbody > tr > th,
				.table > tfoot > tr > th,
				.table > thead > tr > td,
				.table > tbody > tr > td,
				.table > tfoot > tr > td {
					padding: 8px;
					line-height: 1.42857143;
					vertical-align: top;
					border-top: 1px solid #ddd;
				}

				.table > thead > tr > th {
					vertical-align: bottom;
					border-bottom: 2px solid #ddd;
				}

				.table > caption + thead > tr:first-child > th,
				.table > colgroup + thead > tr:first-child > th,
				.table > thead:first-child > tr:first-child > th,
				.table > caption + thead > tr:first-child > td,
				.table > colgroup + thead > tr:first-child > td,
				.table > thead:first-child > tr:first-child > td {
					border-top: 0;
				}

				.table > tbody + tbody {
					border-top: 2px solid #ddd;
				}

				.table .table {
					background-color: #fff;
				}

				.text-left {
					text-align: left !important;
				}

				.text-right {
					text-align: right !important;
				}

				.text-center {
					text-align: center !important;
				}

				.m-0 {
					margin: 0 !important;
				}

				.mt-0,
				.my-0 {
					margin-top: 0 !important;
				}

				.mr-0,
				.mx-0 {
					margin-right: 0 !important;
				}

				.mb-0,
				.my-0 {
					margin-bottom: 0 !important;
				}

				.ml-0,
				.mx-0 {
					margin-left: 0 !important;
				}

				.m-1 {
					margin: 0.25rem !important;
				}

				.mt-1,
				.my-1 {
					margin-top: 0.25rem !important;
				}

				.mr-1,
				.mx-1 {
					margin-right: 0.25rem !important;
				}

				.mb-1,
				.my-1 {
					margin-bottom: 0.25rem !important;
				}

				.ml-1,
				.mx-1 {
					margin-left: 0.25rem !important;
				}

				.m-2 {
					margin: 0.5rem !important;
				}

				.mt-2,
				.my-2 {
					margin-top: 0.5rem !important;
				}

				.mr-2,
				.mx-2 {
					margin-right: 0.5rem !important;
				}

				.mb-2,
				.my-2 {
					margin-bottom: 0.5rem !important;
				}

				.ml-2,
				.mx-2 {
					margin-left: 0.5rem !important;
				}

				.m-3 {
					margin: 1rem !important;
				}

				.mt-3,
				.my-3 {
					margin-top: 1rem !important;
				}

				.mr-3,
				.mx-3 {
					margin-right: 1rem !important;
				}

				.mb-3,
				.my-3 {
					margin-bottom: 1rem !important;
				}

				.ml-3,
				.mx-3 {
					margin-left: 1rem !important;
				}

				.m-4 {
					margin: 1.5rem !important;
				}

				.mt-4,
				.my-4 {
					margin-top: 1.5rem !important;
				}

				.mr-4,
				.mx-4 {
					margin-right: 1.5rem !important;
				}

				.mb-4,
				.my-4 {
					margin-bottom: 1.5rem !important;
				}

				.ml-4,
				.mx-4 {
					margin-left: 1.5rem !important;
				}

				.m-5 {
					margin: 3rem !important;
				}

				.mt-5,
				.my-5 {
					margin-top: 3rem !important;
				}

				.mr-5,
				.mx-5 {
					margin-right: 3rem !important;
				}

				.mb-5,
				.my-5 {
					margin-bottom: 3rem !important;
				}

				.ml-5,
				.mx-5 {
					margin-left: 3rem !important;
				}

				.p-0 {
					padding: 0 !important;
				}

				.pt-0,
				.py-0 {
					padding-top: 0 !important;
				}

				.pr-0,
				.px-0 {
					padding-right: 0 !important;
				}

				.pb-0,
				.py-0 {
					padding-bottom: 0 !important;
				}

				.pl-0,
				.px-0 {
					padding-left: 0 !important;
				}

				.p-1 {
					padding: 0.25rem !important;
				}

				.pt-1,
				.py-1 {
					padding-top: 0.25rem !important;
				}

				.pr-1,
				.px-1 {
					padding-right: 0.25rem !important;
				}

				.pb-1,
				.py-1 {
					padding-bottom: 0.25rem !important;
				}

				.pl-1,
				.px-1 {
					padding-left: 0.25rem !important;
				}

				.p-2 {
					padding: 0.5rem !important;
				}

				.pt-2,
				.py-2 {
					padding-top: 0.5rem !important;
				}

				.pr-2,
				.px-2 {
					padding-right: 0.5rem !important;
				}

				.pb-2,
				.py-2 {
					padding-bottom: 0.5rem !important;
				}

				.pl-2,
				.px-2 {
					padding-left: 0.5rem !important;
				}

				.p-3 {
					padding: 1rem !important;
				}

				.pt-3,
				.py-3 {
					padding-top: 1rem !important;
				}

				.pr-3,
				.px-3 {
					padding-right: 1rem !important;
				}

				.pb-3,
				.py-3 {
					padding-bottom: 1rem !important;
				}

				.pl-3,
				.px-3 {
					padding-left: 1rem !important;
				}

				.p-4 {
					padding: 1.5rem !important;
				}

				.pt-4,
				.py-4 {
					padding-top: 1.5rem !important;
				}

				.pr-4,
				.px-4 {
					padding-right: 1.5rem !important;
				}

				.pb-4,
				.py-4 {
					padding-bottom: 1.5rem !important;
				}

				.pl-4,
				.px-4 {
					padding-left: 1.5rem !important;
				}

				.p-5 {
					padding: 3rem !important;
				}

				.pt-5,
				.py-5 {
					padding-top: 3rem !important;
				}

				.pr-5,
				.px-5 {
					padding-right: 3rem !important;
				}

				.pb-5,
				.py-5 {
					padding-bottom: 3rem !important;
				}

				.pl-5,
				.px-5 {
					padding-left: 3rem !important;
				}

				.container:before,
				.container:after,
				.row:before,
				.row:after,
				.clearfix:before,
				.clearfix:after {
					display: table;
					content: " ";
				}

				.container:after,
				.row:after,
				.clearfix:after {
					clear: both;
				} 

				.background-gray {
					background-color: #ebebeb
				}

				.row-top {
					padding-top: 30px;
				}

				.row-bottom {
					padding-bottom: 30px;
				}

				.spacing {
					height: 50px;
				}
				
			</style>
		</head>
		<body class="background-gray">
			<div class="spacing">
			</div>
			<div class="container">
				<div class="row row-top row-bottom">
					<div class="col-md-12">
						<img src="${URL_API}files/general/cravelio-logo.png" width="200" alt="cravelio-logo">
					</div>
					<div class="col-md-12 mb-4">
						<h2>Your booking is here!</h2>
						<div class="mb-4">Hello ${contactFirstName} ${contactLastName},
						Your trip reservation has been successfully confirmed.</div>
						<div class="mb-2">INV/TRIP/${moment(transactionDate).format('YYYYMMDD')}/${transactionId}</div>
						<div class="mb-2">Trip Name: ${tripName}</div>
						<div class="mb-2">Date: ${moment(startDate).format('MMMM DD, YYYY')} - ${moment(endDate).format('MMMM DD, YYYY')}</div>
						<div class="mb-2">Price (${pax} pax): ${formatCurrency(tripPrice*pax)}</div>
						${renderPromo(promoCode, promoValue, totalPayment)}
					</div>
					<div class="col-md-12">
						<table class="table text-center">
							<thead class="text-center">
								<tr>
									<th>No.</th>
									<th>Name</th>
									<th>ID Type</th>
									<th>ID Number</th>
								</tr>
							</thead>
							<tbody>
								${participantList(participants)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="spacing">
			</div>
		</body>
	</html>
	`
}

module.exports = invoiceApproved