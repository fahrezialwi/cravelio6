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
                contactFirstName: action.payload.contactFirstName,
                contactLastName: action.payload.contactLastName,
                contactPhoneNumber: action.payload.contactPhoneNumber,
                contactEmail: action.payload.contactEmail,
                participants: action.payload.participants,
                promoCodeInput: action.payload.promoCodeInput,
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
                contactFirstName: '',
                contactLastName: '',
                contactPhoneNumber: '',
                contactEmail: '',
                participants: '',
                promoCodeInput: '',
                totalPrice: ''
            }
        default:
            return state
    }
}

export default bookingReducer