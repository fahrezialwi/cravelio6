const init = {
    tripName: '',
    tripPrice: '',
    startDate: '',
    endDate: '',
    pax: ''
}

const bookingReducer = (state = init, action) => {
    switch(action.type) {
        case "BOOKING_SUCCESS":
            return {
                ...state,
                tripName: action.payload.tripName,
                tripPrice: action.payload.tripPrice,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                pax: action.payload.pax
            }
        case "CHECKOUT_SUCCESS":
            return {
                ...state,
                participants: action.payload.participants,
                totalPrice: action.payload.totalPrice
            }
        case "CLEAR_BOOKING_SUCCESS":
            return {
                ...state,
                tripName: '',
                tripPrice: '',
                startDate: '',
                endDate: '',
                pax: '',
                participants: '',
                totalPrice: ''
            }
        default:
            return state
    }
}

export default bookingReducer